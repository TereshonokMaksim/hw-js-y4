import { User, UserServiceContract } from "./user.types";
import { UserRepository } from "./user.repository";
import { sign } from "jsonwebtoken";
import { ENV } from "../config/env";
import { StringValue } from 'ms';
import { hash, compare } from "bcryptjs";

// For errors look in genericTypes/errorMessages

export const UserService: UserServiceContract = {
    makeUserSafe(user){
        const {password, ...safeUser} = user
        return safeUser
    },
    async login(userData){
        const user = await UserRepository.getUserByEmail(userData.email)
        if (!user){
            throw new Error("NOT_FOUND")
        }
        if (!(await compare(userData.password, user.password))){
            throw new Error("WRONG_CREDENTIALS")
        }
        return sign({id: user.id}, ENV.JWT_ACCESS_SECRET_KEY, {expiresIn: ENV.JWT_EXPIRES_IN as StringValue})
    },
    async register(userData){
        const userChecker = await UserRepository.getUserByEmail(userData.email)
        if (userChecker){
            throw new Error("USER_EXISTS")
        }
        const actualPassword = await hash(userData.password, 14)
        const actualData = {...userData, password: actualPassword}
        const newUser = await UserRepository.createUser(actualData)
        // why dont you work without assertion :(
        const token = sign({id: newUser.id}, ENV.JWT_ACCESS_SECRET_KEY, {expiresIn: ENV.JWT_EXPIRES_IN as StringValue})
        return token
    },
    async getMyself(id){
        const user = await UserRepository.getUserById(id)
        if (!user){
            throw new Error("NOT_FOUND")
        }
        return this.makeUserSafe(user)
    }
}
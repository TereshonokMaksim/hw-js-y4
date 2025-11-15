import { verify } from "jsonwebtoken";
import { UserService } from "./user.service";
import { UserControllerContract } from "./user.types";
import { ENV } from "../config/env";
import { GenericValidators } from "../generic/generic.validators";

export const UserController: UserControllerContract = {
    async register(request, response) {
        try{
            const data = request.body
            if (!data.email){
                response.status(400).json({message: "Email is required."})
                return
            }
            if (!data.password){
                response.status(400).json({message: "Password is absolutely required."})
                return
            }
            const newUserToken = await UserService.register(data)
            response.status(201).json({token: newUserToken})
        }
        catch(error){
            if (error instanceof Error){
                if (error.message == "USER_EXISTS"){
                    response.status(409).json({message: "User with such email already exists!"})
                    return
                }
                else if (error.message == "WRONG_CREDENTIALS"){
                    response.status(401).json({message: "Im not sure how you did this, but you inputted wrong data that passed."})
                    return
                }
            }
            console.log(`Seems like something went wrong somewhere in user auth system. And it is linked to registration, it appears to be.\n\nError:\n${error}`)
            response.status(500).json({message: "Server is experiencing problems."})
        }
    },
    async login(request, response){
        try{
            const data = request.body
            if (!data.email){
                response.status(400).json({message: "Email is required."})
                return
            }
            if (!data.password){
                response.status(400).json({message: "Password is absolutely required."})
                return
            }
            const userToken = await UserService.login(data)
            response.status(200).json({token: userToken})
        }
        catch(error){
            if (error instanceof Error){
                // Debug part, delete before prod if you want to have normal console and not just spam in your console with "Wrong password :("
                if (error.message == "NOT_FOUND"){
                    console.log("Wrong email indeed")
                }
                else if (error.message == "WRONG_CREDENTIALS"){
                    console.log("Wrong password :(")
                } 
                if (error.message == "NOT_FOUND" || error.message == "WRONG_CREDENTIALS"){
                    response.status(401).json({message: "Wrong data, check your Email and Password."})
                    return
                }
            }
            console.log(`Seems like something went wrong somewhere in user auth system. And it is linked to login, so you probably need to fix it.\n\nError:\n${error}`)
            response.status(500).json({message: "Server is experiencing problems."})
        }
    },
    async me(request, response){
        try{
            const token = request.headers.authorization 
            if (!token){
                response.status(401).json({message: "You are not authorized yet to be able to use this function."})
                return
            }
            const [authType, tokenData] = token.split(" ")
            if (!authType || authType != "Bearer" || !tokenData){
                // beer
                response.status(401).json({message: "You have incorrect authorization data, so i dont trust you."})
                return
            }
            const actualData = verify(tokenData, ENV.JWT_ACCESS_SECRET_KEY)
            if (typeof(actualData) === "string"){
                response.status(401).json({message: "You have bad token, dont try to fool me."})
                return
            }
            if (!GenericValidators.validateId(String(actualData.id))){
                response.status(401).json({message: "You have bad token, dont try to fool me twice."})
                return
            }
            const user = await UserService.getMyself(actualData.id)
            response.status(200).json(user)
        }
        catch(error){
            if (error instanceof Error){
                if (error.message == "NOT_FOUND"){
                    response.status(404).json({message: "User with such ID does not exists!"})
                    return
                }
            }
            console.log(`I seem to fail getting Myself as User object... Well, doesnt sound like my problem anyways!\n\nError\n${error}`)
            response.status(500).json({message: "Server is experiencing problems."})
        }
    }
}
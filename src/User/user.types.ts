import { Request, Response } from 'express';
import { Prisma } from '../generated/prisma';
import { ErrorResponse } from '../generic/generic.error.messages';

export type User = Prisma.UserGetPayload<{}>
export type SafeUser = Prisma.UserGetPayload<{omit: {password: true}}>

export type CreateUser = Prisma.UserUncheckedCreateInput

export type LoginCredents = {
    email: string
    password: string
}

export type RegisterCredents = {
    email: string
    password: string
    firstName?: string
    secondName?: string
    avatar?: string
}

export type AuthResponse = {
    token: string
}

export interface UserServiceContract {
    makeUserSafe(user: User): SafeUser
    login(userData: LoginCredents): Promise<string>
    register(userData: RegisterCredents): Promise<string>
    getMyself(id: number): Promise<SafeUser>
}

export interface UserControllerContract {
    login(request: Request<object, AuthResponse | ErrorResponse, LoginCredents>, response: Response<AuthResponse | ErrorResponse>): Promise<void>
    register(request: Request<object, AuthResponse | ErrorResponse, RegisterCredents>, response: Response<AuthResponse | ErrorResponse>): Promise<void>
    me(request: Request<object, SafeUser | ErrorResponse>, response: Response<SafeUser | ErrorResponse>): Promise<void>
}

export interface UserRepositoryContract {
    getUserByEmail(email: string): Promise<User | null>
    createUser(userData: RegisterCredents): Promise<User>
    getUserById(id: number): Promise<User | null>
}
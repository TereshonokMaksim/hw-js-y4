import { NextFunction, Request, Response } from "express"
import { ENV } from "../config/env"
import { GenericValidators } from "../generic/generic.validators"
import { verify } from "jsonwebtoken"


export function authMiddleware(request: Request, response: Response, next: NextFunction){
    // Checks whether token is ok or it needs help
    const token = request.headers.authorization 
    if (!token){
        response.status(401).json({message: "You are not authorized yet to be able to use this function."})
        return
    }
    const [authType, tokenData] = token.split(" ")
    if (!authType || authType != "Bearer" || !tokenData){
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
    response.locals.userId = actualData.id
    next()
}
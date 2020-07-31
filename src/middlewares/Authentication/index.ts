import { Request, Response, NextFunction } from "express";

// Models
import UserModel from "@models/UserModel";

// Services
import setJWT, { verifyJWT } from "@services/jsonwebtoken";

export default async function Authenticate(request: Request, response: Response, next: NextFunction) {
    try {
        const user = await UserModel.findOne(request.params).select({
            "username": 0,
            "password": 0,
        })

        if (!user) {
            response.status(200).json({
                code: 404,
                message: "It was not possible to complete your authentication, username or password is incorrect"
            })
            return;
        }

        const userAuthenticate = {
            id: user._id,
        }

        const jwt = await setJWT(userAuthenticate)

        response.status(200).json({
            code: 200, message: "Your was authenticate with succes", authorization: jwt,
            personal: user
        })
    } catch (error) {
        response.status(200).json({ code: 500, message: "Dont not possible authenticate you" })
    }
}

export async function Verify(request: Request, response: Response, next: NextFunction) {
    try {
        const token = await verifyJWT(request.headers.authorization)

        const user = await UserModel.findOne({
            _id: { $eq: token.id }
        })

        if (!user) response.status(200).json({
            code: 400,
            message: "It was not possible verify your authentication, token expired"
        })

        next()
    } catch (error) {
        response.status(200).json({ code: 500, message: `Dont not possible authenticate you - Error: ${error.message}` })
    }
}

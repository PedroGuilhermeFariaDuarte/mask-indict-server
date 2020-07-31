import { Request, Response, NextFunction } from "express";

// Models
import UserModel from "@models/UserModel";

// Schemas
import SchemaUser, { SigInSchema, IDSchema } from "@utils/schemas/User";

// Data User
export async function middleware_ValidateUserData(request: Request, response: Response, next: NextFunction) {
    try {
        if (!(await SchemaUser.isValid(request.body))) {
            response.status(200).json({ code: 400, message: "E-mail, Name and Age is required!" })
            return;
        }
        next()
    } catch (error) {
        response.status(200).json({ code: 500, message: "It was not possible to complete your registration" })
        return;
    }
}

// Sig In a user
export async function middleware_ValidateUser_SignIn(request: Request, response: Response, next: NextFunction) {
    try {
        if (!(await SigInSchema.isValid(request.params))) {
            response.status(200).json({ code: 200, message: "Your data is incorrect" })
            return;
        }

        next()
    } catch (error) {
        response.status(200).json({ code: 500, message: "It was not possible to complete your registration" })
        return;
    }
}

// Validate ID user
export function middleware_ValidateUser_IDValidate(request: Request, response: Response, next: NextFunction) {
    try {
        if (!IDSchema(request.params.idUser)) {
            response.status(200).json({ code: 400, message: "Your data(ID) is incorrect" })
            return;
        }
        next()
    } catch (error) {
        response.status(200).json({ code: 500, message: "It was not possible to complete your registration" })
        return;
    }
}

// Verify if user exists
export async function middleware_ValidateUser_UserExists(request: Request, response: Response, next: NextFunction) {
    try {
        const userExists = await UserModel.findOne({
            email: {
                $eq: request.body?.email
            }
        })

        if (userExists) {
            response.status(200).json({ code: 400, message: "There is already a user with this e-mail" })
            return;
        }

        next()
    } catch (error) {
        response.status(200).json({ code: 500, message: "It was not possible to complete your request" })
        return;
    }
}

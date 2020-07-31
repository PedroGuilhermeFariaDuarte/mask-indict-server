import jwt, { verify } from "jsonwebtoken";

// Types
import TypeUserAuthenticate from "./type"

export default async function setJWT(userAuthenticate: TypeUserAuthenticate) {
    try {
        return jwt.sign({ id: userAuthenticate.id }, process.env.JWT_secret, {
            expiresIn: process.env.JWT_expiresIn
        })
    } catch (error) {
        return {
            code: 10,
            message: error.message
        }
    }
}

export async function verifyJWT(token: string) {
    try {
        return jwt.verify(token, process.env.JWT_secret)
    } catch (error) {
        return {
            code: 10,
            message: error.message
        }
    }
}

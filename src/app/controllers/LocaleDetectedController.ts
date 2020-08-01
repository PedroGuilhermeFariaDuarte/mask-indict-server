import LocaleDetected from "@models/LocaleDetected"
import { ObjectId } from "mongodb"

// Types
import { Request, Response } from "express";

class LocaleDetectedController {
    async create(request: Request): Promise<Object> {
        try {
            const newLocale = await LocaleDetected.create(request.body)

            if (!newLocale) return { code: 400, message: "It was not possible to complete your registration" }

            return { code: 200, message: "New localization was added" }
        } catch (error) {
            return { code: 500, message: "It was not possible to complete your registration", error: error.message }
        }
    }

    async update(request: Request, response: Response) {

    }

    async index(_request: Request, response: Response) {
        try {
            const user = await LocaleDetected.find()

            if (user.length <= 0) response.status(200).json({ code: 500, message: "It was not possible to complete your search" })

            response.status(200).json({ code: 200, message: "Your search was a success" })
        } catch (error) {
            response.status(200).json({ code: 500, message: "It was not possible to complete your search" })
        }
    }

    async show(request: Request, response: Response) {

    }

    async delete(request: Request, response: Response) {

    }
}

export default new LocaleDetectedController();

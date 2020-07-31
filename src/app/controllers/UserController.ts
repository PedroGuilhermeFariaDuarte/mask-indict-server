import UserModel from "@models/UserModel"
import { ObjectId } from "mongodb"

// Types
import { Request, Response } from "express";

class UserController {
    async create(request: Request, response: Response) {
        try {
            const newUser = await UserModel.create(request.body)

            if (!newUser) response.status(500).json({ code: 10, message: "It was not possible to complete your registration" })

            response.status(200).json({ code: 10, message: "Your resgistration was a success" })
        } catch (error) {
            response.status(500).json({ code: 10, message: "It was not possible to complete your registration" })
        }
    }

    async update(request: Request, response: Response) {
        try {
            const updateUser = await UserModel.findByIdAndUpdate(request.params.idUser, request.body)

            if (!updateUser) response.status(200).json({ code: 500, message: "It was not possible to complete your updating account" })

            response.status(200).json({
                code: 200, message: "Your account was updating with success",
                personal: {
                    _id: updateUser._id,
                    age: updateUser?.age,
                    email: updateUser.email,
                    localization: updateUser.localization,
                    name: updateUser.name,
                    createdAt: updateUser.createdAt,
                    updatedAt: updateUser.updateAt,
                },
                authorization: request.headers.authorization
            })
        } catch (error) {
            response.status(200).json({ code: 500, message: "It was not possible to complete your registration" })
        }
    }

    async index(_request: Request, response: Response) {
        try {
            const user = await UserModel.find()

            if (user.length <= 0) response.status(500).json({ code: 10, message: "It was not possible to complete your search" })

            response.status(200).json({ code: 1, message: "Your search was a success" })
        } catch (error) {
            response.status(500).json({ code: 10, message: "It was not possible to complete your search" })
        }
    }

    async show(request: Request, response: Response) {
        try {
            const params = request.params?.idUser ? {
                _id: {
                    $eq: new ObjectId(request.params.idUser)
                }
            } : {
                    $and: [
                        {
                            username: { $eq: request.params.username }
                        },
                        {
                            password: { $eq: request.params.password }
                        }
                    ]
                }
            const user = await UserModel.findOne(params)

            if (!user) response.status(400).json({ code: 10, message: "It was not possible to complete your search" })

            response.status(200).json({ code: 1, message: "Your search was a success" })
        } catch (error) {
            response.status(500).json({ code: 10, message: "It was not possible to complete your search" })
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const oldUser = await UserModel.findByIdAndDelete(request.params.idUser)

            if (!oldUser) response.status(500).json({ code: 10, message: "It was not possible to complete deleted your account " })

            response.status(200).json({ code: 10, message: "Your Account was deleted with success" })
        } catch (error) {
            response.status(500).json({ code: 10, message: "It was not possible to complete" })
        }
    }
}

export default new UserController();

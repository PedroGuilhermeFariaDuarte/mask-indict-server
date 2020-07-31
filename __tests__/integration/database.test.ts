import dotenv from 'dotenv'
dotenv.config()

// Database
import Database from "../../src/database";

// Model
import UserModel from "../../src/app/models/UserModel"

describe("Connection with Database", () => {
    it('should receive a code when connection with database serve is successful', () => {
        //return;
        expect(Database.init().code).toEqual(200)
    })
})

describe("Managing users", () => {
    it("should create a new user in database server", async () => {
        const newUser = await UserModel.create({
            username: "teste",
            password: "teste",
            name: "teste",
            email: "teste@mask.indict.com",
            age: 23,
            localization: {
                type: "Point",
                coordinates: [ -23502029, -46413387 ]
            }
        })
        expect(newUser).toEqual(newUser)
    })

    it("should update a user in database server", async () => {
        return;
        const newUser = await UserModel.findByIdAndUpdate(process.env.DATABASE_UPDATE_ID_USER, {
            username: "teste 2",
            password: "teste 2",
            name: "teste 2",
            email: "teste2@mask.indict.com",
            age: 24,
            localization: {
                type: "Point",
                coordinates: [ -23502029, -46413387 ]
            }
        })
        expect(newUser).toEqual(newUser)
    })

    it("should delete a user in database server", async () => {
        return;
        const newUser = await UserModel.findByIdAndDelete(process.env.DATABASE_DELETE_ID_USER)
        expect(newUser).toEqual(newUser)
    })

    it("should search for one user's in database server", async () => {
        return;
        const newUser = await UserModel.findById(process.env.DATABASE_FIND_ID_USER)
        expect(newUser).toMatchObject({
            __v: 0,
            _id: "5f20ab70292bc73674a6a038",
            username: "teste",
            password: "teste",
            name: "teste",
            email: "teste@mask.indict.com",
            age: 23,
            localization: {
                coordinates: {
                    _id: "5f20ab70292bc73674a6a039",
                    type: "Point",
                    createdAt: "2020 - 07 - 28T22: 49: 20.031 + 00: 00",
                    updatedAt: "2020 - 07 - 28T22: 49: 20.031 + 00: 00",
                    __v: 0
                }
            },
            createdAt: "2020 - 07 - 28T22: 49: 20.031Z",
            updatedAt: "2020 - 07 - 28T22: 49: 20.031Z"
        })
    })

    it("should search for all user's in database server", async () => {
        return;
        const newUser = await UserModel.find()
        expect(newUser).toContainEqual([ {
            username: String,
            password: String,
            name: String,
            email: String,
            age: Number,
            localization: {
                type: String,
                coordinates: Array
            }
        } ])
    })
})

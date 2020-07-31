import request from "supertest"
import dotenv from 'dotenv'
dotenv.config()

// App
import App from "../../src/"

describe("Testing all routers to users", () => {
    it("should create a new user", async () => {
        return;
        const response = await request(App).post("/create/account").send({
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
        expect(response.status).toBe(200)
    })

    it("should update a user", async () => {
        return;
        const response = await request(App).put(`/update/account/${process.env.DATABASE_UPDATE_ID_USER}`).send({
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
        expect(response.status).toBe(200)
    })

    it("should delete a user", async () => {
        return;
        const response = await request(App).delete(`/delete/account/${process.env.DATABASE_DELETE_ID_USER}`).send("")
        expect(response.status).toBe(200)
    })

    it("should sign In a user's", async () => {
        return;
        const response = await request(App).get("/signin/account/teste/teste")
        expect(response.status).toBe(200)
    })

    it("should sign Out a user's", async () => {
        return;
        const response = await request(App).get(`/signout/account/${process.env.DATABASE_FIND_ID_USER}`)
        expect(response.status).toBe(200)
    })

    it("should search a user's", async () => {
        return;
        const response = await request(App).get(`/show/user/${process.env.DATABASE_FIND_ID_USER}`)
        expect(response.status).toBe(200)
    })

    it("should search all user's", async () => {
        return;
        const response = await request(App).get("/all/user/")
        expect(response.status).toBe(200)
    })
})

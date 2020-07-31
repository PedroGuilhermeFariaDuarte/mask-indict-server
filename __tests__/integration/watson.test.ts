import request from "supertest"
import dotenv from 'dotenv'
dotenv.config()

// App
import App from "../../src/"

describe("Testing analyse of images with people using masks protection", () => {

    it("should indentify people using mask", async () => {
        return;
        const response = await request(App).post("/image/intelligence/analyze")
            .send("")
            .set("Content-Type", `multipart/form-data; boundary=---------------------------974767299852498929531610575`)
        expect(response.status).toBe(200)
    })
})

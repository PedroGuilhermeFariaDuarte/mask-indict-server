import express, { Express } from "express"
import dotenv from 'dotenv'
import cors from "cors"
dotenv.config()

// Routes
import UserRoute from "./routers/User";
import SmartCamera from "./routers/SmartCamera";

// Database
import Database from "./database";


class App {
    server: Express;

    constructor() {
        this.server = express();
        this.init()
    }

    init() {
        this.middleware();
        this.database();
        this.routes();
    }

    middleware() {
        this.server.use(express.json({ limit: "100mb" }))
        this.server.use(cors({
            origin: [ 'http://localhost:3000', 'http://localhost',
                'http://localhost:19002/' ],
            allowedHeaders: [ 'Origin', 'X-Requested-With', 'Content-Type', 'Accept' ],
            credentials: true,
            methods: [ 'POST', "GET", 'PUT', "DELETE" ]
        }))
        this.server.use(express.urlencoded({
            type: [ "application/json", "multipart/form-data" ],
            limit: "100mb",
            extended: true,
            parameterLimit: 100000
        }))
    }

    routes() {
        this.server.use([ UserRoute, SmartCamera ])
    }

    database() {
        Database.init();
    }
}

export default new App().server;

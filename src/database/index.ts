import mongoose from "mongoose"

class Database {
    username: String | undefined;
    password: String | undefined;
    databasename: String | undefined;

    constructor() {
        this.username = process.env.DB_USERNAME;
        this.password = process.env.DB_PASSWORD;
        this.databasename = process.env.DB_NAME;
    }

    init() {
        try {
            console.log("Database name", this.databasename)
            //            const response = mongoose.connect(`mongodb+srv://${this.username}:${this.password}@cluster0.ovhww.gcp.mongodb.net/${this.databasename}?retryWrites=true&w=majority`, {
            const response = mongoose.connect(`mongodb://localhost/${this.databasename}?retryWrites=true&w=majority`, {
                useFindAndModify: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, (error) => {
                if (error) {
                    throw new Error(error.message)
                }
            });

            return {
                code: 200,
                message: "Connection is succesful"
            };

        } catch (error) {
            console.log(`Ops! houve um erro: ${error.message}`)
            return {
                code: 400,
                message: "Not possible set connection with database server"
            }
        }
    }

    config() {

    }
}

export default new Database();

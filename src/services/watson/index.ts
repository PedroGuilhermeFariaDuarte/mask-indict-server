import VisualRecognition from "ibm-watson/visual-recognition/v4"
import { Request, Response, NextFunction } from "express";
import { IamAuthenticator } from "ibm-watson/auth"
import fs, { ReadStream } from "fs"
import { promisify } from "util";
import crypto from "crypto";

// Types
import { AnalyzeParams } from "ibm-watson/visual-recognition/v4";

class toAnalyze {
    file: ReadStream
    fileName: string
    analyzeParams: AnalyzeParams
    base64String: string

    constructor(base64String: string) {
        this.base64String = base64String
        this.analyzeParams = {
            imagesFile: [
                {
                    data: fs.createReadStream("./src/services/watson/temp/false.png"),
                    contentType: 'image/png',
                    filename: "maks"
                }
            ],
            features: [ "objects" ],
            collectionIds: [ process.env.WATSON_COLLECTIONID ],
            threshold: 0.19,
        }
    }

    private async setImageDecode(): Promise<boolean> {
        const randomName = await this.getRandomName(8)
        this.fileName = "./src/services/watson/temp/" + randomName.toString("hex") + '.png'

        fs.writeFile(this.fileName, this.base64String, {
            encoding: "base64"
        }, (err) => {
            if (err) throw new Error(`file not stored: ${err.message}`)
        })

        this.file = fs.createReadStream(this.fileName)

        return true
    }

    private async setAnalyzeParams(): Promise<boolean> {
        if (!(await this.setImageDecode())) { return false }

        this.analyzeParams.imagesFile.pop();
        this.analyzeParams.imagesFile.push({
            data: fs.createReadStream(this.fileName),
            contentType: 'image/png',
            filename: "maks"
        })

        this.analyzeParams.features = [ "objects" ]

        this.analyzeParams.collectionIds = [ process.env.WATSON_COLLECTIONID ]

        this.analyzeParams.threshold = 0.25

        return true;
    }

    async initAnalyze(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            await this.setAnalyzeParams()
            console.log("create a analyse object")

            const visualRecognition = new VisualRecognition(({
                serviceUrl: process.env.WATSON_ENDPOINT,
                version: '2019-02-11',
                authenticator: new IamAuthenticator({ apikey: process.env.WATSON_API_KEY }),
            }))

            const visualRecognitionResponse = await visualRecognition.analyze(this.analyzeParams)
            console.log("Result Analyse", visualRecognitionResponse.result.images)

            if (!visualRecognitionResponse.result) {
                console.log("Error in visual recognition")
                response.status(200).json({
                    code: 500,
                    message: "Have a error  with your image to analyze"
                })
                return;
            }

            console.log("Result Analyse", visualRecognitionResponse.result.images)

            response.status(200).json({
                code: 200, message: "Your image was analyze with success",
                data: JSON.stringify(visualRecognitionResponse.result, null, 2)
            })
        } catch (error) {
            response.status(200).json({
                code: 500,
                message: error.message
            })
        }
    }

    async middleware() {
        fs.unlink(this.fileName, error => { throw new Error(error.message) });
    }

    private getRandomName(length: number): Promise<Buffer> {
        return promisify(crypto.randomBytes)(length)
    }
}
export default toAnalyze;

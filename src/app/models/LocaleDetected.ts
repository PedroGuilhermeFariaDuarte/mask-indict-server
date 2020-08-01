import mongoose from "mongoose"

// Utils
import localization from "@utils/localization"
import { ObjectId } from "mongodb"

const LocaleDetected = new mongoose.Schema({
    idUser: {
        type: ObjectId,
        required: true
    },
    localization: localization,
    analyse: {
        type: Object,
        required: true
    },

}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
})
export default mongoose.model('LocaleDetected', LocaleDetected)

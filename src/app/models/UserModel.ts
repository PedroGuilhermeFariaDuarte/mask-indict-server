import mongoose from "mongoose"

// Utils
import localization from "@utils/localization"

const UserModel = new mongoose.Schema({
    username: { type: String },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    localization: localization,
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
})
export default mongoose.model('user', UserModel)

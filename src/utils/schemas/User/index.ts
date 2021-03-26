import * as Yup from "yup"
import { isValidObjectId } from "mongoose";

export const SigInSchema = Yup.object().shape({
    username: Yup.string(),
    password: Yup.string()
})

export const IDSchema = (id: any) => {
    return isValidObjectId(id)
}

export default Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    age: Yup.number().required(),
    localization: Yup.object().shape({
        type: Yup.string(),
        coordinates: Yup.array(),
    })
})

import express, { request, response } from "express"

// Controller
import UserController from "@controllers/UserController"

// Middleware
import {
    middleware_ValidateUserData,
    middleware_ValidateUser_SignIn,
    middleware_ValidateUser_IDValidate,
    middleware_ValidateUser_UserExists
}
    from "@middlewares/Users";
import Authenticate, { Verify } from "@middlewares/Authentication";

const router = express.Router()

// Create and Sign In/Out
router.route("/create/account").post(middleware_ValidateUserData, middleware_ValidateUser_UserExists, UserController.create)
router.route("/signin/account/:username/:password").get(middleware_ValidateUser_SignIn, Authenticate)
router.route("/signout/account/:idUser").get(middleware_ValidateUser_IDValidate, Verify,
    (request, response) => response.status(200).json("ok"))

// Delete, Update, Show and All
router.route("/delete/account/:idUser").delete(middleware_ValidateUser_IDValidate, Verify, UserController.delete)
router.route("/update/account/:idUser").put(middleware_ValidateUser_IDValidate, middleware_ValidateUserData, Verify, UserController.update)
router.route("/show/user/:idUser").get(middleware_ValidateUser_IDValidate, Verify, UserController.show)
router.route("/all/user/").get(middleware_ValidateUser_IDValidate, Verify, UserController.index)

export default router;

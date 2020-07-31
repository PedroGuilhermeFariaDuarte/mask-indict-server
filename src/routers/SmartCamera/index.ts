import express from "express"
import multer from "multer";
import { resolve } from "path";

// Middleware
import { Verify } from "@middlewares/Authentication";

// Services
import watsonVisual from "@services/watson";

const router = express.Router()

router.route("/image/intelligence/analyze").post((request, response, next) => {
    new watsonVisual(request.body.imageAnalyse).initAnalyze(request, response, next)
})

export default router;

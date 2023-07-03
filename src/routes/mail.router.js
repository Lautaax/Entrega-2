import { Router } from "express";
import __dirname from "../utils.js";
import { sendEmail,resetPassword } from "../controllers/mail.controller.js";
const router = Router()

router.post("/mail",sendEmail)
router.post("/resetpassword",resetPassword)
export default router
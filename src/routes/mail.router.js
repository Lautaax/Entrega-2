import { Router } from "express";
import nodemailer from "nodemailer";
import __dirname from "../utils.js";
import { sendEmail } from "../controllers/mail.controller.js";
const router = Router()




router.get("/mail",sendEmail)
export default router
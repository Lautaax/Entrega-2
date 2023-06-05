import { Router } from "express";
import { getMessages } from "../controllers/messages.controller.js";
import { roluser } from "../../middlewares/auth.js";
const messagesRouter = Router();
messagesRouter.get("/",roluser, getMessages);

export default messagesRouter;
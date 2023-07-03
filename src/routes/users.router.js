import {Router}  from "express";
import { updateFunctionuser } from "../controllers/users.controller.js";
const router = Router();
router.put("/premium/:uid",updateFunctionuser);
export default router
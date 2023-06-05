import { Router } from "express";
import { getUsers,getUserbyid,createuser } from "../controllers/user.controller.js";
const router = Router()
router.get("/",getUsers)
router.get("/:uid",getUserbyid)
router.post("/",createuser)
export default router
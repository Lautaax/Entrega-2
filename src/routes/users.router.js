import {Router}  from "express";
import { updateFunctionuser } from "../controllers/users.controller.js";
import { userService } from "../dao/services/user.service.js";
const router = Router();
router.put("/premium/:uid",updateFunctionuser);
router.get("/:uid",async (req,res)=>{
    const{uid}=req.params
    let result= await userService.findbyuserid({_id:uid})
    return res.send({ status: "user successfully obtained", payload: result});
})
export default router
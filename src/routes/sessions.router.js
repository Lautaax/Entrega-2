import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import UserManager from "../dao/dbManagers/userdbManager.js";
import { createHash, isValidPassword } from "../utils.js"
import config from "../config.js";
import jwt from "jsonwebtoken";
import passport from "passport";
const userManager=new UserManager()

const router = Router()
router.post("/register", passport.authenticate("register", { failureRedirect: "/api/sessions/failRegister" }), async (req, res) => {
  return res.send({ status: "Success", message: "User registered" })
})
router.get("/failRegister", (req, res) => {
  return res.send({ status: "status", error: "Authentication error" })
})
router.post("/login",async (req, res) => {
  const {email,password}=req.body
  const user = await userManager.getUser({email})
  if(!user){
    return res.status(401).send({status:"error",error:"Authentication error"})
  }
  if(isValidPassword(user,password)){
  return res.status(401).send({status:"error",error:"Invalid credentials"})
  }
  let role=""
    if(user.email === "adminCoder@coder.com"){
    role = "admin"
  }
  if(user.email === "lautaroj.aguilera@gmail.com"){
    role = "admin"
  }else{
   role = "user"
  }
 
  const jwtUser={
    first_name:`${user.first_name}`,
    last_name:`${user.last_name}`,
    email:user.email,
    cart:user.cart,
   role:role
  }
  console.log(jwtUser)
  const token=jwt.sign(jwtUser,config.JWT_SECRET,{expiresIn: "24h"})
  // if (!req.user)
  // return res.status(401).send({ status: "error", error: "Unauthorized" });

  // if(req.user.email === "adminCoder@coder.com"){
  //   req.user.role = "admin"
  // }else{
  //   req.user.role = "user"
  // }

  // req.session.user={
  //   first_name:req.user.first_name,
  //   last_name:req.user.last_name,
  //   age:req.user.age,
  //   email:req.user.email,
  //   role:req.user.role,
  //   password:"",
  //   cart:req.user.cart,
  // }
  
  return res.cookie("jwtCookie",token,{httpOnly:true}).
  
  send({status:"success",message:"Login successful"})
});



router.get("/failLogin",(req,res)=>{
  res.send({status:"error",error:"Authentication error"})
})
router.get("/github",passport.authenticate("githublogin",{scope:["user:email"] }),(req,res)=>{
})
router.get("/githubcallback",passport.authenticate("githublogin",{failureRedirect:"/"}),(req,res)=>{
  req.session.user=req.user
  res.redirect("/products")
})
router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (!error) return res.send("Logout successful!");

    return res.send({ status: "error", message: "Logout error", body: error });
  });
});
export default router;
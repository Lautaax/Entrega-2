import { userService } from "../dao/services/user.service.js"
export async function getUsers(req,res){
     try {
      const users = await userService.getUsers()
        return res.send({status:"sucess",payload:users})
     } catch (error) {
        console.log(error)
     }
}
export async function getUserbyid(req,res){
    try {
      const id = req.params.uid
      const userbyId= await userService.getUserById(id)
       return res.send({status:"sucess",payload:userbyId})
    } catch (error) {
       console.log(error)
    }
}
export async function createuser(req,res){
    try {
      const {name ,email,role}=req.body
      const user={
         name,
         email,
         role
      }
      const result=await userService.createUser(user)
       return res.send({status:"sucess",result})
    } catch (error) {
       console.log(error)
    }
}

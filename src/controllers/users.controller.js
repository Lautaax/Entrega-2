import { userService } from "../dao/services/user.service.js";

export async function updateFunctionuser(req, res) {
    try {

        let result={};
        let userRole="";
        // console.log(user)
        const user_Id = req.params.uid;
        // const user=await userService.findbyuserid(user_Id)

 
        console.log(user_Id)
        let user = await userService.findbyuserid({_id:user_Id});

        if (req.user.role !== "admin") {
            console.log("pasa aca 3")
            if (user.role === "user") {
                console.log("pasa aca 5")
                user.role="premium"
                user=await userService.updateFunction(user_Id,{role:"premium"})
                userRole="premium"
            } else {
                console.log("pasa aca 6")
                user=await userService.updateFunction(user_Id,{role:"user"})
                userRole="user"
            }
            // result = await userService.updateFunction(user_Id, user);
        }
    
        // if (!result) {
        //    req.logger.error(`The user with the id ${pid} cannot be update his function`);
        //     return res.send({ status: "error", error: "Incomplete values" });
        // }
        console.log(userRole)
        return res.send({ status: "user successfully updated", payload: user.role});
    } catch (error) {
        console.log(error)
    }
} 
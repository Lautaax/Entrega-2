import { userService } from "../dao/services/user.service.js";

export async function updateFunctionuser(req, res) {
    try {

        let result={};
        // console.log(user)
        const user_Id = req.params.uid;
        // const user=await userService.findbyuserid(user_Id)

        const user = await userService.findbyuserid({_id:user_Id});
     
        if (req.session.user.role !== "admin") {
            if (user.role === "user") {
                user.role = "premium"
                req.user.role="premium";
            } else {
                user.role = "user"
                req.user.role="user";
            }
            result = await userService.updateFunction(user_Id, user);
        }

        if (!result) {
          //  req.logger.error(`The user with the id ${pid} cannot be update his function`);
            return res.send({ status: "error", error: "Incomplete values" });
        }
        return res.send({ status: "user successfully updated", payload: result });
    } catch (error) {
        console.log(error)
    }
} 
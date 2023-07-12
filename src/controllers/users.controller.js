import { userService } from "../dao/services/user.service.js";

export async function updateFunctionuser(req, res) {
    try {

        let result={};
        // console.log(user)
        const user_Id = req.params.uid;
        // const user=await userService.findbyuserid(user_Id)

        const user = await userService.findbyuserid({_id:user_Id});
        console.log(user)
        if (req.session.user.role !== "admin") {
            if (req.session.user.role === "user") {
                req.session.user.role="premium"
            } else {
                req.session.user.role="user"
            }
            // result = await userService.updateFunction(user_Id, user);
        }

        // if (!result) {
        //    req.logger.error(`The user with the id ${pid} cannot be update his function`);
        //     return res.send({ status: "error", error: "Incomplete values" });
        // }
        return res.send({ status: "user successfully updated", payload: req.session.user.role});
    } catch (error) {
        console.log(error)
    }
} 
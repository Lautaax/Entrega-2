import { ticketService } from "../dao/services/ticket.service.js";
import { cartService } from "../dao/services/cart.service.js";

export async function getCartsall(req,res){
    try {
        const consulta = await cartService.getCarts();
        return res.send({ status: "Success", payload: consulta });
    } catch (error) {
        console.log(error)
    }
}

export async function getCartbyId(req,res){
    try {
        const cartId = req.params.cid;
        console.log(cartId)
        const cart = await cartService.getCartsbyId(cartId);
      
        if (!cart) {
          return res.status(404).send({
            status: "Error",
            error: "cart was not found",
          });
        }
        return res.send({ status: "OK", message: "Cart found", payload: cart });

    } catch (error) {
        console.log(error)
    } 
}
export async function addProductcart(req,res){
    try {
        const cId = req.params.cid
        const pId = req.params.pid
        const { quantity } = req.body
        console.log(cId, pId)
        
        let resul = await cartService.addProductCart(cId, pId, quantity);
        if (!resul || typeof resul === "string") {
            return res
                .status(400)
                .send({ status: "error", error: resul });
        }
        return res.send({ status: "success", payload: resul });

    } catch (error) {
        console.log(error)
    }
}
export async function updatetheCart(req,res){
    try {
        const id=req.params.cid
        const valor=req.body;
        const result = await cartService.updateCart(id,valor)
        if (!result) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart can not be updated" });
        }
        return res.send({ status: "success", payload: result});
    } catch (error) {
        console.log(error)
    }
}
export async function updateProductFromtheCart(req,res){
    try {
        const cId = req.params.cid
        const pId = req.params.pid
        const { quantity } = req.body
        console.log(cId, pId)

        let resul = await cartService.updateProductFromCart(cId, pId, quantity);
        if (!resul) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart does not exists" });
        }
        return res.send({ status: "success", payload: resul });

    } catch (error) {
        console.log(error)
    }
}
export async function deletetheCart(req,res){
    try {
        console.log(req.params.cid)
        const cId= req.params.cid;
        let resultado= await cartService.deleteCart(cId);
        if (!resultado) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart can not be eliminated" });
        }
        return res.send({ status: "success", payload: resultado });
    } catch (error) {
        console.log(error)
    }
}
export async function deleteproductFromthecart(req,res){
    try {
        const { cid,pid }=req.params
    
         console.log(req.params)
 
         let resul = await cartService.deleteproductfromCart(cid, pid);
         if (!resul) {
             return res
                 .status(400)
                 .send({ status: "error", error: "The cart does not exists" });
         }
         return res.send({ status: "success", payload: resul });
 
     } catch (error) {
         console.log(error)
     }
}
export async function purchase(req,res){
    const { cid} = req.params
    console.log(cid)
    const response= await ticketService.createTickettoCart(cid)
    if (!response) {
        return res
            .status(400)
            .send({ status: "error", error: "The cart does not exists" });
    }
    return res.send({ status: "success", payload: response });
}
import { cartModel } from "../models/cart.model.js";
 class CartRepository {
    constructor() {
        this.cartModel = cartModel
    }
    getCarts = async () => {
        try {
            return this.cartModel.find();

        } catch (error) {
            console.log(error);
        }
    }
    getCartsbyId = async (cid) => {
        try {
            return this.cartModel.findOne({ _id: cid }).lean();
        } catch (error) {
            console.log(error);
        }
    };
    addProducttotheCart = async (cid, cart) => {
        try {
            return this.cartModel.updateOne(cid, cart)
        } catch (error) {
            console.log(error)
        }
    }
    updatetheCart = async (cid, cart) => {
        try {
            return this.cartModel.updateOne(cid, cart);
        } catch (error) {
            console.log(error);
        }
    }
    updateProductFromtheCart = (cid, pid, cart) => {
        try {
            return this.cartModel.updateOne(cid, pid, cart);
        } catch (error) {
            console.log(error);
        }

    }
    deleteCartAll = (cid, cart) => {
        try {
            return this.cartModel.deleteOne(cid,cart);
        } catch (error) {
            console.log(error)
        }

    }

    deleteproductfromtheCart= (cid,cart)=>{
        try {
            return this.cartModel.updateOne(cid,cart)            
        } catch (error) {
            console.log(error)
        }
    }
}
export const cartRepository = new CartRepository();
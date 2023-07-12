

import { Router } from "express";
import { roladm,roluser} from '../../middlewares/auth.js';
import { getCartsall ,getCartbyId,addProductcart,updatetheCart,updateProductFromtheCart,deletetheCart,deleteproductFromthecart,purchase} from "../controllers/cart.controller.js";
const router = Router();

router.get("/", getCartsall);


router.get("/:cid", getCartbyId)
router.put("/:cid",updatetheCart)
router.delete("/:cid",deletetheCart)


router.post("/:cid/product/:pid",addProductcart)
router.delete("/:cid/product/:pid",roluser, deleteproductFromthecart)
router.put("/:cid/product/:pid",updateProductFromtheCart)

router.get("/:cid/purchase",purchase)



export default router;
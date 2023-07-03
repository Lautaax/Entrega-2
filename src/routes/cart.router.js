

import { Router } from "express";
import { roladm,roluser} from '../../middlewares/auth.js';
import { getCartsall ,getCartbyId,addProductcart,updatetheCart,updateProductFromtheCart,deletetheCart,deleteproductFromthecart,purchase} from "../controllers/cart.controller.js";
const router = Router();

router.get("/", getCartsall);


router.get("/:cid", getCartbyId)

router.post("/:cid/product/:pid",addProductcart)
router.put("/:cid",updatetheCart)
router.get("/:cid/purchase",purchase)
router.put("/:cid/product/:pid",updateProductFromtheCart)
router.delete("/:cid",deletetheCart)
router.delete("/:cid/product/:pid",roluser, deleteproductFromthecart)
export default router;
// import ProductManager from '../dao/fileManagers/ProductManager.js';
import { Router } from "express";
import { uploader } from '../utils.js';
import { getProducts,getProductsbyId,addProducts,updateProducts,deleteProducts} from "../controllers/products.controller.js";
import { roladm,createProductpremium } from "../../middlewares/auth.js";
const router = Router();


router.get("/", getProducts);
router.get("/:pid", getProductsbyId);
router.post("/",createProductpremium,uploader.array("thumbnails"),addProducts);
router.put("/:pid",createProductpremium,uploader.array("thumbnails"),updateProducts);
router.delete("/:pid",createProductpremium, deleteProducts);

export default router;
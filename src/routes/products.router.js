// import ProductManager from '../dao/fileManagers/ProductManager.js';
import { Router } from "express";
import { uploader } from '../utils.js';
import { getProducts,getProductsbyId,addProducts,updateProducts,deleteProducts} from "../controllers/products.controller.js";
import { roladm } from "../../middlewares/auth.js";
const router = Router();


router.get("/", getProducts);
router.get("/:pid", getProductsbyId);
router.post("/", roladm,uploader.array("thumbnails"),addProducts);
router.put("/:pid",roladm ,uploader.array("thumbnails"),updateProducts);
router.delete("/:pid",roladm, deleteProducts);

// import ProductManager from '../dao/fileManagers/ProductManager.js';
import { Router } from "express";
import { uploader } from '../utils.js';
import { getProducts,getProductsbyId,addProducts,updateProducts,deleteProducts} from "../controllers/products.controller.js";
import { roladm } from "../../middlewares/auth.js";
const router = Router();


router.get("/", getProducts);
router.get("/:pid", getProductsbyId);
router.post("/", roladm,uploader.array("thumbnails"),addProducts);
router.put("/:pid",roladm ,uploader.array("thumbnails"),updateProducts);
router.delete("/:pid",roladm, deleteProducts);

export default router;
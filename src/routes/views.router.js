

import { getViewProducts,getProductwithitsid , getCartwithitsId,loginView,registerView,productsInformation} from '../controllers/views.controller.js';
import { Router } from "express";
import { checkLogged,checkLogin } from '../../middlewares/auth.js';

const router = Router();

router.get("/products",checkLogin, getViewProducts)

router.get("/product/:pid", checkLogin,getProductwithitsid);

router.get("/cart/:cid", checkLogin,getCartwithitsId);


router.get("/", checkLogged,loginView);

router.get("/register", registerView);

router.get("/products",checkLogin, productsInformation);
export default router;

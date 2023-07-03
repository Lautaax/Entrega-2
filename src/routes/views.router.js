import { getViewProducts,getProductwithitsid , getCartwithitsId,loginView,registerView,productsInformation,chatView,ticket,mailtorecovery,recoverpassword,formproducts} from '../controllers/views.controller.js';
import { Router } from "express";
import { checkLogged,checkLogin} from '../../middlewares/auth.js';

const router = Router();

router.get("/products",checkLogin, getViewProducts)

router.get("/product/:pid", checkLogin,getProductwithitsid);

router.get("/cart/:cid", checkLogin,getCartwithitsId);
router.get("/cart/:cid/purchase",ticket)

router.get("/", checkLogged,loginView);

router.get("/register", registerView);

router.get("/formemailrecovery", mailtorecovery)
router.get("/recoverypassword/:token",recoverpassword)
router.get("/products",checkLogin, productsInformation);
router.get("/form-products",formproducts)
router.get(
    "/chat",
    checkLogin,
    chatView
  );
export default router;


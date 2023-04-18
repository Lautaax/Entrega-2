import ProductManager from '../dao/dbManagers/productdbManager.js';
import { Router } from "express";


const router = Router();
const productmanager=new ProductManager();

router.get("/",async(req,res)=>{
    const { limit = 2, page = 1, category, usable, sort } = req.query;
    const {
      docs: products,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
    } = await productmanager.getProducts(1,10,null,null,null);
    console.log(products);
    res.render("home",{products});
})
router.get("/realtimeproducts", async (req,res)=>{
    res.render("realTimeProducts",{});
})
export default router;
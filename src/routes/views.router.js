import ProductManager from '../dao/dbManagers/productdbManager.js';
import { Router } from "express";


const router = Router();
const productmanager=new ProductManager();

router.get("/",async(req,res)=>{
    const products= await productmanager.getProducts(1,10,null,null,null);
    console.log(products);
    res.render("home",{products, title :"Home"});
})

router.get("/realtimeproducts", async (req,res)=>{
    res.render("realTimeProducts",{});
})
export default router;
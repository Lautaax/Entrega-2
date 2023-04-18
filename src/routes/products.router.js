// import ProductManager from '../dao/fileManagers/ProductManager.js';
import { Router } from "express";
import { uploader } from "../utils.js";
import ProductdbManager from "../dao/dbManagers/productdbManager.js";
import { productModel } from "../dao/models/product.model.js";

const router = Router();

const productdbManager = new ProductdbManager();
router.get("/", async (req, res) => {
    try {
        const {
            limit = 10,
            page = 1,
            category = null,
            available = null,
            sort = null,
        } = req.query;
        console.log(category, available);
        let consulta = await productdbManager.getProducts()(
            page,
            limit,
            category,
            available,
            sort
        );
        return res.send(consulta);
    } catch (error) {
        console.log(error);
    }
});

router.get("/:pid", async (req, res) => {
    try {
        let { pid } = req.params;

        const consultaId = await productdbManager.getProductsbyId(pid);
        if (!consultaId) {
            return res
                .status(400)
                .send({ status: "error", error: "The product does not exists" });
        }
        return res.send({ status: "Exito", payload: consultaId });
    } catch (error) {
        console.log(error);
    }
});
router.post("/", async (req, res) => {
    let product = req.body;
    const createProduct = await productdbManager.createProduct(product);
    if (!createProduct) {
        return res
            .status(400)
            .send({ status: "error", error: "Product already exists" });
    }
    return res.send({ status: "Exito", payload: createProduct });
});

router.put("/:pid", async (req, res) => {
    try {
        const product = req.body;
        const { pid } = req.params;
        const result = await productdbManager.updateProduct(product, pid);
        if (!product) {
            return res.send({ status: "error", error: "Incomplete values" });
        }

        return res.send({ status: "Exito", payload: result });
    } catch (error) {
        console.log(error);
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;

        let result = await productdbManager.deleteProduct(pid);
        if (!result) {
            return res.status(404).send({
                status: "error",
                error:
                    "Could not delete this product. No products founded with this ID in the database",
            });
        }
        res.send({ status: "Exito", payload: result });
    } catch (error) {
        console.log(error);
    }
});

export default router;

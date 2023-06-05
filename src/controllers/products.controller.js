import { productService } from "../dao/services/product.service.js";
export async function getAll(req,res){
    try {
         const productsAll=await productService.getAllproducts()
    return res.send({status:"Success",payload:productsAll}) 
    } catch (error) {
        console.log(error)
    }
}
export async function getProducts(req, res){
    try {
        const { limit = 10, page = 1, category = null, available = null, sort = null } = req.query
        let consulta = await productService.getProductsfilterPage(page, limit, category, available, sort);

        return res.send({ status: "Success", payload: consulta });

    } catch (error) {
        console.log(error)
    }
}
export async function getProductsbyId(req,res){
    try {
        let { pid } = req.params
        const consultaId = await productService.getProductsbyitsId(pid);
        if (!consultaId) {
            return res
                .status(400)
                .send({ status: "error", error: "The product does not exists" });
        }
        return res.send({ status: "success", payload: consultaId });
    } catch (error) {
        console.log(error);
    }
}
export async function addProducts(req,res){
    let product = req.body;

    const filesToUpdate = req.files
    product.thumbnails = [];
    // if (req.files) thumbnails = req.files;

    // if (!req.files) {
    //   return res.status(400).send({
    //     status: "error",
    //     error: `Thumbnails could not be saved`,
    //   });
    // }
    if (filesToUpdate) {
        console.log(filesToUpdate)
        filesToUpdate.forEach(files => {
            const imgUrlUpdate = `http://localhost:8080/images/${files.filename}`;
            product.thumbnails.push(imgUrlUpdate)
        });
    }
    const createProduct = await productService.createProduct(product);
    if (!createProduct) {
        return res
            .status(400)
            .send({ status: "error", error: "Product already exists" });
    }
    return res.send({ status: "success", payload: createProduct });

}
export async function updateProducts(req,res){
    try {
        // let { title, description, code, price, stock, category, thumbnails } =
        // req.body;

        const product = req.body;
        const { pid } = req.params;


        // const filesToUpdate = req.files 
        

        // product.thumbnails = [];

        // if (req.files) thumbnails = req.files;

        // if (!req.files) {
        //   return res.status(400).send({
        //     status: "error",
        //     error: `Thumbnails could not be saved`,
        //   });
        // }
        // if (filesToUpdate) {
        //     console.log(filesToUpdate)
        //     filesToUpdate.forEach(files => {
        //         const imgUrlUpdate = `http://localhost:8080/images/${files.filename}`;
        //         product.thumbnails.push(imgUrlUpdate)
        //     });
        // }
        const result = await productService.updateProduct(product, pid);
        if (!product) {
            return res.send({ status: "error", error: "Incomplete values" });
        }

        return res.send({ status: "product successfully updated", payload: result });
    } catch (error) {
        console.log(error);
    }
}
export async function deleteProducts(res,req){
    try {
        const { pid } = req.params;

        let result = await productService.deleteProduct(pid);
        if (!result) {
            return res.status(404).send({
                status: "error",
                error: "Could not delete this product. No products founded with this ID in the database",
            });
        }
        res.send({ status: "Product successfully eliminated", payload: result });



    } catch (error) {
        console.log(error);
    }
}
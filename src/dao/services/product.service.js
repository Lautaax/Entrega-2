import { productsRepository } from "../repositories/product.repository.js";
class ProductsService {
    constructor() {
        this.productsRepository = productsRepository
    }
    getAllproducts = async () => {
        try {
            return await this.productsRepository.getallProducts();
        } catch (error) {
            console.log(error)
        }
    }
    getProductsfilterPage = async (page, limit, category, usable, sort) => {
        try {
            return await this.productsRepository.getproductsPage(page, limit, category, usable, sort);
        } catch (error) {
            console.log(error)
        }
    }
    getProductsbyitsId = async (pid) => {
        try {
            return await this.productsRepository.getProductsbyId(pid)
        } catch (error) {
            console.log(error)
        }
    }
    createProduct = async (product) => {
        try {
            if (
                !product.title ||
                !product.description ||
                product.price === undefined ||
                product.status === undefined ||
                !product.code ||
                product.stock === undefined ||
                !product.category
            ) {
                return { error: `All the fields are required` };
            }

            const existingProduct = await this.productsRepository.getByCode(product.code);
            if (existingProduct) {
                return { error: `The product that you created is duplicated.` };
            }
            return await this.productsRepository.createProduct(product)
        } catch (error) {
            console.log(error)
        }

    }
    updateProduct = async (product, pid) => {
        try {
            const existingProduct = await this.productsRepository.getProductsbyId(pid);
            if (!existingProduct) {
                return { error: `The product with this ID does not exists.` };
            }
            return await this.productsRepository.updateProduct(product)
        } catch (error) {
            console.log(error)
        }
    }
    deleteProduct=async(pid)=>{
        try {
            const existingProduct = await this.productsRepository.getProductsbyId(pid);
            if (!existingProduct) {
                return { error: `The product with this ID does not exists.` };
            }
            return this.productsRepository.deleteProduct(pid)
        } catch (error) {
            console.log(error)
        }
    }
}
export const productService=new ProductsService()
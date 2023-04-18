import { productModel } from "../models/product.model.js";

export default class productdbManager {
  constructor() {}
  getAll = async () => {
    try {
      const prod = await productModel.find();
      return prod;
    } catch (error) {
      console.log(error);
    }
  };
  getProducts = async (page, limit, category, usable, sort) => {
    try {
      let query = {};
      category ? (query.category = category.toLowerCase()) : null;
      usable ? (query.status = usable.toLowerCase()) : null;
      Number.parseInt(sort) === 1 ? (sort = { price: 1 }) : null;
      Number.parseInt(sort) === -1 ? (sort = { price: -1 }) : null;
      const products = await productModel.paginate(query, {
        limit,
        page,
        sort:sort ,
        lean: true,
      });
      return products.docs;
    } catch (error) {
      console.log(error);
    }
  };

  getProductsbyId = async (pid) => {
    try {
      const productByid = await productModel.findOne({ _id: pid });
      return productByid;
    } catch (error) {
      console.log(error);
    }
  };

  createProduct = async (product) => {
    try {
      const productCreated = await productModel.create(product);
      return productCreated;
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (product, pid) => {
    try {
      const productUpdated = await productModel.updateOne(
        { _id: pid },
        product
      );
      return productUpdated;
    } catch (error) {
      console.log(error);
    }
  };
  deleteProduct = async (pid) => {
    try {
      const productDeleted = await productModel.deleteOne({ _id: pid });
      return productDeleted;
    } catch (error) {
      console.log(productDeleted);
    }
  };
}

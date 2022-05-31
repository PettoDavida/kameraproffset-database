import express from "express";

import {
  addProduct,
  editProduct,
  getAllProducts,
  getProduct,
  getProductsByCategory,
  deleteProduct,
} from "../controllers/productController";

export const productRouter = express
  .Router()
  .get("/products", getAllProducts)
  .get("/products/:id", getProduct)
  .get("/products/categories/:id", getProductsByCategory)
  .post("/products", addProduct)
  .put("/products/:id", editProduct)
  .delete("/products/:id", deleteProduct);

export default productRouter;

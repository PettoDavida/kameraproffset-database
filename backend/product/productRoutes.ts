import express from "express";
import { verifyToken } from "../jwt.utils";
import { isAdmin } from "../middleware.util";

import {
  addProduct,
  editProduct,
  getAllProducts,
  getProduct,
  getProductsByCategory,
  deleteProduct,
} from "./productController";

export const productRouter = express
  .Router()
  .get("/products", getAllProducts)
  .get("/products/:id", getProduct)
  .get("/products/categories/:id", getProductsByCategory)
  .post("/products", verifyToken, isAdmin, addProduct)
  .put("/products/:id", verifyToken, isAdmin, editProduct)
  .delete("/products/:id", verifyToken, isAdmin, deleteProduct);

export default productRouter;

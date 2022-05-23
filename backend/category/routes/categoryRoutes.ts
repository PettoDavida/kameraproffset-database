import express from "express";
import {
  getAllCategories,
  getSingleCategory,
  createCategory,
  editCategory,
  deleteCategory,
} from "../controller/categoryController";

export const categoryRouter = express
  .Router()
  .get("/category", getAllCategories)
  .get("/category/:id", getSingleCategory)
  .post("/category", /* checkAdmin */ createCategory)
  .put("/category/:id", /* checkAdmin */ editCategory)
  .delete("/category/:id", /* checkAdmin */ deleteCategory);

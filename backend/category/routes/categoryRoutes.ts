import express from "express";
import { verifyToken } from "../../jwt.utils";
import { isAdmin } from "../../middleware.util";
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
  .post("/category", verifyToken, isAdmin, createCategory)
  .put("/category/:id", verifyToken, isAdmin, editCategory)
  .delete("/category/:id", verifyToken, isAdmin, deleteCategory);

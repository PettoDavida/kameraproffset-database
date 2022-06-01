import express from "express";
import { verifyToken } from "../../jwt.utils";
import { isAdmin, selfOrAdmin } from "../../middleware.util";
import {
  getAllOrders,
  getOrderByUserID,
  addOrder,
  setOrderToSent,
  deleteOrder,
} from "../controllers/orderController";

let orderRouter = express
  .Router()
  .get("/order", verifyToken, isAdmin, getAllOrders)
  .get("/order/:userID", verifyToken, selfOrAdmin, getOrderByUserID)
  .post("/order", verifyToken, addOrder)
  .put("/order", verifyToken, isAdmin, setOrderToSent)
  .delete("/order/:id", verifyToken, isAdmin, deleteOrder);

export default orderRouter;

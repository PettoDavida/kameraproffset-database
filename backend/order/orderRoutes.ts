import express from "express";
import { verifyToken } from "../jwt.utils";
import { isAdmin, selfOrAdmin } from "../middleware.util";
import {
  getAllOrders,
  getOrderByUserID,
  addOrder,
  setOrderToSent,
  deleteOrder,
  getOrderByOrderID,
} from "./orderController";

let orderRouter = express
  .Router()
  .get("/order", verifyToken, isAdmin, getAllOrders)
  .get("/order/user/:userID", verifyToken, selfOrAdmin, getOrderByUserID)
  .get("/order/:orderID", verifyToken, selfOrAdmin, getOrderByOrderID)
  .post("/order", verifyToken, addOrder)
  .put("/order", verifyToken, isAdmin, setOrderToSent)
  .delete("/order/:id", verifyToken, isAdmin, deleteOrder);

export default orderRouter;

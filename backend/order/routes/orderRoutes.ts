import express from "express";
import {
  getAllOrders,
  getOrderByID,
  getOrderByUserID,
  addOrder,
  setOrderToSent,
  deleteOrder,
} from "../controllers/orderController";

let orderRouter = express
  .Router()
  .get("/order", getAllOrders)
  .get("/order/:id", getOrderByID)
  .get("/order/user/:userID", getOrderByUserID)
  .post("/order", addOrder)
  .put("/order/:id", setOrderToSent)
  .delete("/order/:id", deleteOrder);

export default orderRouter;

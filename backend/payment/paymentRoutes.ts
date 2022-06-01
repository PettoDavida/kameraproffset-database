import express from "express";
import { verifyToken } from "../jwt.utils";
import { isAdmin } from "../middleware.util";

import {
  createPaymentMethod,
  deletePaymentMethod,
  getAllPaymentMethods,
} from "./paymentController";

export const paymentRouter = express
  .Router()
  .get("/payment", verifyToken, getAllPaymentMethods)
  .post("/payment", verifyToken, isAdmin, createPaymentMethod)
  .delete("/payment/:id", verifyToken, isAdmin, deletePaymentMethod);

export default paymentRouter;

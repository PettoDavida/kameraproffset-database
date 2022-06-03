import express from "express";
import { verifyToken } from "../jwt.utils";
import { isAdmin } from "../middleware.util";
import {
  getAllDeliveryMethods,
  addDeliveryMethod,
  editDeliveryMethod,
  deleteDeliveryMethod,
} from "./deliveryController";

let deliveryRouter = express
  .Router()
  .get("/delivery", getAllDeliveryMethods)
  .post("/delivery", verifyToken, isAdmin, addDeliveryMethod)
  .put("/delivery/:id", verifyToken, isAdmin, editDeliveryMethod)
  .delete("/delivery/:id", verifyToken, isAdmin, deleteDeliveryMethod);

export default deliveryRouter;

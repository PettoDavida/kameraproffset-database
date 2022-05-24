import express from "express";
import {
  getAllDeliveryMethods,
  addDeliveryMethod,
  editDeliveryMethod,
  deleteDeliveryMethod,
} from "../controllers/deliveryController";

let deliveryRouter = express
  .Router()
  .get("/delivery", getAllDeliveryMethods)
  .post("/delivery", /* checkAdmin */ addDeliveryMethod)
  .put("/delivery/:id", /* checkAdmin */ editDeliveryMethod)
  .delete("/delivery/:id", /* checkAdmin */ deleteDeliveryMethod);

export default deliveryRouter;

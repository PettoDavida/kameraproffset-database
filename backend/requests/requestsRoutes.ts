import express from "express";
import { verifyToken } from "../jwt.utils";
import { isAdmin } from "../middleware.util";

import {
  createRequest,
  deleteRequest,
  getAllRequests,
  approveRequest,
} from "./requestsController";

export const requestRouter = express
  .Router()
  .get("/requests", verifyToken, isAdmin, getAllRequests)
  .post("/requests/", verifyToken, createRequest)
  .put("/requests/:id", verifyToken, isAdmin, approveRequest)
  .delete("/requests/:id", verifyToken, isAdmin, deleteRequest);

export default requestRouter;

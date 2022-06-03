import express from "express";
import {
  getAllUsers,
  updateUserPassword,
  addUser,
  loginUser,
  deleteUser,
  updateUserEmail,
  getUserByID,
} from "./userController";
import { verifyToken } from "../jwt.utils";
import { isAdmin, selfOrAdmin } from "../middleware.util";

let userRouter = express
  .Router()
  .get("/user", verifyToken, isAdmin, getAllUsers)
  .get("/user/:id", verifyToken, selfOrAdmin, getUserByID)
  .post("/user", addUser)
  .post("/user/login", loginUser)
  .put("/user/password/:id", verifyToken, selfOrAdmin, updateUserPassword)
  .put("/user/email/:id", verifyToken, updateUserEmail)
  .delete("/user/:id", verifyToken, selfOrAdmin, deleteUser);

export default userRouter;

import express from "express";
import {
  getAllUsers,
  getUserByID,
  updateUserPassword,
  addUser,
  loginUser,
  deleteUser,
  updateUserEmail,
} from "../controllers/userController";
import { verifyToken } from "../../jwt.utils";
import { selfOrAdmin } from "../../middleware.util";

let userRouter = express
  .Router()
  .get("/user", getAllUsers)
  .get("/user/:id", getUserByID)
  .post("/user", addUser)
  .post("/user/login", loginUser)
  .put("/user/password/:id", verifyToken, selfOrAdmin, updateUserPassword)
  .put("/user/email/:id", verifyToken, updateUserEmail)
  .delete("/user/:id", verifyToken, selfOrAdmin, deleteUser);

export default userRouter;

import express from "express";
import multer from "multer";
import { verifyToken } from "../../jwt.utils";
import { isAdmin } from "../../middleware.util";
import {
  getMedia,
  addMedia,
  deleteMedia,
  getAllMedia,
} from "../controllers/mediaController";

const upload = multer();

export const mediaRouter = express
  .Router()
  .get("/media", getAllMedia)
  .get("/media/:id", getMedia)
  .post("/media", /* Setup Admin security */ upload.single("media"), addMedia)
  .delete("/media/:id", verifyToken, isAdmin, deleteMedia);

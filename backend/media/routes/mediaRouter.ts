import express from "express";
import multer from "multer";
import {
  getMedia,
  addMedia,
  deleteMedia,
} from "../controllers/mediaController";

const upload = multer();

export const mediaRouter = express
  .Router()
  .get("/media/:id", getMedia)
  .post("/media", upload.single("media"), addMedia)
  .delete("/media/:id", deleteMedia);

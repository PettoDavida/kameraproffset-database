import mongoose, { ObjectId, Schema, Types } from "mongoose";

export interface Product {
  title: String;
  price: Number;
  images: [];
  longInfo: String;
  info: String[];
  category: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  stock: number;
}

const productSchema = new mongoose.Schema<Product>({
  title: { type: String },
  price: { type: Number },
  images: { type: [] },
  longInfo: { type: String },
  info: { type: [String] },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  quantity: { type: Number },
  stock: { type: Number },
});

export const productModel = mongoose.model("product", productSchema);

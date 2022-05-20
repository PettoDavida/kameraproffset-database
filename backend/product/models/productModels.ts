import mongoose, { ObjectId, Schema, Types } from "mongoose";

export interface Product {
  user: Types.ObjectId;
  title: String;
  price: Number;
  images: [];
  longInfo: String;
  info: String[];
  category: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  stock: number;
}

const productSchema = new mongoose.Schema<Product>({
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  title: { type: String },
  price: { type: Number },
  images: { type: [] },
  longInfo: { type: String },
  info: { type: [String] },
  category: { type: [String] },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  quantity: { type: Number },
  stock: { type: Number },
});

export const productModel = mongoose.model("product", productSchema);

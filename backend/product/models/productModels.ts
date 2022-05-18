import mongoose, { Schema, Types } from "mongoose";

export interface Product {
  user: Types.ObjectId;
  title: String;
  price: Number;
  image: File;
  longinfo: String;
  info: String[];
  discount: Number;
  actualPrice: Number;
  isLegacy: Boolean;
  category: String[];
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
}

const productSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  title: { type: String },
  price: { type: Number },
  image: { data: Buffer },
  longInfo: { type: String },
  info: { type: [String] },
  discount: { type: Number },
  actualPrice: { type: Number },
  isLegacy: { type: Boolean },
  category: { type: [String] },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  quantity: { type: Number },
});

export const productModel = mongoose.model<Product>("product", productSchema);

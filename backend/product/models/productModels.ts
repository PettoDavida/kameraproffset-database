import mongoose, { ObjectId, Schema, Types } from "mongoose";

export interface Product {
  title: String;
  price: Number;
  images: ObjectId[];
  longInfo: String;
  info: String[];
  category: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  quantity?: number;
  stock?: number;
}

export const productSchema = new mongoose.Schema<Product>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [mongoose.Schema.Types.ObjectId], required: true },
  longInfo: { type: String, required: true },
  info: { type: [String], required: true },
  category: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "category",
    required: true,
  },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  quantity: { type: Number },
  stock: { type: Number },
});

export const productModel = mongoose.model("product", productSchema);

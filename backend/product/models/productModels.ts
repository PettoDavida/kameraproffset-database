import mongoose, { ObjectId } from "mongoose";

export interface Product {
  title: string;
  price: Number;
  images: ObjectId[];
  longInfo: String;
  info: String[];
  category: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  quantity?: Number;
  stock?: Number;
  specs: Specs[];
}

export interface Specs {
  spectitle: string;
  spec: string;
}

export const productSchema = new mongoose.Schema<Product>(
  {
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
    specs: { type: [{ spectitle: { type: String }, spec: { type: String } }] },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.virtual("imageURL").get(function () {
  return "/api/media/" + this.images;
});

export const productModel = mongoose.model("product", productSchema);

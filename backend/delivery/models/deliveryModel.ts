import mongoose from "mongoose";

export interface Delivery {
  title: String;
  price: Number;
  info: String;
  expectedArrival: Date;
  image: String;
  _id: String;
}

export const deliverySchema = new mongoose.Schema<Delivery>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    info: { type: String, required: true },
    expectedArrival: { type: Date, required: true },
    image: { type: String, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const deliveryModel = mongoose.model("delivery", deliverySchema);

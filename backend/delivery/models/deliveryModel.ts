import mongoose, { ObjectId } from "mongoose";

export interface Delivery {
  title: String;
  price: Number;
  info: String;
  expectedArrival: Date;
}

const deliverySchema = new mongoose.Schema<Delivery>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  info: { type: String, required: true },
  expectedArrival: { type: Date, required: true },
});

export const deliveryModel = mongoose.model("delivery", deliverySchema);

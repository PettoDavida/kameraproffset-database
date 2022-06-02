import mongoose from "mongoose";

export interface Payment {
  title: String;
  desc: String;
  info: String;
  price: Number;
}

export const paymentSchema = new mongoose.Schema<Payment>({
  title: { type: String, required: true },
  desc: { type: String, required: false },
  info: { type: String, required: true },
  price: { type: Number, required: true },
});

export const PaymentModel = mongoose.model("payment", paymentSchema);

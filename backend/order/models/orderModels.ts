import mongoose from "mongoose";
import { Address, addressSchema } from "../../common";
import { Delivery, deliverySchema } from "../../delivery/models/deliveryModel";
import { Product, productSchema } from "../../product/models/productModels";

export interface Order {
  products: Product[];
  deliveryAddress: Address;
  deliveryOption: Delivery;
  sent: Boolean;
  createdAt: Date;
  /** VIRTUAL */ totalPrice: number;
}

const orderSchema = new mongoose.Schema<Order>(
  {
    products: { type: [productSchema], required: true },
    deliveryAddress: { type: addressSchema, required: true },
    deliveryOption: { type: deliverySchema, required: true },
    sent: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.virtual("totalPrice").get(function () {
  return 0;
});

export const OrderModel = mongoose.model("order", orderSchema);

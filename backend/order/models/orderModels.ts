import mongoose, { ObjectId } from "mongoose";
import { Address, addressSchema } from "../../common";
import { Delivery, deliverySchema } from "../../delivery/models/deliveryModel";
import { Product, ProductSchema } from "../../product/models/productModels";

export interface Order {
  userID: ObjectId;
  products: Product[];
  deliveryAddress: Address;
  deliveryMethod: Delivery;
  sent: Boolean;
}

const orderSchema = new mongoose.Schema<Order>(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: { type: [ProductSchema], required: true },
    deliveryAddress: { type: addressSchema, required: true },
    deliveryMethod: { type: deliverySchema, required: true },
    sent: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const OrderModel = mongoose.model("order", orderSchema);

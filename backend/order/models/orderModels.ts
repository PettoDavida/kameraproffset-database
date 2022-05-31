import mongoose from "mongoose";
import { Address, AddressSchema } from "../../common";
import { Delivery, DeliverySchema } from "../../delivery/models/deliveryModel";
import { Product, ProductSchema } from "../../product/models/productModels";

export interface Order {
  products: Product[];
  deliveryAddress: Address;
  deliveryOption: Delivery;
  sent: Boolean;
  createdAt: Date;
  /** VIRTUAL */ totalPrice: number;
}

const OrderSchema = new mongoose.Schema<Order>(
  {
    products: { type: [ProductSchema], required: true },
    deliveryAddress: { type: AddressSchema, required: true },
    deliveryOption: { type: DeliverySchema, required: true },
    sent: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

OrderSchema.virtual("totalPrice").get(function () {
  return 0;
});

export const OrderModel = mongoose.model("order", OrderSchema);

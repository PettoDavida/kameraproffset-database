import mongoose, { ObjectId } from "mongoose";
import { Address, addressSchema } from "../../common";
import { Delivery, deliverySchema } from "../../delivery/models/deliveryModel";
import { Product, productSchema } from "../../product/models/productModels";

export interface Order {
  userID: ObjectId;
  products: Product[];
  deliveryAddress: Address;
  deliveryMethod: Delivery;
  sent: Boolean;
  /** VIRTUAL */ totalPrice: Number;
}

const orderSchema = new mongoose.Schema<Order>(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: { type: [productSchema], required: true },
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

orderSchema.virtual("totalPrice").get(function () {
  return 0;
});

export const OrderModel = mongoose.model("order", orderSchema);

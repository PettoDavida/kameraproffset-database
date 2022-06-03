import { NextFunction, Request, Response } from "express";
import { PaymentModel } from "./paymentModels";

export const getAllPaymentMethods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPayments = await PaymentModel.find({});
    res.status(200).json(allPayments);
  } catch (err) {
    res.status(404).json("No requests were found");
    next(err);
  }
};

export const createPaymentMethod = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newPayment = new PaymentModel(req.body);
    await newPayment.save();
    res.status(200).json(newPayment);
  } catch (err) {
    res.status(400).json("Not very nice request. I need more stuff");
    next(err);
  }
};

export const deletePaymentMethod = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletePayment = await PaymentModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletePayment);
  } catch (err) {
    res.status(404).json("ID was not found");
    next(err);
  }
};

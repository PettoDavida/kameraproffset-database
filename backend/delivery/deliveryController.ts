import { NextFunction, Request, Response } from "express";
import { DeliveryModel } from "./deliveryModel";

const getAllDeliveryMethods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allDeliveryMethods = await DeliveryModel.find({});
    res.status(200).json(allDeliveryMethods);
  } catch (err) {
    res.status(404).json("No delivery methods found");
    next(err);
  }
};

const addDeliveryMethod = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newDeliveryMethod = new DeliveryModel(req.body);
    await newDeliveryMethod.save();
    res.status(200).json(newDeliveryMethod);
  } catch (err) {
    next(err);
  }
};

const editDeliveryMethod = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deliveryMethod = await DeliveryModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json(deliveryMethod);
  } catch (err) {
    res.status(404).json("ID not found");
    next(err);
  }
};

const deleteDeliveryMethod = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deliveryMethod = await DeliveryModel.findByIdAndDelete(
      req.params.id,
      req.body
    );
    res.status(200).json(deliveryMethod);
  } catch (err) {
    res.status(404).json("ID not found");
    next(err);
  }
};

export {
  getAllDeliveryMethods,
  addDeliveryMethod,
  editDeliveryMethod,
  deleteDeliveryMethod,
};

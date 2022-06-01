import { NextFunction, Request, Response } from "express";
import { OrderModel } from "../models/orderModels";

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderModel.find({});
    res.status(200).json(orders);
  } catch (err) {
    res.status(404).json("No orders were found");
    next(err);
  }
};

export const getOrderByUserID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ordersByUserID = await OrderModel.find({
      userID: req.params.userID,
    });
    res.status(200).json(ordersByUserID);
  } catch (err) {
    res.status(404).json("No order has this userID");
    next(err);
  }
};
export const getOrderByOrderID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ordersByOrderID = await OrderModel.findById(req.params.orderID);
    res.status(200).json(ordersByOrderID);
  } catch (err) {
    res.status(404).json("No order has this ID");
    next(err);
  }
};

export const addOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Set user and prefferably products here on the server
    const newOrder = new OrderModel(req.body);
    await newOrder.save();
    console.log(newOrder);
    res.status(200).json(newOrder);
  } catch (err) {
    next(err);
  }
};

export const setOrderToSent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderSent = await OrderModel.findOneAndUpdate(
      { sent: false },
      { $set: { sent: true } },
      { new: true }
    );
    console.log(orderSent);
    res.status(200).json(orderSent);
  } catch (err) {
    res.status(err);
    next(err);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleteOrder = await OrderModel.findByIdAndDelete(
      req.params.id,
      req.body
    );
    res.status(200).json(deleteOrder);
  } catch (err) {
    res.status(404).json("ID was not found");
    next(err);
  }
};

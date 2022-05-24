import { NextFunction, Request, Response } from "express";
import { User } from "../../user/models/userModels";
import { OrderModel } from "../models/orderModels";

const getAllOrders = async (req: Request, res: Response) => {
  const orders = await OrderModel.find({}).populate<{ customer: User }>(
    "customer"
  );
  if (!orders) throw Error("Not found.");
  res.status(200).json(orders);
};

const getOrderByID = async (req: Request, res: Response) => {
  const order = await OrderModel.findById(req.params.id);
  res.status(200).json(order);
};

const getOrderByUserID = async (req: Request, res: Response) => {};

const addOrder = async (req: Request, res: Response) => {};

const setOrderToSent = async (req: Request, res: Response) => {};

const deleteOrder = async (req: Request, res: Response) => {};

export {
  getAllOrders,
  getOrderByID,
  getOrderByUserID,
  addOrder,
  setOrderToSent,
  deleteOrder,
};

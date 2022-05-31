import { NextFunction, Request, Response } from "express";
import { productModel } from "../../product/models/productModels";
import { User } from "../../user/models/userModels";
import { OrderModel } from "../models/orderModels";



const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
       const orders = await OrderModel.find({})
       res.status(200).json(orders)
  } catch (err) {
       res.status(404).json("No orders were found")
       next(err)
  }
};

const getOrderByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
         const singleOrder = await OrderModel.findById(req.params.id);
         res.status(200).json(singleOrder)
  } catch (err) {
         res.status(404).json("An order with that ID was not found")
         next(err)
  }
};

const getOrderByUserID = async (req: Request, res: Response, next: NextFunction) => {


       try {
              const {userID} = req.params;
              await OrderModel.findById(userID, req.body)
              console.log(userID, req.body)
       } catch (err) {
              res.status(404).json("No orders found on this user");
              next(err)
       }

};

const addOrder = async (req: Request, res: Response, next: NextFunction) => {
       try {
              // Set user and prefferably products here on the server
              const newOrder = new OrderModel(req.body);
              await newOrder.save();
              console.log(newOrder);
              res.status(200).json(newOrder);
       } catch (err) {
              next(err)
       }
};

const setOrderToSent = async (req: Request, res: Response, next: NextFunction) => {

       try {
              const orderSent = await OrderModel.findOneAndUpdate({sent: false}, {$set:{sent: true}}, {new: true});
              console.log(orderSent)
              res.status(200).json(orderSent)
       } catch (err) {
              res.status(err)
              next(err)
       }
};



export {
  getAllOrders,
  getOrderByID,
  getOrderByUserID,
  addOrder,
  setOrderToSent,
};

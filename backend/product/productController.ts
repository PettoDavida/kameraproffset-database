import { NextFunction, Request, Response } from "express";
import { ProductModel } from "./productModels";

// Get all products

var ObjectId = require("mongoose").Types.ObjectId;

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allProducts = await ProductModel.find({});
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(404).json("No products were found");
    next(err);
  }
};

// Get a single product

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const singleProduct = await ProductModel.findById(req.params.id);
    res.status(200).json(singleProduct);
  } catch (err) {
    res.status(404).json("ID was not found");
    next(err);
  }
};

// Get products from a category
export const getProductsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productByCategory = await ProductModel.find({
      category: ObjectId(req.params.id),
    });
    res.status(200).json(productByCategory);
  } catch (err) {
    res.status(404).json("Category was not found");
    next(err);
  }
};

// Add a product

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json("Not very nice request. I need more stuff");
    next(err);
  }
};

// Edit a product

export const editProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const editProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json(editProduct);
  } catch (err) {
    res.status(404).json("ID was not found");
    next(err);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteProduct);
  } catch (err) {
    res.status(404).json("ID was not found");
    next(err);
  }
};

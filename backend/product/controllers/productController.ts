import { NextFunction, Request, Response } from "express";
import { productModel } from "../models/productModels";

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const allProducts = await productModel.find({});
        res.status(200).json(allProducts);
    }catch (err) {
        res.status(404).json("No products were found");
        next(err);
    }
};

export const getProduct = async (req: Request, res: Response) => {};

export const getProductsByCategory = async (req: Request, res: Response) => {};

export const addProduct = async (req: Request, res: Response) => {};

export const editProduct = async (req: Request, res: Response) => {};

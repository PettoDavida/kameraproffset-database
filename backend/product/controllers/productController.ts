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

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const singleProduct = await productModel.findById(req.params.id);
        res.status(200).json(singleProduct);
    } catch (err) {
        res.status(404).json("ID was not found");
        next(err);
    }

};

export const getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {

};

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newProduct = new productModel(req.body);
        await newProduct.save();
        console.log(newProduct);
        res.status(200).json(newProduct);
    } catch (err) {
        next(err);
    }
};

export const editProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const editProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.status(200).json(editProduct);
    } catch (err) {
        res.status(404).json("ID was not found");
        next(err);
    }
};



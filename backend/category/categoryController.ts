import { Request, Response, NextFunction } from "express";
import { categoryModel } from "./categoryModel";

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCategories = await categoryModel.find({});
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(404).json("No categories found");
    next(err);
  }
};

const getSingleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const singleCategory = await categoryModel.findById(req.params.id);
    res.status(200).json(singleCategory);
  } catch (err) {
    res.status(404).json("ID not found");
    next(err);
  }
};

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCategory = new categoryModel(req.body);
    await newCategory.save();
    console.log(newCategory);
    res.status(200).json(newCategory);
  } catch (err) {
    next(err);
  }
};

const editCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json(category);
  } catch (err) {
    res.status(404).json("ID not found");
    next(err);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryModel.findByIdAndDelete(
      req.params.id,
      req.body
    );
    res.status(200).json(category);
  } catch (err) {
    res.status(404).json("ID not found");
    next(err);
  }
};

export {
  getAllCategories,
  getSingleCategory,
  createCategory,
  editCategory,
  deleteCategory,
};

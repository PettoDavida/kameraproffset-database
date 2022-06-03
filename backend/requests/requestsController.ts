import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../jwt.utils";
import { requestModel } from "./requestsModels";
import Crypto from "crypto";
import { UserModel } from "../user/userModels";
import { changePassword } from "../user/userController";

export const getAllRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allRequests = await requestModel.find({});
    res.status(200).json(allRequests);
  } catch (err) {
    res.status(404).json("No requests were found");
    next(err);
  }
};

export const createRequest = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.title) {
      res.status(400).json({ message: "Missing 'title'" });
      return;
    }

    if (!req.body.hasOwnProperty("passwordRequest")) {
      res.status(400).json({ message: "Missing 'passwordRequest'" });
      return;
    }

    let data = {
      title: req.body.title,
      passwordRequest: req.body.passwordRequest,
      requestingUserId: req.user.id,
    };

    const newRequest = new requestModel(data);
    await newRequest.save();
    console.log(newRequest);
    res.status(200).json(newRequest);
  } catch (err) {
    res.status(400).json("Not very nice request. I need more stuff");
    next(err);
  }
};

export const approveRequest = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  // Check record is approved
  // Update approve record
  // Update approve record admin
  // Check if approve record is "password reset"
  //    -
  // Else: Change user isAdmin

  try {
    let request = await requestModel.findById(req.params.id);
    if (!request.approved) {
      await requestModel.findByIdAndUpdate(request._id, {
        $set: { approved: true, approvingUserId: req.user.id },
      });

      let userId = request.requestingUserId.toString();

      if (request.passwordRequest) {
        // Password request
        let newPassword = Crypto.randomBytes(32).toString("hex");
        // Change user password
        changePassword(userId, newPassword);
        // Send password to admin
        res.status(200).json({ newUserPassword: newPassword });
      } else {
        // Admin request
        // Update user to isAdmin
        await UserModel.findByIdAndUpdate(userId, {
          $set: { isAdmin: true },
        });

        res.status(200).json({ success: true });
      }
    } else {
      res.sendStatus(418);
    }
  } catch (err) {
    res.status(404).json("ID was not found");
    next(err);
  }
};

export const deleteRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleteRequest = await requestModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteRequest);
  } catch (err) {
    res.status(404).json("ID was not found");
    next(err);
  }
};

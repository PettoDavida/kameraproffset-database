import mongoose, { ObjectId } from "mongoose";

export interface Request {
  title: String;
  approved: Boolean;
  requestingUserId: ObjectId;
  approvingUserId?: ObjectId;
  createdAt: Date;
  updateAt: Date;
  passwordRequest: Boolean;
}

export const requestSchema = new mongoose.Schema<Request>(
  {
    title: { type: String, required: true },
    approved: { type: Boolean, default: false },
    requestingUserId: { type: mongoose.Schema.Types.ObjectId, required: true },
    approvingUserId: { type: mongoose.Schema.Types.ObjectId, default: null },
    passwordRequest: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const requestModel = mongoose.model("request", requestSchema);

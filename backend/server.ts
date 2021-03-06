import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRouter from "./user/userRoutes";
import deliveryRouter from "./delivery/deliveryRoutes";
import orderRouter from "./order/orderRoutes";
import productRouter from "./product/productRoutes";
import requestRouter from "./requests/requestsRoutes";
import paymentRouter from "./payment/paymentRoutes";
import { categoryRouter } from "./category/categoryRoutes";
import { mediaRouter } from "./media/mediaRouter";

dotenv.config({ path: __dirname + "/.env" });

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

function err(message: string) {
  throw new Error(message);
}

const MONGO_URI =
  process.env.MONGO_CONNECT ||
  err("No 'MONGO_CONNECT' in enviroment variables");

mongoose.connect(`${MONGO_URI}`, { dbName: "kameraproffset" });
const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Mongoose Error");
  console.log(err);
});

db.once("open", () => console.log("Connected to database"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", userRouter);
app.use("/api", deliveryRouter);
app.use("/api", orderRouter);
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", requestRouter);
app.use("/api", paymentRouter);
app.use("/api", mediaRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

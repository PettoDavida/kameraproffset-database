import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import userRouter from "./user/routes/userRoutes";
import deliveryRouter from "./delivery/routes/deliveryRoutes";
import orderRouter from "./order/routes/orderRoutes";
import productRouter from "./product/routes/productRoutes";
import { categoryRouter } from "./category/routes/categoryRoutes";

dotenv.config({ path: __dirname + "/.env" });

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect(`${process.env.MONGO_CONNECT}`, { dbName: "kameraproffset" });
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

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

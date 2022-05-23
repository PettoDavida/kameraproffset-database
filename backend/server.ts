import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import userRouter from "./user/routes/userRoutes";
import deliveryRouter from "./delivery/routes/deliveryRoutes";
import orderRouter from "./order/routes/orderRoutes";
import productRouter from "./product/routes/productRoutes";

dotenv.config({ path: __dirname + "/.env" });

const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

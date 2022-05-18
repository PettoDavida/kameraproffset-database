import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import userRouter from './user/routes/userRoutes'
import deliveryRouter from './delivery/routes/deliveryRoutes'
import orderRouter from './order/routes/orderRoutes'
import paymentRouter from './payment/routes/paymentRoutes'
import productRouter from './product/routes/productRoutes'

dotenv.config({ path: __dirname+'/.env'})

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect(`${process.env.MONGO_CONNECT}`, {dbName: 'kameraproffset'});
const db = mongoose.connection;

db.on('error', (err)=>{
    console.log("Mongoose Error");
    console.log(err);
});

db.once('open', () => console.log("Connected to database"));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/users', userRouter);
app.use('/deliveryMethods', deliveryRouter);
app.use('/orders', orderRouter);
app.use('/paymentMethods', paymentRouter);
app.use('/products', productRouter);



app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})
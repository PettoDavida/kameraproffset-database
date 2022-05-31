import express from 'express';
import { getAllOrders, getOrderByID, getOrderByUserID, addOrder, setOrderToSent  } from '../controllers/orderController'


let orderRouter = express
                 .Router()
                 .get('/order', /* checkAdmin, */ getAllOrders)
                 .get('/order/:id',/* checkAdmin, */ getOrderByID)
                 .get('/order/:userID',/* selfOrAdmin, */ getOrderByUserID)
                 .post('/order', addOrder)
                 .put('/order/:id',/* checkAdmin, */ setOrderToSent)


export default orderRouter;
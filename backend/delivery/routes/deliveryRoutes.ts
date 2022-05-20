import express from 'express';
import { getAllDeliveryMethods, addDeliveryMethod, editDeliveryMethod, deleteDeliveryMethod } from '../controllers/deliveryController'

let deliveryRouter = express
        .Router()
        .get('/delivery', getAllDeliveryMethods)
        .post('/delivery', addDeliveryMethod)
        .put('/delivery/:id', editDeliveryMethod)
        .delete('/delivery/:id', deleteDeliveryMethod)


export default deliveryRouter;
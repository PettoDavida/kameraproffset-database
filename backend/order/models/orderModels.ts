import mongoose from 'mongoose'
import { Address, AddressModel }from '../../common'

export interface Order {
    products: []
    deliveryAddress: Address
    deliveryOption: String
    sent: Boolean
}

const orderSchema = new mongoose.Schema<Order>(
    {
        products: { type: [], required: true },
        deliveryAddress: { type: AddressModel, required: true },
        deliveryOption: { type: String, required: true },
        sent: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)




export const OrderModel = mongoose.model('order', orderSchema)

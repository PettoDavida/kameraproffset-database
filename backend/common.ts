import mongoose from 'mongoose'

export interface Address {
    street: String
    zipcode: Number
    city: String
    firstName: String
    lastName: String
}

export const AddressSchema = new mongoose.Schema<Address>(
    {
        street: { type: String, required: true },
        zipcode: { type: Number, required: true },
        city: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    }
)

export const AddressModel = mongoose.model('address', AddressSchema)
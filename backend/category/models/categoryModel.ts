import mongoose from 'mongoose'

export interface Category { 
    title: String,
    description: String
}

const categorySchema = new mongoose.Schema<Category>(
    {
        title: { type: String, required: true},
        description: { type: String, required: true}
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
)

export const categoryModel = mongoose.model('category', categorySchema)
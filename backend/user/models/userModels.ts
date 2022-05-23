import mongoose from 'mongoose'

export interface User {
    email: String
    hash: String
    salt: String
    isAdmin: Boolean
}

const userSchema = new mongoose.Schema<User>(
    {
        email: { 
            type: String, 
            required: true 
        },

        hash: { 
            type: String, 
            required: true 
        },

        salt: { 
            type: String, 
            required: true 
        },

        isAdmin: { 
            type: Boolean, 
            required: true, 
            default: false 
        },
    },
    {
        toJSON: { virtuals: true},
        toObject: { virtuals: true}
    }
)




export const UserModel = mongoose.model('user', userSchema)

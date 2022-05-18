import mongoose from 'mongoose'

export interface User {
    firstName: string
    lastName: string
    /** Virtual */ fullName: string
    email: string
    hash: string
    salt: string
    isAdmin: boolean
}

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        hash: { type: String, required: true },
        salt: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
    },
    {
        toJSON: { virtuals: true},
        toObject: { virtuals: true}
    }
)

userSchema.virtual('fullName').get(function (this: User){
    return this.firstName + ' ' + this.lastName;
})





export const UserModel = mongoose.model<User>('user', userSchema)

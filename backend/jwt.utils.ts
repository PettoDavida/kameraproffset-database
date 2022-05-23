import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken'import { UserModel } from './user/models/userModels'
import { NextFunction, Request, Response } from 'express'




export async function generateToken(user) {
    
}


export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    let authHeader = req.headers['authorization']

    let token = authHeader && authHeader.split(' ')[1]
    if (token) {
        verify(token, process.env.ACCESS_TOKEN_SECRET,async (err: unknown, data) => {
            
        })
    } else {
        res.status(401).json({ message: 'invalid token' })
    }
}
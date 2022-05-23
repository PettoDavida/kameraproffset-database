import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/userModels";
import * as crypto from 'crypto'


const getAllUsers  = async (req: Request, res: Response) => {
       let users = await UserModel.find();
       res.json(users);
}

const getUserByID = async (req: Request, res: Response) => {
       let user = await UserModel.findOne({ _id: req.params.id });
       res.json(user);
}

const updateUser = async (req: Request, res: Response) => {
     let password = req.body.oldPassword;
     let salt = req.user.salt
}

const addUser = async (req: Request, res: Response) => {
       if (!req.body.password) {
           res.status(400).json({ message: "Password required"});
           return;
       }

       if (!req.body.email) {
           res.status(400).json({ message: "Email required"});
           return;
       }

       let email = req.body.email
       let password = req.body.password

       let salt = crypto.randomBytes(16).toString('hex')
       let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

       const user = new UserModel({
              email,
              hash,
              salt
       })

       let dbEmail = await UserModel.findOne({email: req.body.email})
       if (!dbEmail) {
              const newUser = await user.save()
              res.status(201).json(newUser)
       } else {
              res.status(403).json({ message: 'This email already has an account' })
       }
}

const loginUser = async (req: Request, res: Response) => {
    let user = await UserModel.findOne({email: req.body.email})
    if (user) {
       let password = req.body.password;
       let salt = user.salt.toString();
       let hashPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString("hex");

       
    } else {
       res.status(403).json({ message: "Username or Password incorrect" })
    }
}

const logoutUser = async (req: Request, res: Response) => {
    
}

const deleteUser = async (req: Request, res: Response) => {
    
}

const checkAdmin = async (req: Request, res: Response) => {
    
}

export{getAllUsers, 
       getUserByID, 
       updateUser, 
       addUser, 
       loginUser, 
       logoutUser, 
       deleteUser, 
       checkAdmin}
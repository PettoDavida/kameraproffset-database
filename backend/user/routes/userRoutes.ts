import express from 'express';
import { getAllUsers, getUserByID, updateUser, addUser, loginUser, deleteUser, checkAdmin } from '../controllers/userController'
import { verifyToken } from '../../common'

let userRouter = express
                .Router()
                .get('/user', getAllUsers)
                .get('/user/:id', getUserByID)
                .post('/user', addUser)
                .post('/user/login', loginUser)
                .put('/user/:id', verifyToken, updateUser)
                .delete('/user/:id', deleteUser)


export default userRouter;
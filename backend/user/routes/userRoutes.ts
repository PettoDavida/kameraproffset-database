import express from 'express';
import { getAllUsers, getUserByID, updateUser, addUser, loginUser, deleteUser, checkAdmin } from '../controllers/userController'


let userRouter = express
                .Router()
                .get('/user', getAllUsers)
                .get('/user/:id', getUserByID)
                .post('/user', addUser)
                .post('/user/login', loginUser)
                .put('/user/:id', updateUser)
                .delete('/user/:id', deleteUser)


export default userRouter;
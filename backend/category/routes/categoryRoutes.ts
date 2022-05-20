import express from 'express'
import {getAllCategories, getSingleCategory, createCategory, editCategory, deleteCategory} from '../controller/categoryController'

let categoryRouter = express
        .Router()
        .get('/category', getAllCategories)
        .get('/category/:id', getSingleCategory)
        .post('/category', createCategory)
        .put('/category/:id', editCategory)
        .delete('/category/:id', deleteCategory)

export default categoryRouter;
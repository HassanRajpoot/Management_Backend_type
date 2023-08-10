import  express from "express";
import { isAuthenticated } from "../middleware/authentication";
import { getAllEmployments, createEmployment, updateEmployment, deleteEmployment } from '../controllers/Employement'

export default (router: express.Router) => {
    router.get('/employments', isAuthenticated, getAllEmployments);
    router.post('/new/employments', isAuthenticated, createEmployment);
    router.put('/update_employments/:id', isAuthenticated, updateEmployment);
    router.delete('/delete_employments/:id', isAuthenticated, deleteEmployment);
}
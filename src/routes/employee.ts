import express from "express";
import { NewEmployee, ReadEmployee, ReadEmployeeById, UpdateEmployee, DeleteEMployee } from "../controllers/employee";
import { isAuthenticated } from "../middleware/authentication";

export default (router: express.Router) => {
    router.post('/new/employees',isAuthenticated,NewEmployee);
    router.get('/employees',isAuthenticated,ReadEmployee);
    router.get('/employees/:id',isAuthenticated,ReadEmployeeById);
    router.put('/update_employees/:id',isAuthenticated,UpdateEmployee);
    router.delete('/delete_employees/:id',isAuthenticated,DeleteEMployee);
}
import express from 'express';
import { isAuthenticated } from "../middleware/authentication";
import { getAllRoles, createRole, updateRole, deleteRole } from '../controllers/role';

export default (router: express.Router) => {
    router.get('/roles', isAuthenticated, getAllRoles);
    router.post('/new/roles', isAuthenticated, createRole);
    router.put('/update_roles/:id', isAuthenticated, updateRole);
    router.delete('/delete_roles/:id', isAuthenticated, deleteRole);
    return router;

}
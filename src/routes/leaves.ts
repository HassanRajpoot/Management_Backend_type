import express from 'express';
import { isAuthenticated } from '../middleware/authentication';
import { CreateAttendance } from '../controllers/attendance ';

export default (router: express.Router) => {
    router.post('/new/attendance', isAuthenticated, CreateAttendance);
    return router;
}
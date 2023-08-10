import express from 'express';
import { isAuthenticated } from '../middleware/authentication';
import { CreateAttendance,UpdateAttendance,DeleteAttendance,ReadAttendance } from '../controllers/attendance ';

export default (router: express.Router) => {
    router.get('attendance', isAuthenticated, ReadAttendance);
    router.put('attendance/:id', isAuthenticated, UpdateAttendance);
    router.post('/new/attendance', isAuthenticated, CreateAttendance);
    router.delete('/delete_attendance/:id', isAuthenticated, DeleteAttendance);
}
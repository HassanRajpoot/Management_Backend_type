import express from 'express';
import { isAuthenticated } from '../middleware/authentication';
import {Creatnotification,Readnotification} from '../controllers/notification';

export default (router: express.Router) => {
    router.get('/notifications', isAuthenticated, Readnotification);
    router.post('/new/notifications', isAuthenticated, Creatnotification);
    return router;
}
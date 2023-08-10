import express from 'express';
import { isAuthenticated } from '../middleware/authentication';
import{createTrainingRoutes,readTrainingRoutes} from '../controllers/training'

export default (router: express.Router) => {
    router.get('/trainings', isAuthenticated, readTrainingRoutes);
    router.post('/new/trainings', isAuthenticated, createTrainingRoutes);
    return router;
}
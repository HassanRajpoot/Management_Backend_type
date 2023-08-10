import express from 'express';
import { isAuthenticated } from '../middleware/authentication';
import{readReviews,createReview,deleteReview,updatedReview,SingleReview} from '../controllers/review'


export default (router: express.Router) => {
    router.get('/reviews', isAuthenticated, readReviews);
    router.post('/new/reviews', isAuthenticated, createReview);
    router.delete('/reviews/:id', isAuthenticated, deleteReview);
    router.put('/reviews/:id', isAuthenticated, updatedReview);
    router.get('/reviews/:id', isAuthenticated, SingleReview);
}
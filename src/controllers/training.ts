import express from 'express';
import { Training } from '../db/employee';
import { isAuthenticated } from '../middleware/authentication';

const router = express.Router();
router.post('/new', isAuthenticated,async (req:express.Request, res:express.Response) => {
    try {
      const trainingData = req.body; // Assuming the request body contains the training data
      const training = await Training.create(trainingData);
      res.status(201).json(training);
    } catch (error) {
      res.status(500).json({ error: 'Error creating training record' });
    }
  });
  
  // Read training records
  router.get('/all', isAuthenticated,async (req:express.Request, res:express.Response) => {
    try {
      const trainingRecords = await Training.find().populate('employeeId');
      res.status(200).json(trainingRecords);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching training records' });
    }
  });

module.exports = router;

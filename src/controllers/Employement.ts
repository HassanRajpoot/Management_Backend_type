import { Employment } from '../db/employee';
import express from 'express'
import { isAuthenticated } from "../middleware/authentication";

const router = express.Router()

router.get('/all', isAuthenticated,async (req:express.Request, res:express.Response) => {
  try {
    const employments = await Employment.find()
      .populate('employeeId')
      .populate('roleId')
      .populate('supervisorId');
    res.json(employments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/new', isAuthenticated,async (req:express.Request, res:express.Response) => {
  try {
    const newEmployment = await Employment.create(req.body);
    res.status(201).json(newEmployment);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

router.put('/update_employments/:id', isAuthenticated,async (req:express.Request, res:express.Response) => {
  try {
    const updatedEmployment = await Employment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEmployment);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

router.delete('/delete_employments/:id', isAuthenticated,async (req:express.Request, res:express.Response) => {
  try {
    await Employment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employment details deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});


module.exports = router;
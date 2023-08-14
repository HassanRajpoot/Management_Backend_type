import { Role } from '../db/employee';
import express from 'express';
import { isAuthenticated } from "../middleware/authentication";

const router = express.Router()

router.get('/all', isAuthenticated,async (req:express.Request, res:express.Response) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/new', isAuthenticated,async (req:express.Request, res:express.Response) => {
  try {
    const newRole = await Role.create(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

router.put('/update_roles/:id', isAuthenticated, async (req:express.Request, res:express.Response) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedRole);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

router.delete('/delete_roles/:id', isAuthenticated, async (req:express.Request, res:express.Response) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

module.exports = router;

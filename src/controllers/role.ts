import { Role } from '../db/employee';
import express from 'express';
export const getAllRoles = async (req:express.Request, res:express.Response) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createRole = async (req:express.Request, res:express.Response) => {
  try {
    const newRole = await Role.create(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

export const updateRole = async (req:express.Request, res:express.Response) => {
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
};

export const deleteRole = async (req:express.Request, res:express.Response) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

import { Employee } from '../db/employee';
import express from 'express';

export const NewEmployee = async (req: express.Request, res: express.Response) => {
    try {
        const { firstName, lastName, dateOfBirth, gender, contact, address, cnic, numberLeaves } = req.body;
        const contactNo = await Employee.findOne({ cnic });
        if (contactNo) {
            return res.status(400).json({ message: "Employee already exists" });
        } else {
            await Employee.create({
                firstName,
                lastName,
                dateOfBirth,
                gender,
                contact,
                address,
                cnic,
                numberLeaves
            })
            res.status(200).json({ message: "Employee Added Sucessfully" });

        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read all employees
export const ReadEmployee = async (req: express.Request, res: express.Response) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read a specific employee
export const ReadEmployeeById = async (req: express.Request, res: express.Response) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an employee
export const UpdateEmployee = async (req: express.Request, res: express.Response) => {
    try {
        const { firstName, lastName, dateOfBirth, gender, contact, address, cnic, numberLeaves } = req.body;
        const EmployeeId = req.params.id;
        const updatedEmployee = await Employee.findByIdAndUpdate(EmployeeId, {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            contact,
            address,
            cnic,
            numberLeaves
        }, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an employee
export const DeleteEMployee = async (req: express.Request, res: express.Response) => {
    try {
        const employeeId = req.params.id;
        const deletedEmployee = await Employee.findByIdAndRemove(employeeId);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
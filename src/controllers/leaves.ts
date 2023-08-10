import { Attendance, Employee } from '../db/employee';
import express from 'express'

export const createAttendance = async (req:express.Request, res:express.Response) => {
  try {
    const { employeeId, date, checkInTime, checkOutTime } = req.body;

    // Calculate the duration in hours for the attendance
    const durationInHours = (checkOutTime - checkInTime) / (1000 * 60 * 60);

    // Fetch the employee's leave balance
    const employee = await Employee.findById(employeeId);

    // Calculate the number of leaves to deduct based on attendance duration
    const leavesToDeduct = Math.ceil(durationInHours / 8);

    // Ensure the leave balance is not negative
    if (leavesToDeduct <= employee.numberLeaves) {
      // Create the attendance record
      const newAttendance = await Attendance.create(req.body);

      // Update the employee's leave balance
      employee.numberLeaves -= leavesToDeduct;
      await employee.save();

      res.status(201).json({
        message: 'Attendance recorded and leaves deducted successfully',
        attendance: newAttendance,
        updatedEmployee: employee,
      });
    } else {
      res.status(400).json({ error: 'Insufficient leave balance' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

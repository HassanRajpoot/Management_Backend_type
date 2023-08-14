import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import { Secret } from 'jsonwebtoken';
import { Attendance } from './db/employee';
import { isAuthenticated } from './middleware/authentication';
import { Employee } from './db/employee';
import { Employment, Notification, Review ,Role,Training } from './db/employee';
import { User } from "./db/user";
import bcrypt from "bcrypt";
import { sendCookie } from "./utils/features";
import ErrorHandler from "./middleware/error";
import { Request, Response, NextFunction } from "express";


export const app = express();

app.use(cors({
  credentials: true,
}));
export const SECRET_KEY: Secret = 'your-secret-key-here';

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.get('/', (req: express.Request, res: express.Response) => {
  return res.send('Express Typescript on Vercel')
});
// Create attendance record
app.post('/attendance/new', isAuthenticated, async (req: express.Request, res: express.Response) => {
  try {
    const attendanceData = req.body; // Assuming the request body contains the attendance data
    const attendance = await Attendance.create(attendanceData);
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Error creating attendance record' });
  }
});

// Read attendance records
app.get('/attendance/read_attendance', isAuthenticated, async (req: express.Request, res: express.Response) => {
  try {
    const attendanceRecords = await Attendance.find().populate('employeeId');
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching attendance records' });
  }
});

// Update attendance record
app.put('/attendance/:id', isAuthenticated, async (req: express.Request, res: express.Response) => {
  try {
    const attendanceId = req.params.id;
    const updatedData = req.body;
    const updatedAttendance = await Attendance.findByIdAndUpdate(attendanceId, updatedData, { new: true });
    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(500).json({ error: 'Error updating attendance record' });
  }
});

// Delete attendance record
app.delete('/attendance/delete_attendance/:id', isAuthenticated, async (req: express.Request, res: express.Response) => {
  try {
    const attendanceId = req.params.id;
    await Attendance.findByIdAndDelete(attendanceId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting attendance record' });
  }
});
app.post('/employee/new', isAuthenticated, async (req: express.Request, res: express.Response) => {
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
});

// Read all employees
app.get('/employee/all', isAuthenticated, async (req: express.Request, res: express.Response) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read a specific employee
app.get('/employee/:id', isAuthenticated, async (req: express.Request, res: express.Response) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an employee
app.put('/employee/update_employees/:id', isAuthenticated, async (req: express.Request, res: express.Response) => {
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
});

// Delete an employee
app.delete('/employee/delete_employees/:id', isAuthenticated, async (req: express.Request, res: express.Response) => {
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
});

app.get('/employement/all', isAuthenticated, async (req: express.Request, res: express.Response) => {
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

app.post('/employement/new', isAuthenticated, async (req: express.Request, res: express.Response) => {
  try {
    const newEmployment = await Employment.create(req.body);
    res.status(201).json(newEmployment);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

app.put('/employement/update_employments/:id', isAuthenticated, async (req: express.Request, res: express.Response) => {
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

app.delete('/employement/delete_employments/:id', isAuthenticated, async (req: express.Request, res: express.Response) => {
  try {
    await Employment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employment details deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});
app.post('/leaves/new', isAuthenticated, async (req: express.Request, res: express.Response) => {
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
});

app.get('/notification/new', isAuthenticated, async (req: express.Request, res: express.Response) => {
  try {
    const notificationData = req.body; // Assuming the request body contains the notification data
    const notification = await Notification.create(notificationData);
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Error creating notification' });
  }
});

// Read notifications
app.post('/notification/all', isAuthenticated, async (req: express.Request, res: express.Response) => {
  try {
    const notificationRecords = await Notification.find().populate('employeeId');
    res.status(200).json(notificationRecords);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notifications' });
  }
});

// Create review record
app.post('/review/new', isAuthenticated, async (req: express.Request, res: express.Response) => {
  try {
    const reviewData = req.body; // Assuming the request body contains the review data
    const review = await Review.create(reviewData);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Error creating review record' });
  }
});

// Read review records
app.get('/review/all', isAuthenticated, async (req: express.Request, res: express.Response) => {
  try {
    const reviewRecords = await Review.find().populate('employeeId reviewerId');
    res.status(200).json(reviewRecords);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching review records' });
  }
});

// Read single review record
app.get('/review/single/:id', isAuthenticated, async (req: express.Request, res: express.Response) => {
  try {
    const reviewId = req.params.id;
    const reviewRecord = await Review.findById(reviewId).populate('employeeId reviewerId');
    if (!reviewRecord) {
      res.status(404).json({ error: 'Review record not found' });
    } else {
      res.status(200).json(reviewRecord);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching review record' });
  }
});

// Update review record
app.put('/review/:id', isAuthenticated, async (req: express.Request, res: express.Response) => {
  try {
    const reviewId = req.params.id;
    const updatedData = req.body;
    const updatedReview = await Review.findByIdAndUpdate(reviewId, updatedData, { new: true });
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: 'Error updating review record' });
  }
});

// Delete review record
app.delete('/review/reviews_delete/:id', isAuthenticated, async (req: express.Request, res: express.Response) => {
  try {
    const reviewId = req.params.id;
    await Review.findByIdAndDelete(reviewId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting review record' });
  }
});

app.get('/role/all', isAuthenticated,async (req:express.Request, res:express.Response) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/role/new', isAuthenticated,async (req:express.Request, res:express.Response) => {
  try {
    const newRole = await Role.create(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

app.put('/role/update_roles/:id', isAuthenticated, async (req:express.Request, res:express.Response) => {
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

app.delete('/role/delete_roles/:id', isAuthenticated, async (req:express.Request, res:express.Response) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

app.post('/training/new', isAuthenticated,async (req:express.Request, res:express.Response) => {
  try {
    const trainingData = req.body; // Assuming the request body contains the training data
    const training = await Training.create(trainingData);
    res.status(201).json(training);
  } catch (error) {
    res.status(500).json({ error: 'Error creating training record' });
  }
});

// Read training records
app.get('/training/all', isAuthenticated,async (req:express.Request, res:express.Response) => {
  try {
    const trainingRecords = await Training.find().populate('employeeId');
    res.status(200).json(trainingRecords);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching training records' });
  }
});


app.post("/user/login",async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
});

app.post("/user/new",async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
});

app.get("/user/logout",(req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
    });
});

const server = http.createServer(app);
const MONGO_URL = 'mongodb+srv://Hassan:Hassan12@cluster0.bwnuxit.mongodb.net/?retryWrites=true&w=majority'; // DB URI

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});

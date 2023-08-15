"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_KEY = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const employee_1 = require("./db/employee");
const authentication_1 = require("./middleware/authentication");
const employee_2 = require("./db/employee");
const employee_3 = require("./db/employee");
const user_1 = require("./db/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const features_1 = require("./utils/features");
const error_1 = __importDefault(require("./middleware/error"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    credentials: true,
}));
exports.SECRET_KEY = 'your-secret-key-here';
exports.app.use((0, compression_1.default)());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(body_parser_1.default.json());
exports.app.get('/', (req, res) => {
    return res.send('Express Typescript on Vercel');
});
// Create attendance record
exports.app.post('/attendance/new', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendanceData = req.body; // Assuming the request body contains the attendance data
        const attendance = yield employee_1.Attendance.create(attendanceData);
        res.status(201).json(attendance);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating attendance record' });
    }
}));
// Read attendance records
exports.app.get('/attendance/read_attendance', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendanceRecords = yield employee_1.Attendance.find().populate('employeeId');
        res.status(200).json(attendanceRecords);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching attendance records' });
    }
}));
// Update attendance record
exports.app.put('/attendance/:id', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendanceId = req.params.id;
        const updatedData = req.body;
        const updatedAttendance = yield employee_1.Attendance.findByIdAndUpdate(attendanceId, updatedData, { new: true });
        res.status(200).json(updatedAttendance);
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating attendance record' });
    }
}));
// Delete attendance record
exports.app.delete('/attendance/delete_attendance/:id', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendanceId = req.params.id;
        yield employee_1.Attendance.findByIdAndDelete(attendanceId);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting attendance record' });
    }
}));
exports.app.post('/employee/new', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, dateOfBirth, gender, contact, address, cnic, numberLeaves } = req.body;
        const contactNo = yield employee_2.Employee.findOne({ cnic });
        if (contactNo) {
            return res.status(400).json({ message: "Employee already exists" });
        }
        else {
            yield employee_2.Employee.create({
                firstName,
                lastName,
                dateOfBirth,
                gender,
                contact,
                address,
                cnic,
                numberLeaves
            });
            res.status(200).json({ message: "Employee Added Sucessfully" });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
// Read all employees
exports.app.get('/employee/all', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield employee_2.Employee.find();
        res.json(employees);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Read a specific employee
exports.app.get('/employee/:id', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield employee_2.Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Update an employee
exports.app.put('/employee/update_employees/:id', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, dateOfBirth, gender, contact, address, cnic, numberLeaves } = req.body;
        const EmployeeId = req.params.id;
        const updatedEmployee = yield employee_2.Employee.findByIdAndUpdate(EmployeeId, {
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
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
// Delete an employee
exports.app.delete('/employee/delete_employees/:id', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeId = req.params.id;
        const deletedEmployee = yield employee_2.Employee.findByIdAndRemove(employeeId);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.app.get('/employement/all', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employments = yield employee_3.Employment.find()
            .populate('employeeId')
            .populate('roleId')
            .populate('supervisorId');
        res.json(employments);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.app.post('/employement/new', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEmployment = yield employee_3.Employment.create(req.body);
        res.status(201).json(newEmployment);
    }
    catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
}));
exports.app.put('/employement/update_employments/:id', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedEmployment = yield employee_3.Employment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEmployment);
    }
    catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
}));
exports.app.delete('/employement/delete_employments/:id', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield employee_3.Employment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Employment details deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
}));
exports.app.post('/leaves/new', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId, date, checkInTime, checkOutTime } = req.body;
        const checkInTimestamp = Date.parse(checkInTime);
        const checkOutTimestamp = Date.parse(checkOutTime);
        // Calculate the difference in milliseconds
        const timeDifferenceMs = checkOutTimestamp - checkInTimestamp;
        // Calculate the duration in hours
        const durationInHours = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
        // Find the employee by ID
        const employee = yield employee_2.Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        // Calculate the number of leaves to deduct based on attendance duration
        const leavesToDeduct = durationInHours;
        // Check if the leave balance is sufficient
        if (employee.numberLeaves >= leavesToDeduct) {
            // Create the attendance record
            const newAttendance = yield employee_1.Attendance.create(req.body);
            // Update the employee's leave balance
            employee.numberLeaves -= leavesToDeduct;
            yield employee.save();
            res.status(201).json({
                message: 'Attendance recorded and leaves deducted successfully',
                attendance: newAttendance,
                updatedEmployee: employee,
            });
        }
        else {
            res.status(400).json({ message: employee.numberLeaves,
                attendance: durationInHours });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
}));
exports.app.post('/notification/new', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notificationData = req.body; // Assuming the request body contains the notification data
        const notification = yield employee_3.Notification.create(notificationData);
        res.status(201).json(notification);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating notification' });
    }
}));
// Read notifications
exports.app.get('/notification/all', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notificationRecords = yield employee_3.Notification.find().populate('employeeId');
        res.status(200).json(notificationRecords);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching notifications' });
    }
}));
// Create review record
exports.app.post('/review/new', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewData = req.body; // Assuming the request body contains the review data
        const review = yield employee_3.Review.create(reviewData);
        res.status(201).json(review);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating review record' });
    }
}));
// Read review records
exports.app.get('/review/all', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewRecords = yield employee_3.Review.find().populate('employeeId reviewerId');
        res.status(200).json(reviewRecords);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching review records' });
    }
}));
// Read single review record
exports.app.get('/review/single/:id', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewId = req.params.id;
        const reviewRecord = yield employee_3.Review.findById(reviewId).populate('employeeId reviewerId');
        if (!reviewRecord) {
            res.status(404).json({ error: 'Review record not found' });
        }
        else {
            res.status(200).json(reviewRecord);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching review record' });
    }
}));
// Update review record
exports.app.put('/review/:id', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewId = req.params.id;
        const updatedData = req.body;
        const updatedReview = yield employee_3.Review.findByIdAndUpdate(reviewId, updatedData, { new: true });
        res.status(200).json(updatedReview);
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating review record' });
    }
}));
// Delete review record
exports.app.delete('/review/reviews_delete/:id', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewId = req.params.id;
        yield employee_3.Review.findByIdAndDelete(reviewId);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting review record' });
    }
}));
exports.app.get('/role/all', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield employee_3.Role.find();
        res.json(roles);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.app.post('/role/new', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRole = yield employee_3.Role.create(req.body);
        res.status(201).json(newRole);
    }
    catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
}));
exports.app.put('/role/update_roles/:id', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRole = yield employee_3.Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRole);
    }
    catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
}));
exports.app.delete('/role/delete_roles/:id', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield employee_3.Role.findByIdAndDelete(req.params.id);
        res.json({ message: 'Role deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: 'Bad request' });
    }
}));
exports.app.post('/training/new', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainingData = req.body; // Assuming the request body contains the training data
        const training = yield employee_3.Training.create(trainingData);
        res.status(201).json(training);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating training record' });
    }
}));
// Read training records
exports.app.get('/training/all', authentication_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainingRecords = yield employee_3.Training.find().populate('employeeId');
        res.status(200).json(trainingRecords);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching training records' });
    }
}));
exports.app.post("/user/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.User.findOne({ email }).select("+password");
        if (!user)
            return next(new error_1.default("Invalid Email or Password", 400));
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return next(new error_1.default("Invalid Email or Password", 400));
        (0, features_1.sendCookie)(user, res, `Welcome back, ${user.name}`, 200);
    }
    catch (error) {
        next(error);
    }
}));
exports.app.post("/user/new", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        let user = yield user_1.User.findOne({ email });
        if (user)
            return next(new error_1.default("User Already Exist", 400));
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        user = yield user_1.User.create({ name, email, password: hashedPassword });
        (0, features_1.sendCookie)(user, res, "Registered Successfully", 201);
    }
    catch (error) {
        next(error);
    }
}));
exports.app.get("/user/logout", (req, res, next) => {
    res
        .status(200)
        .cookie("token", "", {
        expires: new Date(Date.now()),
    })
        .json({
        success: true,
    });
});
const server = http_1.default.createServer(exports.app);
const MONGO_URL = 'mongodb+srv://Hassan:Hassan12@cluster0.bwnuxit.mongodb.net/?retryWrites=true&w=majority'; // DB URI
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(MONGO_URL);
mongoose_1.default.connection.on('error', (error) => console.log(error));
server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/');
});
//# sourceMappingURL=index.js.map
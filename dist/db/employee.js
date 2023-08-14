"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = exports.Training = exports.Review = exports.Salary = exports.Leave = exports.Attendance = exports.Employment = exports.Role = exports.Employee = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Employee Information Schema
const employeeSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    gender: String,
    contact: String,
    address: String,
    cnic: String,
    numberLeaves: Number
});
// Employee Roles and Permissions Schema
const roleSchema = new mongoose_1.default.Schema({
    roleName: String,
    permissions: [String],
});
// Employee Employment Details Schema
const employmentSchema = new mongoose_1.default.Schema({
    employeeId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Employee' },
    roleId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Role' },
    department: String,
    supervisorId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Employee' },
    startDate: Date,
    endDate: Date,
    employmentStatus: String,
});
// Attendance Tracking Schema
const attendanceSchema = new mongoose_1.default.Schema({
    employeeId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Employee' },
    date: Date,
    checkInTime: Date,
    checkOutTime: Date,
});
// Leave Management Schema
const leaveSchema = new mongoose_1.default.Schema({
    employeeId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Employee' },
    leaveType: String,
    startDate: Date,
    endDate: Date,
    leaveStatus: String,
    reason: String,
});
// Salary and Compensation Schema
const salarySchema = new mongoose_1.default.Schema({
    employeeId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Employee' },
    salaryAmount: Number,
    paymentFrequency: String,
    bankAccount: String,
    taxInfo: String,
    deductions: [String],
});
// Performance Reviews Schema
const reviewSchema = new mongoose_1.default.Schema({
    employeeId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Employee' },
    reviewerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Employee' },
    reviewDate: Date,
    performanceMetrics: String,
    feedback: String,
});
// Training and Development Schema
const trainingSchema = new mongoose_1.default.Schema({
    employeeId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Employee' },
    trainingName: String,
    trainingDate: Date,
    trainingDuration: String,
    trainingProvider: String,
    skillsDeveloped: [String],
});
// Notifications and Alerts Schema
const notificationSchema = new mongoose_1.default.Schema({
    employeeId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Employee' },
    notificationType: String,
    notificationContent: String,
    timestamp: Date,
});
// Create models based on the schemas
exports.Employee = mongoose_1.default.model('Employee', employeeSchema);
exports.Role = mongoose_1.default.model('Role', roleSchema);
exports.Employment = mongoose_1.default.model('Employment', employmentSchema);
exports.Attendance = mongoose_1.default.model('Attendance', attendanceSchema);
exports.Leave = mongoose_1.default.model('Leave', leaveSchema);
exports.Salary = mongoose_1.default.model('Salary', salarySchema);
exports.Review = mongoose_1.default.model('Review', reviewSchema);
exports.Training = mongoose_1.default.model('Training', trainingSchema);
exports.Notification = mongoose_1.default.model('Notification', notificationSchema);
//# sourceMappingURL=employee.js.map
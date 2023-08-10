import mongoose from "mongoose";
// Employee Information Schema
const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: String,
  contact: String,
  address: String,
  cnic: String,
  numberLeaves:Number
});

// Employee Roles and Permissions Schema
const roleSchema = new mongoose.Schema({
  roleName: String,
  permissions: [String],
});

// Employee Employment Details Schema
const employmentSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  department: String,
  supervisorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  startDate: Date,
  endDate: Date,
  employmentStatus: String,
});

// Attendance Tracking Schema
const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  date: Date,
  checkInTime: Date,
  checkOutTime: Date,
});

// Leave Management Schema
const leaveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  leaveType: String,
  startDate: Date,
  endDate: Date,
  leaveStatus: String,
  reason: String,
});
// Salary and Compensation Schema
const salarySchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  salaryAmount: Number,
  paymentFrequency: String,
  bankAccount: String,
  taxInfo: String,
  deductions: [String],
});

// Performance Reviews Schema
const reviewSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  reviewDate: Date,
  performanceMetrics: String,
  feedback: String,
});

// Training and Development Schema
const trainingSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  trainingName: String,
  trainingDate: Date,
  trainingDuration: String,
  trainingProvider: String,
  skillsDeveloped: [String],
});

// Notifications and Alerts Schema
const notificationSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  notificationType: String,
  notificationContent: String,
  timestamp: Date,
});

// Create models based on the schemas
export const Employee = mongoose.model('Employee', employeeSchema);
export const Role = mongoose.model('Role', roleSchema);
export const Employment = mongoose.model('Employment', employmentSchema);
export const Attendance = mongoose.model('Attendance', attendanceSchema);
export const Leave = mongoose.model('Leave', leaveSchema);
export const Salary = mongoose.model('Salary', salarySchema);
export const Review = mongoose.model('Review', reviewSchema);
export const Training = mongoose.model('Training', trainingSchema);
export const Notification = mongoose.model('Notification', notificationSchema);
import express from 'express';
import userRoutes from './userRoutes';
import EmployeeRoutes from './employee'
import EmployeementROuter from './employeement';
import RoleRouter from './role';
import leavesRouter from './leaves'
import attendanceRouter from './attendance';
import trainingRouter from './training';
import notificationRoute from './notification';
import reviewRouter from './review';

const router = express.Router();

export default (): express.Router => {
  userRoutes(router);
  EmployeeRoutes(router);
  EmployeementROuter(router);
  RoleRouter(router);
  leavesRouter(router);
  attendanceRouter(router);
  trainingRouter(router);
  notificationRoute(router);
  reviewRouter(router);
return router;
};
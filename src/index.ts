import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import { Secret} from 'jsonwebtoken';


const AttendanceRouter = require('./controllers/attendance ');
const EmpRouter = require('./controllers/employee');
const userRouter = require('./controllers/user');
const employementRouter = require('./controllers/Employement');
const LeavesRouter = require('./controllers/leaves');
const notRouter = require('./controllers/notification');
const revRouter = require('./controllers/review');
const roleRouter = require('./controllers/role');
const trainingRouter = require('./controllers/training');


export const app = express();

app.use(cors({
  credentials: true,
}));
export const SECRET_KEY: Secret = 'your-secret-key-here';

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/attendance',AttendanceRouter);
app.use('/employee',EmpRouter);
app.use('/user',userRouter);
app.use('/employement',employementRouter);
app.use('/leaves',LeavesRouter);
app.use('/notification',notRouter)
app.use('/review',revRouter)
app.use('/role',roleRouter);
app.use('/training',trainingRouter);

export const server = http.createServer(app);
const MONGO_URL = 'mongodb+srv://Hassan:Hassan12@cluster0.bwnuxit.mongodb.net/?retryWrites=true&w=majority'; // DB URI

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});

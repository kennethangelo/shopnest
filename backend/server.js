//Entry point for our server, API, backend, etc
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
//if no port in env, use 5000
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js'

//To connect to MongoDB
connectDB();

const app = express();

//To allow parse raw JSON
app.use(express.json());
//To allow send form data
app.use(express.urlencoded({extended: true}));

//For auth middleware
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

//Initialize error middleware
//If not use custom error handler, error will be shown in HTML which we don't want
app.use(notFound);
app.use(errorHandler); //need to learn this!!

app.listen(port, () => console.log(`Server started on port ${port}`));

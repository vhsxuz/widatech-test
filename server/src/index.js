import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';

import transaction_routers from './routes/transaction_router.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Use morgan for logging
app.use(morgan('dev'));

// Enable CORS
app.use(cors());

app.get('/', async (req, res, next) => {
  return res.status(200).send({ msg: 'This part is OK' });
});

// routers
app.use("/api/v1/transactions", transaction_routers);

app.listen(port, async () => {
  console.log(`[*] Server Running on Port ${port}`);
});
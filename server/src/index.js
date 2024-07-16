import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';


dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

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

app.listen(port, async () => {
  console.log(`[*] Server Running on Port ${port}`);
});
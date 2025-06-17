import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import router from './router/router.js'; 

const server = express();

server.use(cors());
server.use(express.json({ limit: '2gb' }));
server.use(express.urlencoded({ limit: '2gb', extended: true }));

server.use(router);

const PORT = 5000;

server.get('/', (req, res) => {
  res.status(200).json("HR PAYROLL SERVER STARTED");
});

server.listen(PORT, () => {
  console.log('HR PAYROLL STARTED AT PORT: ', PORT);
});

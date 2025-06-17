import express from 'express';
import { generatePayroll } from '../controller/cygnonex.js'; 

const router = express.Router();

router.get('/generate-payroll', generatePayroll);

export default router; 

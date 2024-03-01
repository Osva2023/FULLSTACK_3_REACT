import express from 'express';
import { findTransactionList } from '../controller/transaction.controller.js';

const router = express.Router();

router.get('/api/transaction-data', findTransactionList);

export default router;
import express from "express";
import {
  findTransactionList,
  createTransaction,
} from "../controller/transaction.controller.js";

const router = express.Router();

router.get("/api/transaction-data", findTransactionList);
router.post(
  "/api/transaction",
  (req, res, next) => {
    console.log("POST /api/transaction route hit");
    next();
  },
  createTransaction
);

export default router;

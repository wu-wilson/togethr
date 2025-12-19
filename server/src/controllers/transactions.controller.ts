import { Request, Response } from "express";
import { pool } from "../index.js";
import { Transaction } from "../../../packages/types/src/transaction.js";

export const getTransactions = async (
  req: Request,
  res: Response<Transaction[] | { error: string }>
) => {
  const { start, end } = req.query;

  if (!start || !end) {
    res.status(400).json({ error: "start and end are required" });
    return;
  }

  try {
    const { rows: transactions } = await pool.query(
      `
      SELECT *
      FROM transactions
      WHERE 
        transactions.transaction_date >= $1 AND 
        transactions.transaction_date <= $2
      `,
      [start, end]
    );
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

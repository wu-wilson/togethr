import { Request, Response } from "express";
import { pool } from "../index.js";
import {
  AddTransactionPayload,
  AddTransactionResponse,
  DeleteTransactionParams,
  DeleteTransactionResponse,
  Transaction,
  UpdateTransactionParams,
  UpdateTransactionPayload,
  UpdateTransactionResponse,
} from "../../../packages/types/src/transaction.js";

export const getTransactions = async (
  req: Request,
  res: Response<Transaction[] | { error: string }>
) => {
  const { from, to } = req.query;

  if (!from || !to) {
    res.status(400).json({ error: "from and to are required" });
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
      [from, to]
    );
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addTransaction = async (
  req: Request<{}, AddTransactionResponse, AddTransactionPayload>,
  res: Response<AddTransactionResponse | { error: string }>
) => {
  const { amount, category_id, member_id, transaction_date } = req.body;

  if (
    isNaN(amount) ||
    isNaN(category_id) ||
    isNaN(member_id) ||
    !transaction_date
  ) {
    res.status(400).json({
      error:
        "amount, category_id, member_id, and transaction_date are required",
    });
    return;
  }

  try {
    const {
      rows: [addedTransaction],
    } = await pool.query(
      `INSERT INTO transactions (amount, category_id, member_id, transaction_date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [amount, category_id, member_id, transaction_date]
    );

    res.status(201).json({
      message: "Transaction added successfully",
      added: addedTransaction,
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTransaction = async (
  req: Request<DeleteTransactionParams>,
  res: Response<DeleteTransactionResponse | { error: string }>
) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "id is required" });
    return;
  }

  try {
    const {
      rows: [deletedTransaction],
    } = await pool.query(
      `DELETE FROM transactions
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (!deletedTransaction) {
      res.status(404).json({ error: "Transaction does not exist" });
      return;
    }

    res.json({
      message: "Transaction removed successfully",
      deleted: deletedTransaction,
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTransaction = async (
  req: Request<
    UpdateTransactionParams,
    UpdateTransactionResponse,
    UpdateTransactionPayload
  >,
  res: Response<UpdateTransactionResponse | { error: string }>
) => {
  const { id } = req.params;
  const { member_id, category_id, amount, transaction_date } = req.body;

  if (
    !id ||
    isNaN(member_id) ||
    isNaN(category_id) ||
    isNaN(amount) ||
    !transaction_date
  ) {
    res.status(400).json({
      error:
        "id, member_id, category_id, amount, and transaction_date are required",
    });
    return;
  }

  try {
    const {
      rows: [updatedTransaction],
    } = await pool.query(
      `UPDATE transactions
       SET
        member_id = $2,
        category_id = $3,
        amount = $4,
        transaction_date = $5
       WHERE id = $1
       RETURNING *;`,
      [id, member_id, category_id, amount, transaction_date]
    );

    if (!updatedTransaction) {
      res.status(404).json({ error: "Transaction does not exist" });
      return;
    }

    res.json({
      message: "Transaction updated successfully",
      updated: updatedTransaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

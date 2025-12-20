import express from "express";
import * as util from "../controllers/transactions.controller.js";

const transactionsRouter = express.Router();

transactionsRouter.get("/", util.getTransactions);
transactionsRouter.post("/add", util.addTransaction);
transactionsRouter.delete("/delete/:id", util.deleteTransaction);
transactionsRouter.patch("/update/:id", util.updateTransaction);

export default transactionsRouter;

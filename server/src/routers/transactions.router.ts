import express from "express";
import * as util from "../controllers/transactions.controller.js";

const transactionsRouter = express.Router();

transactionsRouter.get("/", util.getTransactions);

export default transactionsRouter;

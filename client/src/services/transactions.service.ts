import { BASE_URL } from "./constants";
import type {
  AddTransactionPayload,
  AddTransactionResponse,
  GetTransactionsParams,
  Transaction,
} from "@together/types";
import axios from "axios";

const TRANSACTIONS_SERVICE_BASE_URL = BASE_URL + "/transactions";

export const fetchTransactions = async (params: GetTransactionsParams) => {
  const response = await axios.get<Transaction[]>(
    TRANSACTIONS_SERVICE_BASE_URL,
    {
      params: {
        from: params.from,
        to: params.to,
      },
    }
  );
  return response.data;
};

export const addTransaction = async (payload: AddTransactionPayload) => {
  const response = await axios.post<AddTransactionResponse>(
    `${TRANSACTIONS_SERVICE_BASE_URL}/add`,
    payload
  );
  return response.data;
};

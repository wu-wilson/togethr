import { BASE_URL } from "./constants";
import type {
  AddTransactionPayload,
  AddTransactionResponse,
  DeleteTransactionParams,
  DeleteTransactionResponse,
  GetTransactionsParams,
  Transaction,
  UpdateTransactionParams,
  UpdateTransactionPayload,
  UpdateTransactionResponse,
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

export const deleteTransaction = async (params: DeleteTransactionParams) => {
  const response = await axios.delete<DeleteTransactionResponse>(
    `${TRANSACTIONS_SERVICE_BASE_URL}/delete/${params.id}`
  );

  return response.data;
};

export const updateTransaction = async (
  params: UpdateTransactionParams,
  payload: UpdateTransactionPayload
) => {
  const response = await axios.patch<UpdateTransactionResponse>(
    `${TRANSACTIONS_SERVICE_BASE_URL}/update/${params.id}`,
    payload
  );
  return response.data;
};

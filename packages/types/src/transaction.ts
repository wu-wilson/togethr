export type Transaction = {
  id: number;
  member_id: number;
  category_id?: number | null;
  amount: number;
  transaction_date: Date;
};

export type GetTransactionsParams = {
  from: string;
  to: string;
};

export type AddTransactionPayload = {
  member_id: number;
  category_id: number;
  amount: number;
  transaction_date: Date;
};

export type AddTransactionResponse = {
  message: string;
  added: Transaction;
};

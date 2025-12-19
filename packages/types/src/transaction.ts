export type Transaction = {
  id: number;
  member_id: number;
  category_id?: number | null;
  description?: string | null;
  amount: number;
  transaction_date: Date;
};

export type GetTransactionsParams = {
  from: string;
  to: string;
};

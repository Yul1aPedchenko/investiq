export interface Transaction {
  _id: string;
  userId: string;
  type: "income" | "expense";
  description: string;
  category: string;
  amount: number;
  date: string;
}

export interface TransactionsState {
  items: Transaction[];
  isLoading: boolean;
  error: string | null;
}

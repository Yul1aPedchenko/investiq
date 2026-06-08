export interface TransactionFormProps {
  type: "expense" | "income";
}

export interface TransactionFormValues {
  type: "income" | "expense";
  description: string;
  category: string;
  amount: number | "";
  date: string;
}

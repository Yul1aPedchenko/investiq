export interface TransactionFormProps {
  transactionType: "expense" | "income";
  // setTransactionType: React.Dispatch<React.SetStateAction< "expense" | "income">>
}

export interface TransactionFormValues {
  type: "income" | "expense";
  description: string;
  category: string;
  amount: number | "";
  date: string;
}

export interface Transaction {
  _id: string;
  type: "income" | "expense";
  description: string;
  category: string;
  amount: number;
  date: string;
}

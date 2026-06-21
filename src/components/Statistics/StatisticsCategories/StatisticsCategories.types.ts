import type { Transaction } from "../../../redux/transactions/types";

export interface Props {
  transactions: Transaction[];
}

export type CategoriesMap = Record<string, number>;

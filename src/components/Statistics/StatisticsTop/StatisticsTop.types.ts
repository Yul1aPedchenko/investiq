import type { Transaction } from "../../../redux/transactions/types"; 

export interface Props {
  transactions: Transaction[];
  selectedDate: Date;
  prevMonth: () => void;
  nextMonth: () => void;
  disablePrev: boolean;
  disableNext: boolean;
}
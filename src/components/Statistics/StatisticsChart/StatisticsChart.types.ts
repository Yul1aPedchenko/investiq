export interface ChartItem {
  name: string;
  amount: number;
}

export interface Props {
  data: ChartItem[];
  category: string|null;
}
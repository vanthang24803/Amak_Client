export type BarChart = {
  year: Record<string, number>;
  month: Record<string, number>;
  week: Record<string, number>;
};

export type YearChart = {
  month: string;
  total: any;
};

export type AreaChart = {
  week: DataEntry[];
  month: DataEntry[];
};

export type DataEntry = {
  date: string;
  input: number;
  output: number;
};

export type PieChart = {
  month: string;
  account: number;
};

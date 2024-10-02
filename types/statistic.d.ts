export type AnalyticStatistic = {
  warehouse: Statistic;
  order: Statistic;
  revenue: Statistic;
  saleOut: Statistic;
};

type Statistic = {
  isStock: boolean;
  stock: number;
  total: number;
};

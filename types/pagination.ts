export type Pagination<T> = {
  currentPage: number;
  items: number;
  totalItems: number;
  totalPage: number;
  result: T;
};

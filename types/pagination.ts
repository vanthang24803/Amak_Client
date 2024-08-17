export type Pagination<T> = {
  _currentPage: number;
  _totalPage: number;
  _limit: number;
  _totalItems: number;
  result: T;
};

import { Pagination, Product, ProductDetail, Response } from "@/types";
import _http from "@/utils/http";

const fetchDetailProduct = (id: string | undefined) =>
  _http.get<Response<ProductDetail>>(`/Products/${id}`);

const fetchProducts = (page: number = 1, limit: number = 10) =>
  _http.get<Pagination<Product[]>>(`/Products`, {
    params: {
      Limit: limit,
      Page: page,
      OrderBy: "Lasted",
    },
  });

export { fetchDetailProduct, fetchProducts };

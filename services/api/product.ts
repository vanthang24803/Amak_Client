import { Product, ProductDetail, Response } from "@/types";
import _http from "@/utils/http";

const fetchDetailProduct = (id: string | undefined) =>
  _http.get<Response<ProductDetail>>(`/Products/${id}`);

const fetchProducts = () =>
  _http.get<Response<Product[]>>(`/Products`, {
    params: {
      Limit: 100,
      OrderBy: "Lasted",
    },
  });

export { fetchDetailProduct, fetchProducts };

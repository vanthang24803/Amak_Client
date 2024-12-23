// import { Pagination } from "@/types";
import { ListFlashSale, Response } from "@/types";
import _http from "@/utils/http";

const fetchAllFlashSale = async () => {
  const response = await _http.get<Response<ListFlashSale[]>>("/FlashSale");

  if (response.status === 200) {
    return response.data.result;
  }

  throw new Error("Fetching FLash Sale Wrong!");
};

export { fetchAllFlashSale };

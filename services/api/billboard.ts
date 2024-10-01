import { Response, Billboard } from "@/types";
import _http from "@/utils/http";

const fetchBillboards = async () => {
  const response = await _http.get<Response<Billboard[]>>(`/Billboards`);

  if (response.status === 200) {
    return response.data.result;
  }

  throw new Error("Fetching Order Wrong!");
};

export { fetchBillboards };

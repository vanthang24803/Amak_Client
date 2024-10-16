import { Response } from "@/types";
import { Search } from "@/types/search";
import _http from "@/utils/http";

const fetchSearch = async (name: string) => {
  const response = await _http.get<Response<Search>>("/Analytic/Search", {
    params: {
      Name: name,
    },
  });

  if (response.status === 200) {
    return response.data.result;
  }

  throw new Error("Fetching Prompt Wrong!");
};

export { fetchSearch };

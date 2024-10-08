import { Response } from "@/types";
import { Template } from "@/types/template";
import _http from "@/utils/http";

const fetchTemplates = async () => {
  const response = await _http.get<Response<Template[]>>(`/Templates`);
  if (response.status === 200) {
    return response.data.result;
  }

  throw new Error("Fetching Order Wrong!");
};

export { fetchTemplates };

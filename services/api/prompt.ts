import { Response } from "@/types";
import { Prompt } from "@/types/prompt";
import _http from "@/utils/http";

const fetchPrompts = async () => {
  const response = await _http.get<Response<Prompt[]>>("/Prompts");

  if (response.status === 200) {
    return response.data.result;
  }

  throw new Error("Fetching Prompt Wrong!");
};

export { fetchPrompts };

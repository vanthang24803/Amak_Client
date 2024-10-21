import { Response } from "@/types";
import { Blog } from "@/types/blog";
import _http from "@/utils/http";

export const fetchBlog = async (page: number = 1, limit: number = 20) => {
  const response = await _http.get<Response<Blog[]>>(`/Blogs`, {
    params: {
      Limit: limit,
      Page: page,
    },
  });

  if (response.status === 200) {
    return response.data.result;
  }

  throw new Error("Fetching Blogs Wrong!");
};

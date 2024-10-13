import { Pagination } from "@/types";
import { Cloudinary } from "@/types/cloudinary";
import _http from "@/utils/http";

const fetchCloudinaryPhotos = async (limit: number = 500) => {
  const response = await _http.get<Pagination<Cloudinary[]>>("/Cloudinary", {
    params: {
      Limit: limit,
    },
  });

  if (response.status === 200) {
    return response.data.result;
  }

  throw new Error("Fetching Cloudinary Wrong!");
};

export { fetchCloudinaryPhotos };

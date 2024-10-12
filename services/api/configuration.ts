import {
  CloudinaryConfig,
  GoogleConfig,
  MailConfig,
  MomoConfig,
} from "@/types/configuration";
import { Response } from "@/types";
import _http from "@/utils/http";

const fetchMailConfig = async () => {
  const response = await _http.get<Response<MailConfig>>("/Configuration/Mail");

  if (response.status === 200) {
    return response.data.result;
  }

  throw new Error("Fetching Mail Settings Wrong!");
};

const fetchGoogleConfig = async () => {
  const response = await _http.get<Response<GoogleConfig>>(
    "/Configuration/Google"
  );

  if (response.status === 200) {
    return response.data.result;
  }

  throw new Error("Fetching Google Settings Wrong!");
};

const fetchCloudinaryConfig = async () => {
  const response = await _http.get<Response<CloudinaryConfig>>(
    "/Configuration/Cloudinary"
  );

  if (response.status === 200) {
    return response.data.result;
  }

  throw new Error("Fetching Cloudinary Settings Wrong!");
};

const fetchMomoConfig = async () => {
  const response = await _http.get<Response<MomoConfig>>("/Configuration/Momo");

  if (response.status === 200) {
    return response.data.result;
  }

  throw new Error("Fetching Momo Settings Wrong!");
};

export {
  fetchMailConfig,
  fetchGoogleConfig,
  fetchCloudinaryConfig,
  fetchMomoConfig,
};

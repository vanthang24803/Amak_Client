import axios from "axios";
import Cookies from "js-cookie";
import { env } from "@/configs/env";
import { jwtDecode } from "jwt-decode";

import { fromUnixTime, compareAsc } from "date-fns";

async function refreshTokenRequest(refreshToken: string | undefined) {
  const response = await axios.post(
    `${env.NEXT_PUBLIC_API_URL}/Authentication/RefreshToken`,
    {
      token: refreshToken,
    }
  );
  if (response.status === 200) {
    Cookies.set("ac_token", response.data.result.accessToken);
    Cookies.set("rf_token", response.data.result.refreshToken);
    return `Bearer ${response.data.result.accessToken}`;
  } else {
    throw new Error("Failed to refresh token");
  }
}

const _http = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

_http.interceptors.request.use(async (req) => {
  let accessToken = Cookies.get("ac_token");

  if (accessToken) {
    const payload = jwtDecode(accessToken);
    if (payload.exp) {
      const isExpired = compareAsc(fromUnixTime(payload.exp), new Date()) < 1;

      if (isExpired) {
        const refreshToken = Cookies.get("rf_token");
        req.headers.Authorization = await refreshTokenRequest(refreshToken);
      } else {
        req.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
  }

  return req;
});

export default _http;

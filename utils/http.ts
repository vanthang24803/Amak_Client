import axios from "axios";
import Cookies from "js-cookie";
import { env } from "@/configs/env";

const token = Cookies.get("token");

const _http = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export default _http;

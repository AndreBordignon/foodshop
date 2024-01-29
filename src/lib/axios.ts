import axios from "axios";

import { env } from "@/env";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const access_token = localStorage.getItem("access_token");
  config.headers.Authorization = `Bearer ${access_token}`;

  return config;
});

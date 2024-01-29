import { api } from "@/lib/axios";

export interface SignInBody {
  username: string;
  password: string;
}
export type StatusResponse = {
  id: string;
  email: string;
  password: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
};
export async function signIn({ username, password }: SignInBody) {
  const res = await api.post("/auth/login", { username, password });
  localStorage.setItem("access_token", res.data.access_token);

  console.log(res);
  return res;
}

export async function checkStatus(): Promise<StatusResponse> {
  const res = await api.get("/auth/status");

  return res.data;
}

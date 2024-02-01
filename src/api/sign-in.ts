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

export type ConfirmEmailResponse = {
  data: any;
};
export async function signIn({ username, password }: SignInBody) {
  const res = await api.post("/auth/login", { username, password });

  return res;
}

export async function checkStatus(): Promise<StatusResponse> {
  const res = await api.get(`/auth/status`);

  return res.data;
}
export async function confirmEmail(access_token: string): Promise<any> {
  const res = await api.get(`/auth/confirm?token=${access_token}`);

  return res;
}

export async function signOut() {
  const res = await api.post("/auth/signout");

  return res;
}

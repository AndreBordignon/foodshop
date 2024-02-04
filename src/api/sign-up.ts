import { api } from "@/lib/axios";

export interface SignUpBody {
  name: string;
  managerName: string;
  managerEmail: string;
  companyPhone: string;
  isActive?: boolean;
  password: string;
  file?: any;
}
export type StatusResponse = {
  id: number;
  name: string;
  managerName: string;
  managerEmail: string;
  companyPhone: string;
  isActive: boolean;
  password: string;
};

export type ConfirmEmailResponse = {
  data: any;
};
export async function createCompany(company: any) {
  const res = await api.post("/stores", company);

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

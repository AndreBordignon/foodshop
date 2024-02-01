import { api } from "@/lib/axios";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  password: string;
  restaurants: any[];
}
export async function getUserInfo() {
  const res = await api.get<User>("/user");

  return res.data;
}

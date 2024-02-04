import { api } from "@/lib/axios";

export async function getSelectedStore(id: number) {
  const res = await api.get(`/stores/${id}`);

  return res.data;
}

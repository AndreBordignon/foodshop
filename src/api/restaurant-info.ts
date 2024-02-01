import { api } from "@/lib/axios";

export async function getSelectedRestaurant(id: number) {
  const res = await api.get(`/restaurants/${id}`);

  return res.data;
}

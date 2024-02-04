import { api } from "@/lib/axios";

export const getAllStoreProducts = async (storeId: any) => {
  const { data } = await api.get(`/products/store/${storeId}`);

  return data;
};

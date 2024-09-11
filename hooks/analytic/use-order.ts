import { Order } from "@/types";
import _http from "@/utils/http";
import { create } from "zustand";

interface Store {
  data: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => void;
}

export const useOrdersAnalytic = create<Store>((set) => ({
  data: [],
  loading: false,
  error: null,
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const response = await _http.get(`/Orders`);

      if (response.status === 200) {
        set({ data: response.data.result });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));

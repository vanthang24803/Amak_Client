import { Product } from "@/types";
import _http from "@/utils/http";
import { create } from "zustand";

interface Store {
  data: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => void;
}

export const useProductsAnalytic = create<Store>((set) => ({
  data: [],
  loading: false,
  error: null,
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await _http.get(`/Products`);

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

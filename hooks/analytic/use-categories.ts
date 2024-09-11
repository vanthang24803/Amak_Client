import { Category } from "@/types";
import _http from "@/utils/http";
import { create } from "zustand";

interface Store {
  data: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => void;
}

export const useCategoriesAnalytic = create<Store>((set) => ({
  data: [],
  loading: false,
  error: null,
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await _http.get(`/Categories`);

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

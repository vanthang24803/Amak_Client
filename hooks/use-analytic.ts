import { Analytic } from "@/types";
import _http from "@/utils/http";
import { create } from "zustand";

interface Store {
  analytic: Analytic | null;
  getAnalytic: () => Promise<void>;
}

export const useAnalytic = create<Store>((set) => ({
  analytic: null,
  getAnalytic: async () => {
    try {
      const response = await _http.get<{ result: Analytic }>("/Analytic/Count");

      if (response.status === 200) {
        set({ analytic: response.data.result });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

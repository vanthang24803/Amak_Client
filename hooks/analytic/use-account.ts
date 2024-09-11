import { UserAnalytic } from "@/types";
import _http from "@/utils/http";
import { create } from "zustand";

interface Store {
  data: UserAnalytic[];
  loading: boolean;
  error: string | null;
  fetchAccounts: () => void;
}

export const useAccountAnalytic = create<Store>((set) => ({
  data: [],
  loading: false,
  error: null,
  fetchAccounts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await _http.get(`/Analytic/Accounts`);

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

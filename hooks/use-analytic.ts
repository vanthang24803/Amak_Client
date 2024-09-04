import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import _http from "@/utils/http";
import { Analytic } from "@/types";

type Store = {
  analytic: Analytic | null;
  getAnalytic: () => Promise<void>;
};

const useAnalytic = create<Store>()(
  persist(
    (set) => ({
      analytic: null,
      getAnalytic: async () => {
        try {
          const response = await _http.get<{ result: Analytic }>(
            "/Analytic/Count"
          );

          if (response.status === 200) {
            set({ analytic: response.data.result });
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    {
      name: "analytic-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAnalytic;

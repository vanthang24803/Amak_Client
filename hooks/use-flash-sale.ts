import { FlashSaleProduct } from "@/types";
import { create } from "zustand";

interface Store {
  data: FlashSaleProduct[];
  totalItems: number;
  addProduct: (product: FlashSaleProduct) => void;
  removeProduct: (product: FlashSaleProduct) => void;
  clear: () => void;
}

export const useFlashSale = create<Store>((set, get) => ({
  data: [],
  totalItems: 0,

  addProduct: (product) => {
    set((state) => {
      const exists = state.data.some(
        (item) => item.id === product.id && item.optionId === product.optionId,
      );
      if (exists) {
        return state;
      }

      return {
        data: [...state.data, product],
        totalItems: state.totalItems + 1,
      };
    });
  },

  removeProduct: (product: FlashSaleProduct) => {
    set((state) => ({
      data: state.data.filter(
        (item) =>
          !(item.id === product.id && item.optionId === product.optionId),
      ),
      totalItems: state.totalItems > 0 ? state.totalItems - 1 : 0,
    }));
  },

  clear: () => {
    set({
      data: [],
      totalItems: 0,
    });
  },
}));

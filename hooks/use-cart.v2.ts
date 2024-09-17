import { Cart } from "@/types";
import _http from "@/utils/http";
import toast from "react-hot-toast";
import { create } from "zustand";

interface Store {
  data: Cart[];
  totalItems: number;
  totalPrice: number;
  getCarts: () => void;
  addToCart: (cart: Cart) => void;

  calculator: () => void;
  removeToCart: (cart: Cart) => void;
  removeOptionToCart: (cart: Cart) => void;
  clearCart: () => void;
}

export const useCartV2 = create<Store>((set, get) => ({
  data: [],
  totalItems: 0,
  totalPrice: 0,

  getCarts: async () => {
    try {
      const response = await _http.get(`/Cart`);

      if (response.status === 200) {
        set({ data: response.data.result });
      }
      get().calculator();
    } catch (error: any) {
      console.log(error);
    }
  },

  addToCart: async (cart: Cart) => {
    try {
      const response = await _http.post("/Cart/Add", cart);

      if (response.status === 200) {
        toast.success("Sản phẩm đã được thêm vào giỏ.");
        get().getCarts();
      }
    } catch (error) {
      console.log(error);
    }
  },

  removeToCart: async (cart: Cart) => {
    try {
      const response = await _http.post("/Cart/Remove", cart);

      if (response.status === 200) {
        get().getCarts();
      }
    } catch (error) {
      console.log(error);
    }
  },

  removeOptionToCart: async (cart: Cart) => {
    try {
      const response = await _http.post("/Cart/Remove/All", cart);

      if (response.status === 200) {
        toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
        get().getCarts();
      }
    } catch (error) {
      console.log(error);
    }
  },

  clearCart: async () => {
    try {
      await _http.delete("/Cart/Clear");
      get().getCarts();
    } catch (error) {
      console.log(error);
    }
  },

  calculator() {
    set({
      totalItems: get().data.reduce(
        (accumulator, item) => accumulator + item.quantity,
        0
      ),
      totalPrice: get().data.reduce(
        (accumulator, item) =>
          accumulator +
          item.quantity * item.price -
          item.quantity * item.price * (item.sale / 100),
        0
      ),
    });
  },
}));

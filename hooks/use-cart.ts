import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types/product';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  totalItems: () => number;
  totalPrice: () => number;
  addItem: (data: Product, quantity: number) => void;
  removeItem: (id: string, optionId: string) => void;
  updateItemQuantity: (id: string, optionId: string, quantity: number) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      totalPrice: () => {
        return get().items.reduce(
          (total, item) =>
            total +
            (item.product.options[0].price -
              (item.product.options[0].price * item.product.options[0].sale) /
                100) *
              item.quantity,
          0
        );
      },
      addItem: (data: Product, quantity: number = 1) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) =>
            item.product.id === data.id &&
            item.product.options[0].id === data.options[0].id
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          set({ items: [...get().items, { product: data, quantity }] });
        }

        toast.success('Sản phẩm đã được thêm vào giỏ.');
      },
      removeItem: (id: string, optionId: string) => {
        set({
          items: [
            ...get().items.filter(
              (item) =>
                !(
                  item.product.id === id &&
                  item.product.options[0].id === optionId
                )
            ),
          ],
        });
        toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
      },
      updateItemQuantity: (id: string, optionId: string, quantity: number) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) =>
            item.product.id === id && item.product.options[0].id === optionId
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity = quantity;
          set({ items: updatedItems });
        } else {
          toast.error('Sản phẩm không tồn tại.');
        }
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;

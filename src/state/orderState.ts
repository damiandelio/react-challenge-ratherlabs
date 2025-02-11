import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from '../common/types';

interface OrderState {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrder: (order: Order) => void;
  deleteOrder: (id: string) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],

      addOrder: (order) => {
        const newOrder: Order = { ...order, id: crypto.randomUUID() };
        set((state) => ({ orders: [...state.orders, newOrder] }));
      },

      updateOrder: (updatedOrder) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order,
          ),
        }));
      },

      deleteOrder: (id) => {
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== id),
        }));
      },
    }),
    {
      name: 'orders-storage', // localStorage key name
    },
  ),
);

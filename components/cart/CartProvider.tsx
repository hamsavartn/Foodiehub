"use client";

import * as React from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type CartState = {
  restaurantId: string | null;
  restaurantName: string | null;
  items: CartItem[];
};

type CartContextValue = CartState & {
  addCombo: (restaurant: { id: string; name: string }) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  total: number;
};

const CartContext = React.createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider />");
  return ctx;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<CartState>({
    restaurantId: null,
    restaurantName: null,
    items: [],
  });

  const count = React.useMemo(
    () => state.items.reduce((s, i) => s + i.qty, 0),
    [state.items]
  );

  const total = React.useMemo(
    () => state.items.reduce((s, i) => s + i.qty * i.price, 0),
    [state.items]
  );

  function clear() {
    setState({ restaurantId: null, restaurantName: null, items: [] });
  }

  function addCombo(restaurant: { id: string; name: string }) {
    // MVP rule: cart can contain items from only ONE restaurant
    setState((prev) => {
      const differentRestaurant =
        prev.restaurantId && prev.restaurantId !== restaurant.id;

      const nextBase: CartState = differentRestaurant
        ? { restaurantId: restaurant.id, restaurantName: restaurant.name, items: [] }
        : {
            restaurantId: prev.restaurantId ?? restaurant.id,
            restaurantName: prev.restaurantName ?? restaurant.name,
            items: prev.items,
          };

      const comboId = "signature-combo";
      const comboName = `${restaurant.name} Signature Combo`;
      const comboPrice = 9.99;

      const existing = nextBase.items.find((x) => x.id === comboId);
      const items = existing
        ? nextBase.items.map((x) =>
            x.id === comboId ? { ...x, qty: x.qty + 1 } : x
          )
        : [...nextBase.items, { id: comboId, name: comboName, price: comboPrice, qty: 1 }];

      return { ...nextBase, items };
    });
  }

  function inc(id: string) {
    setState((prev) => ({
      ...prev,
      items: prev.items.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)),
    }));
  }

  function dec(id: string) {
    setState((prev) => ({
      ...prev,
      items: prev.items
        .map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x)),
    }));
  }

  function remove(id: string) {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((x) => x.id !== id),
    }));
  }

  const value: CartContextValue = {
    ...state,
    addCombo,
    inc,
    dec,
    remove,
    clear,
    count,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
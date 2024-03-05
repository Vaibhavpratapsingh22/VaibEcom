"use client";
import { createContext, use, useEffect, useState } from "react";

export const CartContext = createContext<any>({});

export function CartProvider({ children }: any) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cart, setCart] = useState<any>([]);

useEffect(() => {
    if (cart) {
        ls?.setItem("cart", JSON.stringify(cart));
    }
}, [cart]);

useEffect(() => {
    if (ls && ls?.getItem("cart")) {
        setCart(JSON.parse(ls?.getItem("cart")!));
    }
}, []);

function addToCart(id: string) {
    setCart((prev: any) => [...prev, id]);
}
  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

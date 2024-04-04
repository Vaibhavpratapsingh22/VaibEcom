"use client";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext<any>({});

export function CartProvider({ children }: any) {
  const [cart, setCart] = useState<any>([]);

  useEffect(() => {
    const ls = window.localStorage;
    if (ls && ls.getItem("cart")) {
      setCart(JSON.parse(ls.getItem("cart")!));
    }
  }, []); // Run once on component mount to initialize cart from localStorage

  useEffect(() => {
    const ls = window.localStorage;
    if (ls && cart.length > 0) {
      ls.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]); // Update localStorage whenever cart changes

  function addToCart(id: any) {
    setCart((prev: any) => [...prev, id]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

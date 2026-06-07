import { createContext, useEffect, useState } from "react";
import type { Product } from "../types/product";

type CartContextType = {
  cart: cartitem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  incraseQty: (id: number) => void;
  decraseQty: (id: number) => void;
};

export type cartitem = Product & { quantity: number };

export const Cartcontext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  function incraseQty(id: number) {
    setCart(
      cart.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  }
  function decraseQty(id: number) {
    setCart(
      cart
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((e) => e.quantity > 0),
    );
  }
  const [cart, setCart] = useState<cartitem[]>(() => {
    const seved = localStorage.getItem("cart");
    return seved ? JSON.parse(seved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  function addToCart(product: Product) {
    const existingitem = cart.find((item) => item.id === product.id);
    console.log(existingitem);
    if (existingitem) {
      setCart(
        cart.map((e) =>
          e.id === product.id ? { ...e, quantity: e.quantity + 1 } : e,
        ),
      );
      showToast("Increased quantity 🛒");
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }
  function removeFromCart(id: number) {
    setCart(cart.filter((e) => e.id !== id));
  }

  const [toast, setToast] = useState<string | null>(null);
  function showToast(message: string) {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 2000);
  }
  return (
    <Cartcontext.Provider
      value={{ cart, addToCart, removeFromCart, incraseQty, decraseQty }}
    >
      {toast && (
        <div className="fixed top-5 right-[50%] translate-x-[50%]  bg-violet-500 text-white px-4 py-3 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
      {children}
    </Cartcontext.Provider>
  );
}

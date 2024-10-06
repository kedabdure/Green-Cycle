"use client";
import { useState, createContext, useEffect } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  // Load cart items from localStorage on initial render
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  // Update localStorage whenever cartProducts changes
  useEffect(() => {
    if (ls) {
      if (cartProducts?.length > 0) {
        ls.setItem("cart", JSON.stringify(cartProducts));
      } else {
        ls.removeItem("cart");
      }
    }
  }, [cartProducts, ls]);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((_, index) => index !== pos);
      }
      return prev;
    });
  }

  function clearCart() {
    setCartProducts([]);
    ls?.removeItem("cart");
  }

  function removeAllInstance(id) {
    setCartProducts((prev) => prev.filter((productId) => productId !== id));
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
        removeAllInstance,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

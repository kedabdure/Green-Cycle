import { useState, createContext, useEffect } from 'react';

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const ls = typeof window !== 'undefined' ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts])

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  },[])

  function addProductToCart(productID) {
    setCartProducts((pre) => {
      return [...pre, productID]
    })
  }
  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProductToCart }}>
      {children}
    </CartContext.Provider>
  )
}

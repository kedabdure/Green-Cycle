import { useState, createContext } from 'react';

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts }}>
      {children}
    </CartContext.Provider>
  )
}

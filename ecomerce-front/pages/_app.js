import CartContextProvider from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";
import "../styles/globals.css";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif; /* The font family is now available globally */
  }

  .PhoneInput {
	display: flex;
	align-items: center;
    width: 100%;
    heigh: 40px;
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}

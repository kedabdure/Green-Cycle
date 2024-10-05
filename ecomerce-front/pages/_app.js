import CartContextProvider from "../components/CartContext";
import { SessionProvider } from "next-auth/react";
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
    height: 40px;
`;

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}

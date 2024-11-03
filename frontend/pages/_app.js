"use client";

import { useState, useEffect } from "react";
import Router from "next/router";
import { createGlobalStyle } from "styled-components";
import "../styles/globals.css";
import CartContextProvider from "../components/cart/CartContext";
import { SessionProvider, useSession } from "next-auth/react";
import PageLoader from "../components/PageLoader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OrderStatusNotification from "@/components/order/OrderStatusNotification";
import useUser from "@/components/context/userContext";

const queryClient = new QueryClient();

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #f1f1f1;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }

  .PhoneInput {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
  }
`;

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      {loading && <PageLoader />}
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <CartContextProvider>
            <UserWrapper>
              <Component {...pageProps} />
            </UserWrapper>
          </CartContextProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

// Wrapper that ensures useUser is used within the SessionProvider context
function UserWrapper({ children }) {
  const user = useUser();
  return (
    <>
      {children}
      {user && <OrderStatusNotification />}
    </>
  );
}

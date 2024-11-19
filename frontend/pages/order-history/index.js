import Head from "next/head";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";
import OrderHistory from "../../components/order/OrderHistory";

const OrderHistoryPage = () => {
  return (
    <div>
      <Head>
        <title>Order History</title>
      </Head>
      <Header />
      <OrderHistory />
      <Footer />
    </div>
  );
}

export default OrderHistoryPage;
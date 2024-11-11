import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from '../components/home/Hero'
import Awareness from "../components/home/Awareness";
import ProductSlide from "../components/home/ProductSlide";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home - Green Cycle</title>
      </Head>
      <Header />
      <Hero />
      <Awareness />
      <ProductSlide />
      <Footer />
    </div>
  );
}

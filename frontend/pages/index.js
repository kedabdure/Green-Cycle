import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from '../components/home/Hero'
import Featured from "../components/home/Featured";
import ProductSlide from "../components/home/ProductSlide";


export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Featured />
      <ProductSlide />
      <Footer />
    </div>
  );
}

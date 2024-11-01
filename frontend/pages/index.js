import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from '../components/home/Hero'
import Awareness from "../components/home/Awareness";
import ProductSlide from "../components/home/ProductSlide";


export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Awareness />
      <ProductSlide />
      <Footer />
    </div>
  );
}

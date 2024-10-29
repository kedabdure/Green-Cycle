import Header from "../components/Header";
import { mongooseConnect } from "../lib/mongoose";
import { Product } from "../models/Product";
import Footer from "../components/Footer";
import Hero from '../components/home/Hero'
import Featured from "../components/home/Featured";
import ProductSlide from "../components/home/ProductSlide";


export default function Home({ featuredProduct, newProducts }) {
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

export async function getServerSideProps() {
  const featuredProductId = "66ef40e5b00953c074930388"
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { updatedAt: -1 } }).limit(10);
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts))
    },
  }
}

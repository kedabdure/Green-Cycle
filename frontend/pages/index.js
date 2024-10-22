import Featured from "../components/Featured";
import Header from "../components/Header";
import NewProducts from "../components/NewProducts";
import { mongooseConnect } from "../lib/mongoose";
import { Product } from "../models/Product";
import Footer from "../components/Footer";


export default function Home({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts newProducts={newProducts} />
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

import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";


export default function Home({ product }) {
  return (
    <div>
      <Header />
      <Featured product={product} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "66ef40e5b00953c074930388"
  await mongooseConnect()
  const product = await Product.findById(featuredProductId)
   return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  }
}

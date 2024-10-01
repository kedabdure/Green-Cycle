import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
`;

export default function Products({ products }) {
  return (
    <>
      <Header />
      <Center>
        <Title>Products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  )
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}
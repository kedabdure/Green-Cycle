import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import styled from "styled-components";
import Title from "@/components/Title";
import Footer from "@/components/Footer"

export default function Products({ products }) {
  return (
    <>
      <Header />
      <Center>
        <Title>All Products</Title>
        <ProductsGrid products={products} />
      </Center>
      <Footer />
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
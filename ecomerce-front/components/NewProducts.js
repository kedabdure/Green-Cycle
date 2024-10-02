import styled from "styled-components"
import Center from "@/components/Center";
import ProductBox from "@/components/ProductBox";
import Title from "@/components/Title";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 50px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function NewProducts({ newProducts }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid>
        {newProducts.map((product) => (
          <ProductBox key={product._id} {...product} />
        ))}
      </ProductsGrid>
    </Center>
  )
}
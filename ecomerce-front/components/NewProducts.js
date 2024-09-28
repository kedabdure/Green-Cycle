import styled from "styled-components"
import Center from "@/components/Center";
import ProductBox from "@/components/ProductBox";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 30px;
  padding-top: 30px;
`;

export default function NewProducts({ newProducts }) {
  return (
    <Center>
      <ProductsGrid>
        {newProducts.map((product) => (
          <ProductBox {...product} />
        ))}
      </ProductsGrid>
    </Center>
  )
}
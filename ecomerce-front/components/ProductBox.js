import styled from "styled-components";
import Link from "next/link";
import CartIcon from "@/components/icons/CartIcon";
import Button from "@/components/Button";

const ProductWrapper = styled.div`

`;

const WhiteBox = styled.div`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled.h2`
  font-weight: normal;
  font-size: .9rem;
  margin: 0;
`;

const ProductInfo = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const PriceRow = styled.div`
  margin-top: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Price = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
`;


export default function ProductBox({ _id, title, description, price, images }) {
  return (
    <ProductWrapper>
      <WhiteBox>
        <div>
          <img src={images[0]} alt={title} />
        </div>
      </WhiteBox>
      <ProductInfo>
        <Title>{title}</Title>
        <PriceRow>
          <Price>{price}birr</Price>
          <Button primary outline>Add to cart</Button>
        </PriceRow>
      </ProductInfo>
    </ProductWrapper>
  );
}
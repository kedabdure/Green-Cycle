import styled from "styled-components";
import Link from "next/link";
import CartIcon from "@/components/icons/CartIcon";
import Button from "@/components/Button";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import Currency from "@/components/Currency";

const ProductWrapper = styled.div`

`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 110px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: .9rem;
  text-decoration: none;
  color: inherit;
  margin: 0;
`;

const ProductInfo = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;

const PriceRow = styled.div`
  margin-top: 2px;
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
  }
  align-items: center;
  justify-content: space-between;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 500;
  text-align: right;
  display: flex;
  align-items: center;
  gap: 2px;
  @media screen and (min-width: 768px) {
    text-align: left;
    font-size: 1.1rem;
    font-weight: bold;
  }
`;


export default function ProductBox({ _id, title, price, images }) {
  const url = '/product/' + _id;
  const { addProduct } = useContext(CartContext);

  const formatPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images[0]} alt={title} />
        </div>
      </WhiteBox>
      <ProductInfo>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
            {formatPrice(price)}
            <Currency>ETB</Currency>
          </Price>
          <Button $primary $outline onClick={() => { addProduct(_id) }}>Add to cart</Button>
        </PriceRow>
      </ProductInfo>
    </ProductWrapper>
  );
}

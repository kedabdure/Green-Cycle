import React from "react";
import styled from "styled-components";
import Link from "next/link";
import CartIcon from "./icons/CartIcon";
import Currency from "./Currency";
import FlyingBtn from "./FlyingButton";

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
    transition: all ease 0.2s;
    max-width: 100%;
    max-height: 110px;

    &:hover{
      transform: scale(1.1) rotate(5deg);
    }
  }

`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: .9rem;
  text-decoration: none;
  color: inherit;
  margin: 0;
  transition: text-decoration 0.5s;

  &:hover {
    text-decoration: underline;
  }
`;

const PropertiesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Property = styled.div`
  font-size: .8rem;
  color: #666;
  background-color: #f5f5f5;
  padding: 2px 5px;
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


export default function ProductBox({ _id, title, price, images, properties, category }) {
  const url = '/product/' + _id;

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
        <PropertiesWrapper>
          {
            <React.Fragment>
              {properties.RAM && <Property>RAM: {properties.RAM}GB</Property>}
              {properties.storage && <Property>storage: {properties.storage}GB</Property>}
              {properties.SIM && <Property>{properties.SIM} SIM</Property>}
              {properties.Core && <Property>Core {properties.Core}</Property>}
              {properties.Gen && <Property>{properties.Gen} Gen</Property>}
            </React.Fragment>
          }
        </PropertiesWrapper>
        <PriceRow>
          <Price>
            {formatPrice(price)}
            <Currency>ETB</Currency>
          </Price>
          <FlyingBtn
            url={images[0]}
            productID={_id}
            $white
            $primary
            $outline
          >
            <CartIcon />
            Add to cart
          </FlyingBtn>
        </PriceRow>
      </ProductInfo>
    </ProductWrapper>
  );
}

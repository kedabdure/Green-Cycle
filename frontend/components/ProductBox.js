import React from "react";
import styled from "styled-components";
import Link from "next/link";
import CartIcon from "./icons/CartIcon";
import Currency from "./Currency";
import FlyingBtn from "./FlyingButton";
import { primary } from "../lib/colors";
import CustomFlyingButton from "./FlyingButton";

const ProductWrapper = styled.div`
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 150px;
  overflow: hidden;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  img{
    transition: all ease 0.2s;
    max-width: 100%;
    max-height: 110px;

    &:hover{
      transform: scale(1.2);
    }
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${primary};
  color: white;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 1;
`;

const Image = styled.img`
  width: 100%;
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

  @media screen and (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const PropertiesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Property = styled.div`
  font-size: .7rem;
  color: #666;
  background-color: #f9f9f9;
  padding: 1px 5px;
  border-radius: 10px;

  @media screen and (min-width: 768px) {
    padding: 2px 7px;
    font-size: .8rem;
  }
`;

const ProductInfo = styled.div`
  margin-top: 7px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
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
  font-size: .9rem;
  font-weight: 500;
  text-align: right;
  display: flex;
  align-items: center;
  gap: 2px;
  
  @media screen and (min-width: 768px) {
    text-align: left;
    font-size: 1rem;
    font-weight: bold;
  }
`;


export default function ProductBox({ _id, title, price, images, properties, category, badge }) {
  const url = '/product/' + _id;

  const formatPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        {badge && <Badge>New</Badge>}
        <div>
          <Image src={images[0]} alt={title} />
        </div>
      </WhiteBox>
      <ProductInfo>
        <Title href={url}>{title}</Title>
        <PropertiesWrapper>
          {
            <React.Fragment>
              {properties.RAM && <Property>{properties.RAM} RAM</Property>}
              {properties.Storage && <Property>{properties.Storage} Storage</Property>}
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
          <CustomFlyingButton
            outline
            url={images[0]}
            productID={_id}
          >

            <CartIcon />
            Buy
          </CustomFlyingButton>
        </PriceRow>
      </ProductInfo>
    </ProductWrapper>
  );
}

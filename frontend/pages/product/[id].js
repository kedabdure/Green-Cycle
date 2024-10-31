import Header from "../../components/Header";
import { mongooseConnect } from "../../lib/mongoose";
import { Product } from "../../models/Product";
import styled from "styled-components";
import WhiteBox from "../../components/WhiteBox";
import ProductDetail from "../../components/product/ProductDetail";
import Button from "../../components/Button";
import CartIcon from "../../components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "../../components/cart/CartContext";
import Currency from "../../components/Currency";


const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 100px 0;
  gap: 5px;
  @media screen and (min-width: 768px) {
    gap: 40px;
    grid-template-columns: .8fr 1.2fr;
  }
`;

const PriceRow = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 1.4rem;
  font-weight: 600;
`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);

  const formatPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <>
      <Header />
      <ColWrapper>
        <WhiteBox>
          <ProductDetail images={product.images} />
        </WhiteBox>
        <div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <PriceRow>
            <div>
              <Price>
                {formatPrice(product.price)}
                <Currency>ETB</Currency>
              </Price>
            </div>
            <div>
              <Button $black onClick={() => addProduct(product._id)}>
                <CartIcon />Add to cart
              </Button>
            </div>
          </PriceRow>
        </div>
      </ColWrapper>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }
  }
}
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import styled from "styled-components";
import Center from "../components/Center";
import Button from "../components/Button";
import axios from 'axios';
import Table from "../components/Table";
import OrderForm from "../components/OrderForm";
import Currency from "../components/Currency";
import Trash from "../components/icons/Trash";
import Footer from "../components/Footer";
import EmptyCartPage from "../components/EmptyCartPage";

const ColumnWrapper = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr .7fr;
    gap: 30px;
  }
  margin-top: 100px;
  margin-bottom: 30px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px 15px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  @media screen and (min-width: 768px) {
    padding: 40px 25px;
  }
`;

const ProductInfoCell = styled.td`
  padding: 15px 10px;
  font-size: 14px;
  position: relative;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 80px;
    max-height: 80px;
  }
`;

const QuantityLabel = styled.span`
  font-size: 14px;
  padding: 0 10px;
`;

const MainTitle = styled.h2`
  font-weight: 700;
  font-size: 1.7rem;
  margin-bottom: 1.2rem;
`;

const PriceSummary = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.1rem;
  font-weight: 600;
  gap: 2px;
`;

const PriceCell = styled.div`
  text-align: left;
  gap: 2px;
`;

const TrashIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  cursor: pointer;
  svg {
    width: 24px;
    height: 24px;
    fill: #ddd;
    transition: fill 0.2s ease;
  }

  &:hover svg {
    fill: #d11a2a;
  }
`;

// Styled Divider Row
const DividerRow = styled.tr`
  td {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0;
  }
`;

export default function Cart() {
  const { cartProducts, addProduct, removeProduct, removeAllInstance } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts })
        .then(response => {
          setProducts(response.data);
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  function removeAllInstanceOfProduct(id) {
    removeAllInstance(id);
  }

  async function goToPayment(data) {
    const orderData = { ...data, cartProducts };
    try {
      const res = await axios.post('/api/checkout', orderData);
      if (res.data && res.data.payment_url) {
        window.location.href = res.data.payment_url;
      } else {
        console.error("No payment URL returned");
      }
    } catch (error) {
      console.error("Payment Initialization Failed:", error.message);
    }
  }

  let total = 0;
  for (const productID of cartProducts) {
    const price = products.find(product => product._id === productID)?.price;
    total += price;
  }

  const formatPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <Header />
      <Center>
        {!cartProducts?.length && (
          <>
            <MainTitle>Cart</MainTitle>
            <EmptyCartPage />
          </>
        )}
        {cartProducts?.length > 0 && (
          <ColumnWrapper>
            <Box>
              <MainTitle>Cart</MainTitle>
              {products?.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                    <DividerRow>
                      <td colSpan="4"></td>
                    </DividerRow>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <>
                        <tr key={product._id}>
                          <ProductInfoCell>
                            <ProductImageBox>
                              <img src={product.images[0]} alt="" />
                            </ProductImageBox>
                            {product.title}
                          </ProductInfoCell>
                          <td>
                            <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                            <QuantityLabel>
                              {cartProducts.filter(id => id === product._id).length}
                            </QuantityLabel>
                            <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                          </td>
                          <td>
                            <PriceCell>
                              {formatPrice(cartProducts.filter(id => id === product._id).length * product.price)} <Currency>ETB</Currency>
                            </PriceCell>
                          </td>
                          <TrashIconWrapper onClick={() => removeAllInstanceOfProduct(product._id)}>
                            <Trash />
                          </TrashIconWrapper>
                        </tr>
                        {index < products.length - 1 && <DividerRow><td colSpan="4"></td></DividerRow>}
                      </>
                    ))}
                  </tbody>
                  <tfoot>
                    <DividerRow><td colSpan="4"></td></DividerRow>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <PriceSummary>
                          {formatPrice(total)}<Currency>ETB</Currency>
                        </PriceSummary>
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              )}
            </Box>
            {!!cartProducts?.length && (
              <Box>
                <MainTitle>Order Information</MainTitle>
                <OrderForm handleSubmit={goToPayment} />
              </Box>
            )}
          </ColumnWrapper>
        )}
      </Center>
      <Footer />
    </>
  );
}

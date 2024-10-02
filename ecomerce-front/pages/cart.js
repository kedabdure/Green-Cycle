import Header from "@/components/Header";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import axios from 'axios'
import Table from "@/components/Table";
import AddressForm from "@/components/OrderForm";
import Currency from "@/components/Currency";

const ColumnWrapper = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr .7fr;
    gap: 30px;
  }
  margin-top: 40px;
  margin-bottom: 30px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px 15px;
  @media screen and (min-width: 768px) {
    padding: 40px;
  }
`;

const ProductInfoCell = styled.td`
  padding-bottom: 10px;
  font-size: 14px;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  max-width: 120px;
  max-height: 120px;
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

@media screen and (min-width: 768px) {
    width: 120px;
    height: 120px;
    max-width: 150px;
    max-height: 150px;

    img {
      max-width: 100px;
      max-height: 100px;
    }
  }
`;

const QuantityLabel = styled.span`
  font-size: 14px;
  padding: 0 5px;
`;

const MainTitle = styled.h2`
  font-weight: 700;
  font-size: 1.7rem;
  margin-bottom: 1.2rem;
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


export default function Cart() {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts })
        .then(response => {
          setProducts(response.data);
        })
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

  // PAYMENT
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
        <ColumnWrapper>
          <Box>
            <MainTitle>Cart</MainTitle>
            {!cartProducts?.length && (
              <div>Your cart is empty</div>
            )}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button
                          onClick={() => lessOfThisProduct(product._id)}>-</Button>
                        <QuantityLabel>
                          {cartProducts.filter(id => id === product._id).length}
                        </QuantityLabel>
                        <Button
                          onClick={() => moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <td>
                        <>
                          {formatPrice(cartProducts.filter(id => id === product._id).length * product.price)} <Currency>ETB</Currency>
                        </>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <Price>
                        {formatPrice(total)}
                        <Currency>ETB</Currency>
                      </Price>
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <MainTitle>Order Information</MainTitle>
              <AddressForm handleSubmit={goToPayment} />
            </Box>
          )}
        </ColumnWrapper>
      </Center>
    </>
  );
}
import Header from "@/components/Header";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import axios from 'axios'
import Table from "@/components/Table";
import AddressForm from "@/components/OrderForm";

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr .7fr;
  gap: 20px;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
`;

const ProductInfoCell = styled.td`
  padding-bottom: 10px;
  font-size: 14px;
`;

const ProductImageBox = styled.div`
  width: 120px;
  height: 120px;
  max-width: 150px;
  max-height: 150px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100px;
    max-height: 100px;
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

export default function Cart() {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [products, setProducts] = useState([])
  const [orderData, setOrderData] = useState({});
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

  async function goToPayment(data) {
    const orderData = { ...data, cartProducts };

    await axios.post('/api/checkout', orderData);
  }

  let total = 0;
  for (const productID of cartProducts) {
    const price = products.find(product => product._id === productID)?.price;
    total += price;
  }

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
                        {cartProducts.filter(id => id === product._id).length * product.price} ETB
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>{total} ETB</td>
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
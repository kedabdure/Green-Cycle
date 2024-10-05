import { useContext } from "react";
import Button from "./Button";
import Center from "./Center";
import styled from "styled-components";
import CartIcon from "./icons/CartIcon";
import ButtonLink from "./ButtonLink";
import { CartContext } from "./CartContext";


const Bg = styled.div`
  background-color: #222;
  color: white;
  padding: 60px 0;
  margin-top: 60px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 10px 0;
  font-weight: normal;

  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
`

const Desc = styled.p`
  color: #aaa;
  font-size: .9rem;
  line-height: 1.5;
`;

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  padding-bottom: 30px;

  img {
    margin-top: 20px;
    max-width: 100%;
    height: 250px;
  }

  div:nth-child(1) {
    order: 2;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: .9fr 1.1fr;
    padding-bottom: 0;
    gap: 50px;

    div:nth-child(1) {
      order: 0;
    }

    img {
      margin-top: 0;
      max-width: 100%;
      height: 350px;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  return (
    <Bg>
      <Center>
        <ColumnWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonWrapper>
                <ButtonLink $white $outline href={"/product/" + product._id}>Read more</ButtonLink>
                <Button black outline onClick={() => addProduct(product._id)}>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonWrapper>
            </div>
          </Column>
          <Column>
            <div>
              <img src={product.images[0]} alt="Pro anywhere" />
            </div>
          </Column>
        </ColumnWrapper>
      </Center>
    </Bg>
  )
}

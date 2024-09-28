import Button from "./Button";
import Center from "./Center";
import styled from "styled-components";
import CartIcon from "./icons/CartIcon";
import ButtonLink from "./ButtonLink";

const Bg = styled.div`
  background-color: #222;
  color: white;
  padding: 20px 0
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  font-weight: normal;
`

const Desc = styled.p`
  color: #aaa;
  font-size: .9rem;
  line-height: 1.5;
`;

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  img {
    max-width: 100%;
    height: 350px;
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

export default function Featured({product}) {
  return (
    <Bg>
      <Center>
        <ColumnWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonWrapper>
                <ButtonLink white outline href={"/products/" + product._id}>Read more</ButtonLink>
                <Button white>
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
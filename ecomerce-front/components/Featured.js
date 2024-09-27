import Button from "./Button";
import Center from "./Center";
import styled from "styled-components";
import CartIcon from "./icons/CartIcon";

const Bg = styled.div`
  background-color: #222;
  color: white;
  padding: 50px 0
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
`

const Desc = styled.p`
  color: #aaa;
  font-size: .8rem;
`;

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  img {
    max-width: 100%;
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
`;

export default function Featured() {
  return (
    <Bg>
      <Center>
        <ColumnWrapper>
          <Column>
            <div>
              <Title>Pro anywhere</Title>
              <Desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Desc>
              <ButtonWrapper>
                <Button white outline>Read more</Button>
                <Button primary>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonWrapper>
            </div>
          </Column>
          <Column>
            <div>
              <img src="https://i.imgur.com/tKN29Pn.png" alt="Pro anywhere" />
            </div>
          </Column>
        </ColumnWrapper>
      </Center>
    </Bg>
  )
}
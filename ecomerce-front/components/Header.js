import { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { CartContext } from "./CartContext";
import CartIcon from "./icons/CartIcon";
import LogoWhite from "./icons/LogoWhite";

const StyledHeader = styled.header`
  background-color: #222;
  color: white;
  padding: 10px;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`
const Logo = styled(Link)`
  text-decoration: none;
  width: 60px;
  height: auto;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #aaa;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
`;

const Cart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const Icon = styled.div`
  width: 25px;
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href="/" passHref>
            <LogoWhite width="120" />
          </Logo>
          <StyledNav>
            <StyledLink href="/" passHref>
              Home
            </StyledLink>
            <StyledLink href="/products" passHref>
              Products
            </StyledLink>
            <StyledLink href="/categories" passHref>
              Categories
            </StyledLink>
            <StyledLink href="/account" passHref>
              Account
            </StyledLink>
            <StyledLink href="/cart" passHref>
              <Cart>
                <Icon>
                  <CartIcon />
                </Icon>
                ({cartProducts.length})
              </Cart>
            </StyledLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}

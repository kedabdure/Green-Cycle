import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";

const StyledHeader = styled.header`
  background-color: #222;
  color: white;
  padding: 10px;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`
const StyledLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href="/" passHref>
            EcoShop
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
              Cart (0)
            </StyledLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}

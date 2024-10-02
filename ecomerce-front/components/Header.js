import LogoWhite from "./icons/LogoWhite";
import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import CartIcon from "@/components/icons/CartIcon";
import Close from "./icons/Close";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  text-decoration: none;
  width: 60px;
  height: auto;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  transition: height 0.4s ease-in-out, opacity 0.4s ease-in-out;
  height: ${props => (props.$mobileNavActive ? "100vh" : "0")};
  opacity: ${props => (props.$mobileNavActive ? "1" : "0")};
  font-size: ${props => (props.$mobileNavActive ? "1.2rem" : "")};
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${props => (props.$mobileNavActive ? "100px 20px 20px 25px" : "0 20px")};
  background-color: #222;
  z-index: 2;

  @media screen and (min-width: 768px) {
    display: flex;
    gap: 15px;
    position: static;
    height: auto;
    opacity: 1;
    padding: 0;
    transition: none;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }

  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const NavButton = styled.button`
  position: absolute;
  top: 2px;
  right: 0px;
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const CartIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1px;
`;

const Cart = styled.div`
  width: 26px;
  height: 26px;
  position: relative;
  z-index: 100;
  cursor: pointer;
`;

const CartBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  background-color: #f50057;
  color: white;
  border-radius: 50%;
  z-index: 100;

  @media screen and (min-width: 768px) {
    font-size: 0.75rem;
    width: 19px;
    height: 19px;
    top: -8px;
    right: -8px;
  };
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  useEffect(() => {
    if (mobileNavActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileNavActive]);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href="/" passHref>
            <LogoWhite width="120" />
          </Logo>

          <StyledNav $mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
          </StyledNav>

          <ButtonWrapper>
            <NavLink href={"/cart"}>
              <CartIconWrapper>
                <Cart>
                  <CartIcon />
                  <CartBadge>{cartProducts.length}</CartBadge>
                </Cart>
              </CartIconWrapper>
            </NavLink>
            <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
              {!mobileNavActive ? <BarsIcon /> : <Close />}
            </NavButton>
          </ButtonWrapper>

        </Wrapper>
      </Center>
    </StyledHeader>
  );
}

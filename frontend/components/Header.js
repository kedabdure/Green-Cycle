"use client";

import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "./cart/CartContext";
import BarsIcon from "./icons/Bars";
import Close from "./icons/Close";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ShoppingCart } from "phosphor-react";
import MainLogo from "./icons/Logo";


const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`;

const StyledHeader = styled.header`
  width: 100%;
  height: auto;
  background-color: ${({ $scrollPosition }) => ($scrollPosition > 0 ? "#fff" : "transparent")};
  color: #111;
  position: fixed;
  top: 0;
  z-index: 1000;
  animation: ${({ $isVisible }) => ($isVisible ? slideDown : slideUp)} 0.5s ease forwards;
  transform: ${({ $isVisible }) => ($isVisible ? "translateY(0)" : "translateY(-100%)")};

  transition: background-color 0.5s ease-in-out;
`;

const Logo = styled(Link)`
  text-decoration: none;
  width: 120px;
  height: auto;
  z-index: 3;
  display: none;

  @media screen and (min-width: 850px) {
    display: block;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;

  @media screen and (min-width: 768px) {
    padding: 18px 80px;
  }
`;

const StyledNav = styled.nav`
  transition: height 0.4s ease-in-out, opacity 0.4s ease-in-out;
  height: ${props => (props.$mobileNavActive ? "100vh" : "0")};
  opacity: ${props => (props.$mobileNavActive ? "1" : "0")};
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => (props.$mobileNavActive ? "40px 20px 20px 25px" : "0 10px")};
  background-color: #fff;
  font-size: .95rem;

  @media screen and (min-width: 850px) {
    display: flex;
    flex-direction: row;
    gap: 20px;
    position: static;
    height: auto;
    opacity: 1;
    padding: 0;
    transition: none;
    background-color: transparent;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: #333;
  font-weight: 500;
  text-decoration: none;
  padding: 10px 0;
  transition: color 0.3s ease;

  &:hover {
    color: darkgreen;
  }

  @media screen and (min-width: 850px) {
    padding: 0;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  width: 100%;

  @media (min-width: 850px) {
    gap: 30px;
    width: auto;
  }
`;

const DesktopButtons = styled.div`
  display: none;
  
  @media screen and (min-width: 850px) {
    display: flex;
    gap: 15px;
  }
`;

const MobileButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;

  @media screen and (min-width: 850px) {
    display: none;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: #111;
  cursor: pointer;
  position: relative;
  z-index: 3;

  @media screen and (min-width: 850px) {
    display: none;
  }
`;

const CartIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1px;
  z-index: 1000;
  position: relative;
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
  color: #fff;
  border-radius: 50%;
  z-index: 100;

  @media screen and (min-width: 850px) {
    font-size: 0.75rem;
    width: 19px;
    height: 19px;
    top: -8px;
    right: -8px;
  }
`;

const Button = styled.div`
  width: 100%;
  max-width: 100px;
  padding: 6px 15px;
  text-align: center;
  border-radius: 30px;
  font-size: 0.9rem;
  background-color: #111;
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const OutlinedButton = styled.div`
  max-width: 120px;
  padding: 8px 0;
  text-align: center;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  color: #111;

  &:hover {
    opacity: 0.9;
  }
`;

const LogoutWrapper = styled.div`
  width: 145px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledSpan = styled.span`
  font-size: 1rem;
  width: 31px;
  height: 31px;
  font-weight: 500;
  color: #fff;
  background: linear-gradient(145deg, #ff8a00, green, green);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  margin: 0 auto;
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();
  const nameFirstChar = session?.user?.name.split(" ")[0][0].toUpperCase();
  const image = session?.user?.image;

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition === 0) {
        setIsHeaderVisible(true);
      } else if (currentScrollPosition > scrollPosition) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return (
    <StyledHeader $isVisible={isHeaderVisible} $scrollPosition={scrollPosition}>
      <Wrapper>
        <Logo href="/" passHref>
          <MainLogo width="130" />
        </Logo>

        <StyledNav $mobileNavActive={mobileNavActive}>
          <NavLink href={"/"}>Home</NavLink>
          <NavLink href={"/products"}>Shop Now</NavLink>
          <NavLink href={"/about"}>About Us</NavLink>
          <NavLink href={"/contact"}>Contact Us</NavLink>
          {mobileNavActive && <NavLink href={"/account"}>Account</NavLink>}
          <MobileButtons>
            {session && status === "authenticated" && (
              <Button onClick={() => signOut()}>logout</Button>
            )}
            {!session && status !== "authenticated" && (
              <>
                <NavLink href={"/auth/login"}>
                  <OutlinedButton>Login</OutlinedButton>
                </NavLink>
                <NavLink href={"/auth/register"}>
                  <Button>Sign up</Button>
                </NavLink>
              </>
            )}
          </MobileButtons>
        </StyledNav>

        <ButtonWrapper>
          <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
            {!mobileNavActive ? <BarsIcon /> : <Close />}
          </NavButton>

          <DesktopButtons>
            {!session && (
              <>
                <NavLink href={"/auth/login"}>
                  <OutlinedButton>Login</OutlinedButton>
                </NavLink>
                <NavLink href={"/auth/register"}>
                  <Button>Sign up</Button>
                </NavLink>
              </>
            )}
            {session && (
              <LogoutWrapper>
                <StyledSpan onClick={() => router.push('/account')}>
                  {image ? (
                    <StyledImage src={image} alt="User profile" width="20" height="20" />
                  ) : (
                    nameFirstChar
                  )}
                </StyledSpan>
                <Button onClick={() => signOut()}>Logout</Button>
              </LogoutWrapper>
            )}
          </DesktopButtons>

          <CartIconWrapper onClick={() => router.push("/cart")}>
            <Cart>
              <ShoppingCart size={30} />
            </Cart>
            <CartBadge>{cartProducts?.length}</CartBadge>
          </CartIconWrapper>
        </ButtonWrapper>
      </Wrapper>
    </StyledHeader>
  );
}

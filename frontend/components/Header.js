import LogoWhite from "./icons/LogoWhite";
import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import CartIcon from "./icons/CartIcon";
import Close from "./icons/Close";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Router, useRouter } from 'next/router';


const StyledHeader = styled.header`
  width: 100%;
  height: 68px;
  background-color: #fff;
  color: #111;
  position: fixed;
  top: 0;
  // padding: 17px 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  text-decoration: none;
  width: 120px;
  height: auto;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
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
  font-size: 1rem;

  @media screen and (min-width: 800px) {
    display: flex;
    flex-direction: row;
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
  color: #111;
  text-decoration: none;
  padding: 10px 0;
  transition: color 0.3s ease;

  &:hover {
    color: darkgreen;
  }

  @media screen and (min-width: 800px) {
    padding: 0;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  @media (min-width: 800px) {
    gap: 30px;
  }
`;

const DesktopButtons = styled.div`
  display: none;
  
  @media screen and (min-width: 800px) {
    display: flex;
    gap: 15px;
  }
`;

const MobileButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;

  @media screen and (min-width: 800px) {
    display: none;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 2px;
  right: 0px;
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: #111;
  cursor: pointer;
  position: relative;
  z-index: 3;

  @media screen and (min-width: 800px) {
    display: none;
  }
`;

const CartIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1px;
  z-index: 1000;
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

  @media screen and (min-width: 800px) {
    font-size: 0.75rem;
    width: 19px;
    height: 19px;
    top: -8px;
    right: -8px;
  }
`;

const Button = styled.div`
  max-width: 200px;
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
  display: flex;
  align-items: center;
  gap: 15px;
  color: #ccc;
  font-size: 1rem;
`;

const StyledSpan = styled.span`
  width: 33px;
  height: 33px;
  font-size: 1rem;
  color: #fff;
  background: linear-gradient(145deg, #ff8a00, #e52e71, #00c6ff);
  padding: 2px;
  border-radius: 50%;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  margin: 0 auto;
  }
`;
export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const router = useRouter()

  const { data: session, status } = useSession();
  const nameFirstChar = session?.user?.name.split(" ")[0][0].toUpperCase();
  const image = session?.user?.image;

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href="/" passHref>
            <LogoWhite width="100" />
          </Logo>

          <StyledNav $mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/about"}>About</NavLink>
            {mobileNavActive && <NavLink href={"/account"}>Account</NavLink>}
            {/* Mobile Buttons */}
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

          {/* CartWrapper */}
          <ButtonWrapper>
            <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
              {!mobileNavActive ? <BarsIcon /> : <Close />}
            </NavButton>

            {/* Desktop Buttons */}
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
              {session && status === "authenticated" && (
                <LogoutWrapper>
                  <StyledSpan onClick={() => router.push('/account')}>
                    {image ? <StyledImage src={image} width={30} height={30} alt="profile" /> : nameFirstChar}
                  </StyledSpan>
                  <Button onClick={() => signOut()}>logout</Button>
                </LogoutWrapper>
              )}
            </DesktopButtons>

            <NavLink href={"/cart"}>
              <CartIconWrapper>
                <Cart>
                  <CartIcon />
                  <CartBadge>{cartProducts.length}</CartBadge>
                </Cart>
              </CartIconWrapper>
            </NavLink>
          </ButtonWrapper>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";


const StyledBox = styled.footer`
  background-color: #111;
  color: #ccc;
`;

const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

// const Divider = styled.hr`
//   border: 0;
//   height: 1px;
//   background-color: grey;
//   // margin: 2rem 0;
// `;

const FooterText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
`;

const Text = styled.p`
  color: #ccc;
  font-size: 0.9rem;
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  z-index: 999;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  opacity: 0.5;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fb8122;
    opacity: .8;
  }
`;

const Powered = styled(Link)`
  color: #fb8122;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Contact() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getCurrentYear = () => new Date().getFullYear();

  return (
    <StyledBox>
      <StyledContainer>
        {/* <StyledGrid>
          <StyledItem>
            <LogoBox>
              <LogoWhite />
            </LogoBox>
          </StyledItem>

          <StyledItem>
            <SectionTitle>Company</SectionTitle>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/cart">Cart</NavLink>
          </StyledItem>

          <StyledItem>
            <SectionTitle>Quick Links</SectionTitle>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/cart">Carts</NavLink>
            <NavLink href="/products">All Products</NavLink>
          </StyledItem>

          <StyledItem>
            <SectionTitle>Contact Us</SectionTitle>
            <ContactText>
              <PhoneIcon /> Phone: (+251) 953-431-542
            </ContactText>
            <ContactText>
              <EmailIcon /> Email: nexaddis@gmail.com
            </ContactText>
          </StyledItem>
        </StyledGrid> */}

        {/* <Divider /> */}

        <FooterText>
          <Text>© {getCurrentYear()} All right reserved | powered by <Powered href="http://localhost:3000">nexaddis</Powered> </Text>
        </FooterText>

        {showScrollToTop && (
          <ScrollToTopButton onClick={scrollToTop}>
            <ArrowUpwardIcon />
          </ScrollToTopButton>
        )}
      </StyledContainer>
    </StyledBox>
  );
}

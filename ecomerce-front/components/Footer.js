import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LogoWhite from "@/components/icons/LogoWhite";

// Styled Components
const StyledBox = styled.div`
  width: 100%;
  background-color: #1c2229;
  color: #e1e2e2;
  padding-top: 2rem;
  position: relative;
`;

const StyledContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  justify-content: center;
`;

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  margin-bottom: 1.1rem;
  margin-top: 0.4rem;

  img {
    width: 120px;
    height: auto;
    filter: invert(1);
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const Text = styled.p`
  margin-top: ${(props) => props.mt || 0};
  color: white;
  font-size: ${(props) => (props.small ? "0.875rem" : "1rem")};
`;

const SectionTitle = styled.h6`
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
`;

// Adjusted NavLink component
const NavLink = styled(Link)`
  margin-bottom: 0.8rem;
  font-size: 0.875rem;
  text-decoration: none;
  color: white;
  transition: color 0.3s ease;

  &:hover {
    color: #fb8122;
  }
`;

const ContactText = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.875rem;

  svg {
    margin-right: 0.5rem;
    font-size: 1rem;
    color: #fb8122;
  }
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: grey;
  margin: 2rem 0;
`;

const FooterText = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  z-index: 99999;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: 0.2;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fb8122;
    opacity: .8;
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
        <StyledGrid>
          <StyledItem>
            <LogoBox>
              <LogoWhite />
            </LogoBox>
          </StyledItem>

          {/* Company Links */}
          <StyledItem>
            <SectionTitle>Company</SectionTitle>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/cart">Cart</NavLink>
          </StyledItem>

          {/* Services Links */}
          <StyledItem>
            <SectionTitle>Quick Links</SectionTitle>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/cart">Carts</NavLink>
            <NavLink href="/products">All Products</NavLink>
          </StyledItem>

          {/* Contact Info */}
          <StyledItem>
            <SectionTitle>Contact Us</SectionTitle>
            <ContactText>
              <PhoneIcon /> Phone: (+251) 953-431-542
            </ContactText>
            <ContactText>
              <EmailIcon /> Email: nexaddis@gmail.com
            </ContactText>
          </StyledItem>
        </StyledGrid>

        <Divider />

        <FooterText>
          <Text>© {getCurrentYear()} NexAddis</Text>
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

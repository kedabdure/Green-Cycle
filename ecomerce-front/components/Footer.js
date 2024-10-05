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

const FooterText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
`;

const Text = styled.p`
  color: #ccc;
  font-size: 0.85rem;

  @media screen and (min-width: 768px) {
    font-size: 0.9rem;
  }
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
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: ${({ $isVisible }) => ($isVisible ? "translateY(0)" : "translateY(20px)")};
  transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.3s ease;
  pointer-events: ${({ $isVisible }) => ($isVisible ? "auto" : "none")};
  &:hover {
    background-color: #fb8122;
    opacity: 0.8;
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
    // Show the button if user scrolls down 200 pixels or more.
    setShowScrollToTop(window.scrollY > 200);
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
        <FooterText>
          <Text>
            © {getCurrentYear()} Nexaddis | All right reserved
            {/* <Powered href="http://localhost:3000/">nexaddis</Powered> */}
          </Text>
        </FooterText>

        {/* Always render the button but control its visibility through styles */}
        <ScrollToTopButton $isVisible={showScrollToTop} onClick={scrollToTop}>
          <ArrowUpwardIcon />
        </ScrollToTopButton>
      </StyledContainer>
    </StyledBox>
  );
}

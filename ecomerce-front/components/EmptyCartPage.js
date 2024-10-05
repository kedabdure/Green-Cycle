import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { primary } from "../lib/colors";

// Styled Components
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  // background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
`;

const MessageContainer = styled.div`
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 500px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #343a40;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 2rem;
`;

const ActionButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  color: white;
  background-color: ${primary};
  border-radius: 25px;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
  transition: all 0.3s;

  &:hover {
    opacity: 0.8;
    box-shadow: 0 6px 15px rgba(0, 123, 255, 0.3);
  }
`;

export default function EmptyCartPage() {
  return (
    <PageWrapper>
      <MessageContainer>
        <Title>Your Cart is Empty</Title>
        <Subtitle>Looks like you haven't added anything to your cart yet.</Subtitle>
        <ActionButton href="/">
          Continue Shopping
        </ActionButton>
      </MessageContainer>
    </PageWrapper>
  );
}

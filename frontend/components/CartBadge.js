import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import CartIcon from './icons/CartIcon';

// Styled component using styled-components
const StyledBadgeWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledBadge = styled.span`
  position: absolute;
  top: 13px;
  right: -3px;
  background-color: #f50057;
  color: white;
  border: 2px solid #fff;
  padding: 0 4px;
  border-radius: 12px;
  font-size: 0.75rem;
  min-width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function CartBadge({ cartProducts }) {
  return (
    <IconButton>
      <StyledBadgeWrapper>
        <CartIcon />
        {cartProducts && <StyledBadge>{cartProducts.length}</StyledBadge>}
      </StyledBadgeWrapper>
    </IconButton>
  );
}

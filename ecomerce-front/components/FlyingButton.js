import React, { useContext, useRef } from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import FlyingButton from 'updated-react-flying-item';
import { CartContext } from './CartContext';

const StyledButton = styled(Button)`
  border: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  text-transform: none;
  height: 38.5px;

  svg {
    height: 16px;
    margin-right: 5px;
  }

  ${({ outline }) =>
    outline &&
    `
    background-color: transparent;
    color: #000;
  `}

  ${({ filled }) =>
    filled &&
    `
    background-color: #fff;
    color: #000;
  `}
`;

// Main Component
export default function CustomFlyingButton({
  children,
  url,
  outline,
  filled,
  productID,
  ...rest
}) {
  const { addProduct } = useContext(CartContext);
  const flyingButtonRef = useRef(null);

  const handleAddToCart = (e) => {
    addProduct(productID);
    flyingButtonRef.current?.click();
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <FlyingButton
        ref={flyingButtonRef}
        src={url}
        targetTop="2%"
        targetLeft="88%"
        animationDuration={1.2}
        customAnimation={`
          0% { transform: scale(1.5); }
          10% { transform: scale(1.4); }
          20% { transform: scale(1.3); }
          30% { transform: scale(1.2); }
          40% { transform: scale(1.1); }
          50% { transform: scale(1.0); }
          60% { transform: scale(0.4); }
          70% { transform: scale(0.3); }
          80% { transform: scale(0.2); }
          100% { transform: scale(0.1); }
        `}
        flyingItemStyling={{
          border: 'none',
          background: 'none',
          borderRadius: '10px',
          width: '100px',
          height: '100px',
          transform: 'scale(1.2)',
          zIndex: 99999,
          opacity: 1,
          position: 'fixed',
        }}
      >
        <StyledButton
          variant="contained"
          onClick={handleAddToCart}
          {...rest}
          outline={outline}
          filled={filled}
        >
          {children}
        </StyledButton>
      </FlyingButton>
    </div>
  );
}

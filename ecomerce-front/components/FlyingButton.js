import FlyingButton from 'updated-react-flying-item'
import styled, { css } from 'styled-components'
import { ButtonStyle } from './Button';
import { useContext } from 'react';
import { CartContext } from './CartContext';

const FlyingBtnWrapper = styled.div`
  ${ButtonStyle}
`;

export default function FlyingBtn({
  children,
  url,
  outline,
  primary,
  white,
  black,
  productID,
  ...rest
}) {
  const { addProduct } = useContext(CartContext);
  return (
    <FlyingButton
      {...rest}
      src={url}
      targetTop={0}
      targetLeft={'88%'}
      animationDuration={1.2}
      customAnimation={`
        0% { transform: scale(1.5); }
        10% { transform: scale(1.4); }
        20% { transform: scale(1.3); }
        30% { transform: scale(1.2); }
        40% { transform: scale(1.1); }
        50% { transform: scale(1.0); }
        60% { transform: scale(0.8); }
        70% { transform: scale(0.5); }
        80% { transform: scale(0.3); }
        100% { transform: scale(0.1); }
      `}
      flyingItemStyling={{
        borderRadius: '10px',
        width: '100px',
        height: '100px',
        transform: 'scale(1.2)',
        zIndex: 99999,
        opacity: 1,
      }}
    >
      <FlyingBtnWrapper onClick={() => addProduct(productID)}>
        {children}
      </FlyingBtnWrapper>
    </FlyingButton>
  )
}
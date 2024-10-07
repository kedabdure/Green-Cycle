import styled, { css } from "styled-components";
import { primary } from "../lib/colors";

export const ButtonStyle = css`
  border: 0;
  padding: 5px 12px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  transition: all 0.3s ease;
  svg {
    height: 16px;
    margin-right: 5px;
  }

  /* Block variant for full width */
  ${(props) =>
    props.$block &&
    css`
      display: block;
      width: 100%;
    `}

  /* White button variants */
  ${(props) =>
    props.$white &&
    !props.$outline &&
    css`
      background-color: #fff;
      color: #000;

      &:hover {
        background-color: #f0f0f0;
      }
    `}
  
  /* White outline button variant */
  ${(props) =>
    props.$white &&
    props.$outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;

      &:hover {
        background-color: #fff;
        color: #000;
      }
    `}
  
  /* Black button variants */
  ${(props) =>
    props.$black &&
    !props.$outline &&
    css`
      background-color: #000;
      color: #fff;

      &:hover {
        background-color: #333;
      }
    `}
  
  /* Black outline button variant */
  ${(props) =>
    props.$black &&
    props.$outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;

      &:hover {
        background-color: #000;
        color: #fff;
      }
    `}
  
  /* Primary button variants */
  ${(props) =>
    props.$primary &&
    !props.$outline &&
    css`
      background-color: ${primary};
      border: 1px solid ${primary};
      color: #fff;

      &:hover {
        opacity: .7;
      }
    `}
  
  /* Primary outline button variant */
  ${(props) =>
    props.$primary &&
    props.$outline &&
    css`
      background-color: transparent;
      border: 2px solid ${primary};
      color: ${primary};

      &:hover {
        background-color: ${primary};
        color: #fff;
      }
    `}

  /* Large size variant */
  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}

  /* Responsive styles */
  @media screen and (max-width: 768px) {
    padding: 10px;
    font-size: 1rem;

    svg {
      height: 18px;
      margin-right: 3px;
    }

    ${(props) =>
      props.size === "l" &&
      css`
        font-size: 1.1rem;
        padding: 8px 16px;
      `}
  }

  @media screen and (max-width: 480px) {
    padding: 8px;
    font-size: 0.9rem;

    svg {
      height: 16px;
    }
  }
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({
  children,
  outline,
  primary,
  white,
  black,
  ...rest
}) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

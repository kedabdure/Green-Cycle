import styled, { css } from "styled-components";
import { primary } from "@/lib/colors";

export const ButtonStyle = css`
  border: 0;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  svg {
    height: 18px;
    margin-right: 7px;
  }

  &:hover {
    transform: translateY(-2px); /* Slight lift on hover */
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1); /* Add box shadow on hover */
  }

  &:active {
    transform: translateY(0); /* Reset lift */
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2); /* Slightly reduce shadow */
  }

  /* Add a smooth background transition effect */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    height: 100%;
    width: 300%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.1)
    );
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: -50%;
  }

  /* Style variants */
  ${props =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
  
  ${props =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}

  ${props =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}

  ${props =>
    props.black &&
    !props.outline &&
    css`
      background-color: #000;
      color: #fff;
    `}

  ${props =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
    `}

  ${props =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      border: 1px solid ${primary};
      color: #fff;
    `}

  ${props =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      border: 1px solid ${primary};
      color: ${primary};
    `}

  ${props =>
    props.size === 'l' &&
    css`
      font-size: 1.2rem;
      padding: 12px 25px;
      svg {
        height: 20px;
      }
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

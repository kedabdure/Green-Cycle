import Link from "next/link";
import styled from "styled-components";
import {ButtonStyle} from "/components/Button";

const StyledLink = styled(Link)`
  ${ButtonStyle}
  height: 40px;
  font-size: .9rem;

  @media screen and (min-width: 768px) {
    font-size: .95rem;
  }
`;

export default function ButtonLink(props) {
  return (
    <StyledLink {...props} />
  );
}

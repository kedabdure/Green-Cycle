import styled from "styled-components";

const CurrencyWrapper = styled.div`
  font-size: .9rem;
  color: #666;
  display: inline-block;
  fontWeight: 600;
  margin: 2px 2px 0 0;
  @media screen and (min-width: 768px) {
    font-size: .9rem;
  }
`;

export default function Currency({ ...props }) {
  return (
    <CurrencyWrapper {...props}>
    </CurrencyWrapper>
  );
}
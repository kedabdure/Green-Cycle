import styled from "styled-components";

const CurrencyWrapper = styled.div`
  font-size: .6rem;
  color: #666;
  display: inline-block;
  fontWeight: 500 !important;
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

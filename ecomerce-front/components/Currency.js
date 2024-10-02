import styled from "styled-components";

const CurrencyWrapper = styled.div`
  font-size: .9rem;
  color: #666;
`;

export default function Currency({ ...props }) {
  return (
    <CurrencyWrapper {...props}>
    </CurrencyWrapper>
  );
}

import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  th{
    text-align: left;
    text-transform: uppercase;
    color: #ccc;
    font-weight: 500;
    font-size: .9rem;
  }
`;

export default function Table(props) {
  return <StyledTable {...props} />
}
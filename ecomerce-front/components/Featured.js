import Center from "./Center";
import styled from "styled-components";

const Bg = styled.div`
  background-color: #222;
  color: white;
  padding: 50px 0
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
`

const Desc = styled.p`
  color: #aaa;
  font-size: .8rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  img {
    max-width: 100%;
  }
`;

export default function Featured() {
  return (
    <Bg>
      <Center>
        <Wrapper>
          <div>
            <Title>Pro anywhere</Title>
            <Desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Desc>
          </div>
          <div>
            <img src="https://www.stuff.tv/wp-content/uploads/sites/2/2024/09/Apple-iPhone-16-models-compared-lead.jpg?resize=1536,1024" alt="Pro anywhere" />
          </div>
        </Wrapper>
      </Center>
    </Bg>
  )
}
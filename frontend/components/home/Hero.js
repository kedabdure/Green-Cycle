import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  padding: 120px;
  width: 100%;
  min-height: 100vh;
  color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  text-align: center;
  position: relative;
`;

const Wrapper = styled.div`
  width: 901px;
  height: 597px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
`;

const TopSection = styled.div`
  width: 877px;
  height: 356px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextWrapper = styled.div`
  width: 877px;
  height: auto;
  gap: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 4rem;
  color: #111;
  margin-bottom: 1rem;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
`;

const StyledSpan = styled.span`
  padding: 5px 20px;
  border-radius: 68px;
  background: #D7FFB1;
  opacity: 1;
`;

const Subtitle = styled.p`
  font-size: .9rem;
  color: #4f4f4f;
  margin-bottom: 2rem;
  line-height: 1.6;
  text-align: center;
  max-width: 700px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
`;

const LeftButton = styled.button`
  max-width: 200px;
  width: 120px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #111;
  font-weight: 500;
  background-color: #D7FFB1;
  border: 1px solid #111;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: transparent;
  }
`;

const RightButton = styled.button`
  max-width: 200px;
  width: 120px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #111;
  font-weight: 500;
  background-color: transparent;
  border: 1px solid #111;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #D7FFB1;
  }
`;

const BottomSection = styled.div`
  margin-top: 2rem;
  max-width: 800px;
  color: #333;
  width: 901px;
  height: 193px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const BigImage = styled.div`
  width: 252px;
  height: 202px;
  overflow: hidden;
  border-radius: 20px;
  object-fit: cover;
`;

const ImageCircleWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1093px;
  height: 142px;
  gap: 0px;
`;

const ImageCircleTop = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageCircleBottom = styled.div`
  width: 80%;
  height: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageCircleSmall = styled.div`
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
`;

const ImageCircleXSmall = styled.div`
  width: 68px;
  height: 68px;
  overflow: hidden;
  border-radius: 50%;
`;

export default function Hero() {
  return (
    <Container>
      <Wrapper>
        <TopSection>
          <TextWrapper>
            <Title>Efficient <StyledSpan>Scrap</StyledSpan> Recycling Services Near You</Title>
            <Subtitle>
              Discover a sustainable way to furnish your home by buying and selling
              pre-loved furniture. When you choose to reuse, you're giving these
              pieces a second life and helping reduce waste. Let's make a positive
              impact on the environment together.
            </Subtitle>
          </TextWrapper>
          <ButtonWrapper>
            <LeftButton>Sell</LeftButton>
            <RightButton>Buy</RightButton>
          </ButtonWrapper>
        </TopSection>
        <BottomSection>
          <BigImage>
            <Image src="/assets/images/Dupe-sofa.jfif" width={252} height={204} />
          </BigImage>
          <BigImage>
            <Image src="/assets/images/traditional-style.jfif" width={252} height={204} />
          </BigImage>
        </BottomSection>

        <ImageCircleWrapper>
          <ImageCircleTop>
            <ImageCircleXSmall>
              <Image src="/assets/images/forest1.jfif" width={68} height={68} />
            </ImageCircleXSmall>
            <ImageCircleSmall>
              <Image src="/assets/images/greenHand.jfif" width={80} height={80} />
            </ImageCircleSmall>
          </ImageCircleTop>

          <ImageCircleBottom>
            <ImageCircleSmall>
              <Image src="/assets/images/greenWorld.jfif" width={80} height={80} />
            </ImageCircleSmall>
            <ImageCircleXSmall>
              <Image src="/assets/images/chair1.jfif" width={68} height={68} />
            </ImageCircleXSmall>
          </ImageCircleBottom>
        </ImageCircleWrapper>
      </Wrapper>
    </Container>
  );
}

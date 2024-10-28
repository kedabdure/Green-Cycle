import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 30px 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  margin-top: 50px;
  max-width: 1133px;
  display: flex;
  flex-direction: column;
  gap: 50px;

  @media (max-width: 768px) {
    gap: 20px;
    margin-top: 20px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
`;

const Title = styled.h1`
  width: 60%;
  font-size: 2rem;
  text-align: left;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1.5rem;
  }
`;

const StyledP = styled.p`
  width: 40%;
  padding: 5px;
  font-size: 0.8rem;
  line-height: 1.5;
  text-align: left;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.9rem;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const LeftSectionWrapper = styled.div`
  width: 460px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }

  div {
    width: 100%;
    height: auto;
    overflow: hidden;
    border-radius: 16px;
  }
`;

const MainImage = styled(Image)`
  border-radius: 16px;
  object-fit: cover;
`;

const RightSectionWrapper = styled.div`
  width: 655px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TextWrapper = styled.div`
  width: 429px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px;
  background-color: #f5f5f5;
  border-radius: 16px;
  text-align: left;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const DescTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const DescText = styled.div`
  font-size: 0.9rem;
`;

const DescImageWrapper = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const DescImageLeft = styled.div`
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: 16px;
`;

const DescImageRight = styled.div`
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: 16px;
`;

const DescImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
`;

const DescFooter = styled.div`
  padding: 30px;
  background-color: #f5f5f5;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Button = styled.button`
  width: 140px;
  height: 46px;
  font-size: .9rem;
  border-radius: 5px;
  background-color: #111;
  color: #fff;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #333;
    transform: scale(1.03);
  }
`;

const SvgImage = styled(Image)`
  width: 32px;
  height: 32px;
`;

const CurvedSvg = styled(Image)`
  position: absolute;
  top: 6%;
  left: 40%;
  width: 516px;
  height: 226px;

  @media (max-width: 768px) {
    width: 300px;
    height: auto;
    top: 5%;
    left: 20%;
  }
`;

export default function () {
  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>Transforming Scrap into Value</Title>
          <StyledP>
            Discover efficient scrap recycling in your neighborhood! We're dedicated to providing convenient and reliable services.
          </StyledP>
        </TitleWrapper>

        <ContentWrapper>
          <LeftSectionWrapper>
            <div>
              <MainImage width={460} height={500} src="/assets/images/sofa.jfif" alt="featured" />
            </div>
            <Button>
              Learn More
              <SvgImage width={12} height={12} src="/assets/images/arrow-right.svg" alt="arrow" />
            </Button>
          </LeftSectionWrapper>

          <RightSectionWrapper>
            <TextWrapper>
              <DescTitle>How We Make It?</DescTitle>
              <DescText>UrbanGreen tech’s LED lighting solutions have demonstrated significant energy efficiency gains.</DescText>
            </TextWrapper>
            <DescImageWrapper>
              <DescImageLeft>
                <DescImage width={364} height={150} src="/assets/images/sofa.jfif" alt="featured" />
              </DescImageLeft>
              <DescImageRight>
                <DescImage width={267} height={150} src="/assets/images/sofa.jfif" alt="featured" />
              </DescImageRight>
            </DescImageWrapper>
            <DescFooter>
              <h1>80% Energy Efficiency</h1>
              <p>UrbanGreen tech’s LED lighting solutions have demonstrated up to 80% energy efficiency improvements compared to traditional lighting systems.</p>
            </DescFooter>
          </RightSectionWrapper>
        </ContentWrapper>
        <CurvedSvg src="/assets/images/curv-arrow.svg" width={1139} height={593} />
      </Wrapper>
    </Container>
  );
}

import Image from "next/image";
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 50px;
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
  gap: 40px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Title = styled.h1`
  width: 60%;
  height: 58px;
  font-size: 2rem;
  text-align: left;
`;

const StyledP = styled.p`
  width: 40%;
  padding: 5px;
  font-size: .8rem;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
`;

const ContentWrapper = styled.div`
  width: 1,139px;
  height: 593px;
  gap: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LeftSectionWrapper = styled.div`
  width: 460px;
  height: 593px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  div {
    object-fit: cover;
    width: 460px;
    height: 500px;
  }
`;

const MainImage = styled(Image)`
  border-radius: 16px;
`;

const RightSectionWrapper = styled.div`
  width: 655px;
  height: 502px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TextWrapper = styled.div`
  width: 429px;
  height: 150px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 16px;
`;

const DescTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

const DescText = styled.div`
  font-size: 14px;
`;

const DescImageWrapper = styled.div`
  width: 655px;
  height: 150px;
  display: flex;
  gap: 24px;
`;

const DescImageLeft = styled.div`
  width: 364px;
  height: 150px;
  border-radius: 16px;
`;

const DescImageRight = styled.div`
  width: 267px;
  height: 150px;
  border-radius: 16px;
`;

const DescImage = styled(Image)`
  object-fit: cover;
  border-radius: 16px;
`;

const DescFooter = styled.div`
  height: 165px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 30px;
  background-color: #f5f5f5;
  border-radius: 16px;

  h1 {
    font-size: 24px;
    font-weight: 600;
  }

  p {
    font-size: 14px;
  }
`;

const Button = styled.button`
  padding: 0px 20px;
  border-radius: 4px;
  color; #111;
  font-weight: 500;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 15px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #D7FFB1;
  }
`;

const SvgImage = styled(Image)`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: darkgreen;
`;

const CurvedSvg = styled(Image)`
  position: absolute;
  top: 11%;
  left: 39%;
  width: 515.98px;
  height: 225.67px;
`;

export default function () {
  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>
            Transforming Scrap into Value
          </Title>
          <StyledP>
            Discover efficient scrap recycling neighborhood! We're dedicated to providing convenient reliable.
          </StyledP>
        </TitleWrapper>

        <ContentWrapper>
          <LeftSectionWrapper>
            <div>
              <MainImage width={460} height={500} src="/assets/images/sofa.jfif" alt="featured" />
            </div>
            <div>
              <Button>
                Learn More
                <SvgImage width={12} height={12} src="/assets/images/arrow-right.svg" alt="featured" />
              </Button>
            </div>
          </LeftSectionWrapper>

          <RightSectionWrapper>
            <TextWrapper>
              <DescTitle>
                How We Make It?
              </DescTitle>
              <DescText>
                UrbanGreen tech’s LED lighting solutions have demonstred energy efficiency gains
              </DescText>
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
              <p>UrbanGreen tech’s LED lighting solutions have demonstred energy efficiency gains of up to 80% compared to traditional lighting system.</p>
            </DescFooter>
          </RightSectionWrapper>
        </ContentWrapper>
        <CurvedSvg src="/assets/images/curv-arrow.svg" width={1139} height={593} />
      </Wrapper>
    </Container>
  )
}
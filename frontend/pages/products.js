import Header from "../components/Header";
import ProductsGrid from "../components/ProductsGrid";
import Footer from "../components/Footer";
import ProductsBox from "../components/home/ProductsBox";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";

const fetchProducts = async () => {
  const { data } = await axios.get("/api/products");
  return data;
};

export default function Products() {
  const { data: products = [], isLoading } = useQuery({
    productKey: ["products"],
    queryFn: fetchProducts,
  });


  return (
    <>
      <Header />
      <Container>
        <Wrapper>
          <TitleWrapper>
            <h1>Collection of Used Furniture</h1>
            <p>Stay updated with our information and engaging blog posts about modern Furniture and Fashion in the industry</p>
          </TitleWrapper>
          <CategoryWrapper>
            <CategoryButton active>All Furniture</CategoryButton>
            <CategoryButton>Bedroom</CategoryButton>
            <CategoryButton>Living Room</CategoryButton>
            <CategoryButton>Home Office</CategoryButton>
            <CategoryButton>Dining Table</CategoryButton>
            <CategoryButton>More</CategoryButton>
          </CategoryWrapper>
          <ProductsContainer>
            {products?.length > 0 && products.map(product => (
              <ProductsBox key={product._id} {...product} />
            ))}
          </ProductsContainer>

          <GradientWrapper>
          </GradientWrapper>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  padding: 120px 20px;
  min-height: 100vh;
  background-color: #EEF2FB;
  overflow: hidden;
  position: relative;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  max-width: 756px;
  margin-bottom: 50px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
    line-height: 1.3;

    @media (min-width: 768px) {
      font-size: 2.4rem;
    }
  }

  p {
    font-size: .9rem;
    color: #666;
    line-height: 1.5;

    @media (min-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
  margin-bottom: 40px;
`;

const CategoryButton = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  border: none;
  background-color: ${(props) => (props.active ? "#000" : "#e0e0e0")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #333;
    color: #fff;
  }

  @media (min-width: 768px) {
    padding: 12px 24px;
    font-size: 1rem;
  }
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;

  @media (min-width: 1024px) {
    gap: 30px;
  }
`;

const GradientWrapper = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  top: 5%;
  right: -20%;
  z-index: 1;
  background: linear-gradient(269.87deg, #50E3C2 -7.86%, rgba(80, 227, 194, 0) 91.6%);
  backdrop-filter: blur(360px)
`;

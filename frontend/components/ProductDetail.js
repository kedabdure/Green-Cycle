import styled from "styled-components";
import {useState} from "react";

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
  `;
const BigImage = styled.img`
  max-width: 100%;
  max-height: 350px;
`;
const ImageButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-grow: 0;
    margin-top: 10px;
  `;
const ImageButton = styled.div`
    border: 2px solid #ccc;
    ${props => props.active ? `
      border-color: #ccc;
    ` : `
      border-color: transparent;
    `}
    height: 60px;
    padding: 2px;
    cursor: pointer;
    border-radius: 5px;
  `;
const BigImageWrapper = styled.div`
  text-align: center;
  width: 100%;
  height: 350px;
`;

export default function ProductDetail({images}) {
  const [activeImage,setActiveImage] = useState(images?.[0]);
  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} />
      </BigImageWrapper>
      <ImageButtons>
        {images.map(image => (
          <ImageButton
            key={image}
            active={image===activeImage}
            onClick={() => setActiveImage(image)}>
            <Image src={image} alt=""/>
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
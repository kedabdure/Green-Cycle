import { useState } from "react";
import { Box, Paper, ButtonBase, ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";

export default function ProductDetail({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: 350,
          mb: 2,
        }}
      >
        <Box sx={{ width: "100%", height: "100%", overflow: "hidden", backgroundColor: 'transparent' }}>
          <Box
            sx={{
              position: 'relative',
              bgcolor: '#fff',
              width: '100%',
              height: "100%",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '16px',
              overflow: 'hidden',
              '& Image': {
                maxWidth: '100%',
                maxHeight: "350px",
                transition: 'transform 0.5s ease',
              },
              '&:hover Image': {
                transform: 'scale(1.2)',
              },
            }}
          >
            <Image
              src={activeImage}
              fill
              sizes="100%"
              alt="Product photo"
              placeholder="blur"
              blurDataURL={`${activeImage}?tr=w-10,h-10,bl`}
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Box>
      </Box>

      <ImageList
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
        cols={images.length}
      >
        {images.map((image) => (
          <ImageListItem key={image}>
            <ButtonBase
              onClick={() => setActiveImage(image)}
              sx={{
                borderRadius: 1,
                overflow: "hidden",
                border: image === activeImage ? "2px solid #ccc" : "2px solid transparent",
                width: 60,
                height: 60,
                p: 0.5,
                cursor: "pointer",
              }}
            >
              <Box
                component="img"
                src={image}
                alt="Thumbnail"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </ButtonBase>
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}

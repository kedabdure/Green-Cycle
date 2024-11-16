import { useState } from "react";
import { Box, ButtonBase, ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";
import PanoramaBox from "../panorama/PanoramaBox";
import { Image as ImageIcon } from "phosphor-react";

export default function ProductDetail({ images, panoramicImage, onExpandImage, isExpanded }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  const [isVR, setIsVR] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        position: "relative",
      }}
    >
      {/* VR Toggle Button */}
      {panoramicImage && !isExpanded && (
        <Box
          type="button"
          onClick={() => setIsVR(!isVR)}
          sx={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 1,
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            color: "#555",
            borderRadius: "50%",
            padding: "0.45rem",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.09)",
            },
          }}
        >
          {isVR ? (
            <ImageIcon size={24} />
          ) : (
            <Image
              src={isVR ? "/assets/icons/image-view.png" : "/assets/icons/360-degree.png"}
              width={40}
              height={40}
              alt={isVR ? "Image View" : "VR View"}
            />
          )}
        </Box>
      )}

      {/* Image Display */}
      {!isVR && (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              height: "260px",
              mb: 2,
              transition: "height 0.3s ease",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                backgroundColor: "transparent",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  bgcolor: "#fff",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "16px",
                  overflow: "hidden",
                  "& Image": {
                    maxWidth: "100%",
                    maxHeight: "100%",
                    transition: "transform 0.5s ease",
                  },
                  "&:hover Image": {
                    transform: "scale(1.2)",
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

          {/* Thumbnail List */}
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
                    border:
                      image === activeImage
                        ? "2px solid #ccc"
                        : "2px solid transparent",
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
        </Box>
      )}

      {/* VR View */}
      {isVR && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderRadius: isExpanded ? 0 : "12px",
            position: "relative",
          }}
        >
          <PanoramaBox
            panoramicImage={panoramicImage}
            onExpandImage={onExpandImage}
            isExpanded={isExpanded}
          />
        </Box>
      )}
    </Box>
  );
}

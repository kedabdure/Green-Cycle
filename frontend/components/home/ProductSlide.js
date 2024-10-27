import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Box, Card, CardContent, Typography, useMediaQuery, useTheme, Button } from "@mui/material";
import Image from "next/image";
import { CaretLeft, CaretRight, ArrowRight } from "phosphor-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const fetchProducts = async () => {
  const { data } = await axios.get("/api/products");
  return data;
};

export default function ProductSlide() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const sliderRef = useRef(null);

  const { data: productsData = [] } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isSmallScreen ? 1 : 3,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Box sx={{ width: "100%", minHeight: "931px", mx: "auto", p: 4 }}>
      <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
        <Box sx={{ textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
          <Box>
            <Typography variant="overline" color="primary" gutterBottom>Furniture</Typography>
            <Typography variant="h4" color="textPrimary">Discover the Latest Trends</Typography>
            <Typography variant="body1" color="textSecondary" sx={{ maxWidth: 600, mt: 1 }}>
              Stay updated with our insights and engaging blog posts about modern furniture and fashion.
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{

            }}
            color="primary">
            Explore <ArrowRight size={18} />
          </Button>
        </Box>

        <Box sx={{ position: "relative", width: "100%", m: 0, height: "613px" }}>
          <Slider ref={sliderRef} {...settings}>
            {productsData.length > 0 && productsData?.map((product, index) => (
              <Box key={product._id}>
                <Card
                  sx={{
                    width: { xs: "100%", sm: "370px" },
                    maxHeight: "499px",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 3,
                    borderRadius: 1,
                    overflow: "hidden",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.01)" },
                  }}
                >
                  <Box sx={{ width: "100%", height: '254px !important', overflow: "hidden", borderRadius: 2 }}>
                    <Image
                      src={product?.images[0]}
                      alt="Product Image"
                      width={379}
                      height={254}
                      placeholder="blur"
                      blurDataURL={`${product.images[0]}?tr=w-10,h-10,bl`}
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                  <CardContent sx={{ textAlign: "left", width: "100%", height: "auto", p: '32px' }}>
                    <Typography variant="overline" color="gray" fontSize=".6rem" mb= "1rem" gutterBottom>Furniture</Typography>
                    <Typography variant="h5" color="textPrimary" sx={{  mb: 2, fontSize: '24px', fontWeight: '700', lineHeight: '25.38px' }}>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                      {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                      {product.price.toFixed(2)} <Typography variant="subtitle2">ETB</Typography>
                    </Typography>
                    <Typography variant="caption" sx={{ mt: '1rem', textAlign: 'left' }} color="textSecondary">
                      {dayjs(product.updatedAt).fromNow()}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>


          {/* Custom Arrow Controls */}
          <Box
            position="absolute"
            right="0"
            bottom="0"
            sx={{
              width: '100%',
              height: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 2,
            }}
          >
            <Button
              onClick={() => sliderRef.current.slickPrev()}
              sx={{
                minWidth: "unset",
                backgroundColor: theme.palette.background.default,
                borderRadius: "50%",
                p: 1,
                "&:hover": { backgroundColor: theme.palette.action.hover },
              }}
            >
              <CaretLeft size={24} color={theme.palette.text.primary} />
            </Button>
            <Button
              onClick={() => sliderRef.current.slickNext()}
              sx={{
                minWidth: "unset",
                backgroundColor: theme.palette.background.default,
                borderRadius: "50%",
                p: 1,
                "&:hover": { backgroundColor: theme.palette.action.hover },
              }}
            >
              <CaretRight size={24} color={theme.palette.text.primary} />
            </Button>
          </Box>
        </Box>
      </Box >
    </Box >
  );
}

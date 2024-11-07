import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Box, Card, CardContent, Typography, useMediaQuery, useTheme, Button, Link } from "@mui/material";
import Image from "next/image";
import { CaretLeft, CaretRight, ArrowRight } from "phosphor-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Router from "next/router";

dayjs.extend(relativeTime);

const fetchProducts = async () => {
  const { data } = await axios.get("/api/products");
  return data;
};

export default function ProductSlide() {
  const router = Router;
  const theme = useTheme();
  const sliderRef = useRef(null);

  const { data: productsData = [], error, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isError) {
    console.error("Error fetching products:", error);
    return <Typography color="error">Failed to load products.</Typography>;
  }

  const formattedPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  var settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      }
    ]
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "auto",
        py: { xs: "3rem", md: "4rem", lg: "5rem" },
        px: { xs: "1rem", md: "2rem", lg: "5rem" },
        position: "relative"
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
          <Box
            sx={{
              textAlign: { xs: "center", md: "left" },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              mb: 4,
            }}
          >
            <Box
              sx={{
                textAlign: { xs: "center", md: "left" },
                maxWidth: { xs: "100%", md: "600px" },
                mx: { xs: "auto", md: 0 },
                mb: { xs: 4, md: 0 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="overline" color="grey.600" gutterBottom>
                Furniture
              </Typography>
              <Typography
                variant="h1"
                color="textPrimary"
                sx={{
                  fontSize: { xs: "1.6rem", md: "2rem", lg: "2rem" },
                  fontWeight: 700,
                  maxWidth: {xs: "300px", md: "400px"},
                  mb: 2,
                }}
              >
                New Arrival Secondhand Furniture!
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{
                  fontSize: { xs: ".8rem", md: "1rem" },
                  lineHeight: { xs: 1.4, md: 1.6 },
                  maxWidth: { xs: "250px", md: "400px" },
                  margin: { xs: '0 auto', md: '0' },
                }}
              >
                Purchasing used furniture helps protect forests and the environment.              </Typography>
            </Box>

            <Button
              onClick={() => router.push("/products")}
              sx={{
                backgroundColor: "#111",
                padding: "10px 20px",
                textTransform: "capitalize",
                display: "flex",
                gap: "5px",
                color: "#fff",
                borderRadius: "5px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#333",
                  transform: "scale(1.03)",
                },
              }}
            >
              Show More <ArrowRight size={18} />
            </Button>
          </Box>
        </Box>

        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: { xs: "2rem", md: "2rem" } }}>
          <Slider ref={sliderRef} {...settings}>
            {productsData.length > 0 &&
              productsData.map((product) => (
                <Box
                  key={product._id}
                  href={`/product/${product._id}`}
                  component={Link}
                  sx={{
                    position: 'relative',
                    textDecoration: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: {xs: ".5rem .1rem", sm: ".8rem", md: ".8rem"}
                  }}
                >
                  <Card
                    sx={{
                      minHeight: {xs: '450px',sm: "470px", md: "490px"},
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                      boxShadow: 3,
                      borderRadius: "5px",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.01)" },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: { xs: "235px", md: "250px" },
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={product?.images[0]}
                        fill
                        alt="Product photo"
                        placeholder="blur"
                        blurDataURL={`${product.images[0]}?tr=w-10,h-10,bl`}
                        style={{ objectFit: "cover" }}
                      />
                    </Box>

                    <CardContent
                      sx={{
                        textAlign: "left",
                        width: "100%",
                        height:"100%",
                        py: { xs: '10px', md: '16px' },
                        px: { xs: '16px', sm: '24px', lg: '32px' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography
                        variant="overline"
                        color="gray"
                        fontSize={{ xs: '.6rem', md: '.7rem' }}
                      >
                        Furniture
                      </Typography>
                      <Typography
                        variant="h5"
                        color="textPrimary"
                        sx={{
                          mt: 2,
                          mb: 1,
                          fontSize: { xs: '1.3rem', sm: '1.2rem', lg: '2rem' },
                          overflow: "hidden",
                          fontWeight: '700',
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          fontSize: { xs: '0.7rem', sm: '0.8rem', lg: '0.8rem' },
                        }}
                      >
                        {product.description}
                      </Typography>

                      <Typography
                        variant="h6"
                        color="grey.800"
                        sx={{
                          mt: "1rem",
                          fontSize: { xs: '1.15rem', sm: '1.1rem', lg: '1.2rem', fontWeight: "600" },
                        }}
                      >
                        {formattedPrice(product.price)}{" "}
                        <Typography variant="h6" fontSize=".7rem" display="inline-block">
                          ETB
                        </Typography>
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          mt: '1rem',
                          textAlign: 'left',
                          fontSize: { xs: '0.6rem', sm: '0.7rem', lg: '0.8rem' },
                        }}
                        color="textSecondary"
                      >
                        {dayjs(product.updatedAt).fromNow()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
          </Slider>


          {/* Custom Arrow Controls */}
          <Box
            sx={{
              width: '100%',
              height: 'auto',
              display: 'flex',
              gap: 2,
              paddingRight: '1rem',
            }}
          >
            <Button
              onClick={() => sliderRef.current.slickPrev()}
              sx={{
                minWidth: "unset",
                backgroundColor: theme.palette.background.default,
                borderRadius: "50%",
                border: "1px solid #aaa",
                p: "10px",
                "&:hover": { backgroundColor: theme.palette.action.hover },
              }}
            >
              <CaretLeft size={24} color={theme.palette.text.primary} />
            </Button>
            <Button
              onClick={() => sliderRef.current.slickNext()}
              sx={{
                border: "1px solid #aaa",
                minWidth: "unset",
                backgroundColor: theme.palette.background.default,
                borderRadius: "50%",
                p: "10px",
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

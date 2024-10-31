import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import {
  Planet,
  Leaf,
  Recycle,
  Tree,
  GlobeHemisphereWest,
  HandHeart,
  ShieldCheck,
} from "phosphor-react";

export default function AwarenessSlider() {
  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (sliderRef.current) {
        if (scrollTop > lastScrollTop) {
          sliderRef.current.slickNext();
        } else {
          sliderRef.current.slickPrev();
        }
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const messages = [
    { text: "Save the Planet", icon: <Planet size={24} weight="bold" color="#D7FFB1" /> },
    { text: "Eco-friendly Choices", icon: <Leaf size={24} weight="bold" color="#D7FFB1" /> },
    { text: "Green Solutions for a Better Tomorrow", icon: <GlobeHemisphereWest size={24} weight="bold" color="#D7FFB1" /> },
    { text: "Reduce, Reuse, Recycle", icon: <Recycle size={24} weight="bold" color="#D7FFB1" /> },
    { text: "Sustainable Furniture for a Greener Future", icon: <Tree size={24} weight="bold" color="#D7FFB1" /> },
    { text: "Think Green, Act Green", icon: <HandHeart size={24} weight="bold" color="#D7FFB1" /> },
    { text: "Protect Our Forests", icon: <ShieldCheck size={24} weight="bold" color="#D7FFB1" /> },
  ];

  return (
    <Box sx={{ width: "100%", marginTop: "20px", zIndex: 1 }}>
      <Box
        sx={{
          overflow: "hidden",
          backgroundColor: "#003F2E",
          padding: "10px 0",
          borderRadius: "10px",
          height: "70px",
          width: "100%",
        }}
      >
        <Slider {...settings} ref={sliderRef}>
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: "10px",
                textAlign: "center",
              }}
            >
              {message.icon}
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#D7FFB1",
                  transition: "color 0.3s ease-in-out",
                  "&:hover": { color: "#A3D7BF" },
                }}
              >
                {message.text}
              </Typography>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

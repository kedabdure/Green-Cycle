import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { Box, Typography, Container } from '@mui/material';
import {
  Tree,
  Leaf,
  ShieldStar,
  ShieldCheck,
  Recycle,
  Planet,
  GlobeHemisphereWest
} from 'phosphor-react';

export default function ClientSlider() {
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 5000,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const messages = [
    "Save Our Forests",
    "Combat Global Warming",
    "Plant for the Future",
    "Protect Biodiversity",
    "Stop Deforestation",
    "Use Resources Wisely",
    "Reduce Carbon Impact",
    "Green for Generations"
  ];

  const icons = [
    <Tree size={28} weight="bold" color="#D7FFB1" />,
    <GlobeHemisphereWest size={28} weight="bold" color="#D7FFB1" />,
    <Leaf size={28} weight="bold" color="#D7FFB1" />,
    <ShieldStar size={28} weight="bold" color="#D7FFB1" />,
    <ShieldCheck size={28} weight="bold" color="#D7FFB1" />,
    <Recycle size={28} weight="bold" color="#D7FFB1" />,
    <Planet size={28} weight="bold" color="#D7FFB1" />,
    <GlobeHemisphereWest size={28} weight="bold" color="#D7FFB1" />
  ];

  return (
    <Box maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box
          sx={{
            overflow: 'hidden',
            backgroundColor: '#003F2E',
            width: '100%',
            padding: { xs: '10px', sm: '15px', md: '18px' },
            zIndex: 1,
          }}
        >
          <Slider {...settings} ref={sliderRef}>
            {messages.map((text, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  padding: '0 5px',
                  height: '100%',
                  cursor: 'pointer',
                  width: '100%',
                  gap: '8px',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: { xs: '0.8rem', sm: '1rem', md: '1rem' },
                    color: '#D7FFB1',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    transition: 'color 0.3s ease-in-out',
                    '&:hover': {
                      color: '#A3D7BF',
                    },
                  }}
                >
                  {icons[index]} {text}
                </Typography>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
}

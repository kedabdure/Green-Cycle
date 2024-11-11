import React, { useState } from "react";
import Link from "next/link";
import { primary } from "../../lib/colors";
import { Box, Typography, Chip, Alert, Snackbar, IconButton } from "@mui/material";
import { X as CloseIcon } from "phosphor-react";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../cart/CartContext";

export default function ProductBox({ _id, title, price, images, badge }) {
  const [open, setOpen] = useState(false);
  const { addProduct } = useContext(CartContext);
  const url = '/product/' + _id;

  const handleAddToCart = (id) => {
    addProduct(id);
    setOpen(true);
  };

  const formatPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {/* Notification */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        sx={{ zIndex: 100000 }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: { xs: '75%', sm: '100%' },
            fontSize: '1rem',
            padding: '0.4rem 1rem',
          }}
          variant="filled"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
              sx={{ marginLeft: 'auto', marginTop: '-0.25rem' }}
            >
              <CloseIcon size={24} />
            </IconButton>
          }
        >
          Product added to cart!
        </Alert>
      </Snackbar>

      {/* Product Box */}
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 1,
          borderRadius: 2,
          zIndex: 1,
        }}
      >
        <Box
          component={Link}
          href={url}
          sx={{
            position: 'relative',
            bgcolor: '#fff',
            height: { xs: '130px', md: '180px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '16px',
            overflow: "hidden",
            "&:hover img": { transform: "scale(1.05)" },
          }}
        >
          {badge && (
            <Chip
              label="New"
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                bgcolor: primary,
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            />
          )}
          <Image
            src={images[0]}
            fill
            sizes="100%"
            alt="Product photo"
            placeholder="blur"
            blurDataURL={`${images[0]}?tr=w-10,h-10,bl`}
            style={{ objectFit: "contain", transition: 'transform .3s ease' }}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              '& a': { textDecoration: 'none' },
            }}
          >
            <Link href={url} passHref legacyBehavior>
              <Typography
                component="a"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', md: '1.1rem' },
                  color: 'inherit',
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  maxWidth: '100%',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {title}
              </Typography>
            </Link>

            <Box mt={1}>
              <Image width={50} height={10} src="/assets/images/dot-underline.svg" alt="" />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'flex-end', md: 'space-between' },
            bgColor: '#D4DCFB',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: { xs: '.5rem', md: "1.5rem" },
              borderRadius: '8px',
              width: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: "wrap", gap: 0.5 }}>
              <Typography variant="body1" fontSize="18px" fontWeight="600" component="span">
                {formatPrice(price)}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontSize: ".5rem" }}>ETB</Typography>
            </Box>

            <Box
              onClick={() => handleAddToCart(_id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#D4DCFB',
                borderRadius: '36px',
                padding: { xs: '5px 6px', md: '8px 10px' },
                fontSize: { xs: '.7rem', md: '0.9rem' },
                cursor: 'pointer',
                transition: 'backgroundColor 0.3s ease',

                '&:hover': {
                  backgroundColor: '#cbdbfb'
                }
              }}
            >
              Add to
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

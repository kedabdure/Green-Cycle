import React, { useState } from "react";
import Link from "next/link";
import Currency from "../Currency";
import { primary } from "../../lib/colors";
import { Box, Typography, Chip, Stack, Alert, Snackbar, IconButton } from "@mui/material";
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
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
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
          width: '276px',
          height: '312px',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 2,
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
            p: 2,
            height: '176px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '16px',
            overflow: 'hidden',
            '& Image': {
              maxWidth: '100%',
              maxHeight: "100px",
              transition: 'transform 0.5s ease',
            },
            '&:hover Image': {
              transform: 'scale(1.2)',
            },
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
            style={{ objectFit: "contain" }}
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
                  textDecoration: 'none',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
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
              mt: 1.5,
              borderRadius: '8px',
              width: '100%',
              p: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="body1" fontSize="18px" fontWeight="600" component="span">
                {formatPrice(price)}
              </Typography>
              <Currency>ETB</Currency>
            </Box>

            <Box
              onClick={() => handleAddToCart(_id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#D4DCFB',
                borderRadius: '36px',
                width: '65px',
                height: '34px',
                padding: '8px',
                fontSize: '0.9rem',
                cursor: 'pointer',
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

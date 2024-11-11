"use client";

import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "./cart/CartContext";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { ShoppingCart, X as Close, List as BarsIcon } from "phosphor-react";
import MainLogo from "./icons/Logo";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const nameFirstChar = session?.user?.name?.[0]?.toUpperCase() || "";
  const image = session?.user?.image;

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      setIsHeaderVisible(currentScrollPosition <= scrollPosition);
      setScrollPosition(currentScrollPosition);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  useEffect(() => {
    if (mobileNavActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileNavActive]);

  const linkStyles = {
    position: "relative",
    color: "#111",
    fontWeight: 500,
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "#00b600",
    },
    "&.active": {
      color: "#00b600",
    },
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop Now" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        position: "fixed",
        top: 0,
        zIndex: 1000,
        backgroundColor: scrollPosition > 0 ? "#fff" : "transparent",
        color: "#111",
        transition: "background-color 0.5s ease-in-out, transform 0.5s ease",
        transform: isHeaderVisible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: { xs: "1rem", md: "1rem 3rem", lg: "1rem 5rem" },
        }}
      >
        {/* Logo (Left side) */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Link href="/" passHref>
            <MainLogo width="130" />
          </Link>
        </Box>

        {/* Desktop Navigation */}
        <Box
          component="nav"
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
          }}
        >
          {navLinks.map((link) => (
            <Link href={link.href} passHref key={link.href} style={{ textDecoration: "none" }}>
              <Typography sx={linkStyles} className={router.pathname === link.href ? "active" : ""}>
                {link.label}
              </Typography>
            </Link>
          ))}
        </Box>

        {/* Mobile Sidebar */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "flex-start",
            backgroundColor: "#fff",
            gap: "1.2rem",
            p: "1rem 1.5rem",
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 1000,
            height: "100vh",
            width: mobileNavActive ? "300px" : "0",
            transform: mobileNavActive ? "translateX(0)" : "translateX(-100%)",
            opacity: mobileNavActive ? 1 : 0,
            overflow: "hidden",
            transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
          }}
        >
          {/* Logo and Close Button */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", mb: "1.5rem" }}>
            <Link href="/" passHref>
              <MainLogo width="120px" />
            </Link>
            <IconButton onClick={() => setMobileNavActive(false)}>
              <Close size={28} />
            </IconButton>
          </Box>

          {/* Sidebar Links */}
          {navLinks.map((link) => (
            <Link href={link.href} passHref key={link.href} style={{ textDecoration: "none" }}>
              <Typography sx={{ ...linkStyles, fontSize: "1.1rem", marginBottom: ".5rem" }} onClick={() => setMobileNavActive(false)} className={router.pathname === link.href ? "active" : ""}>
                {link.label}
              </Typography>
            </Link>
          ))}
          <Link href="/account" passHref style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                ...linkStyles,
                fontSize: "1.1rem",
                marginBottom: ".5rem",
                display: { xs: 'block', md: 'none' }, // Only visible on mobile
              }}
              onClick={() => setMobileNavActive(false)}
              className={router.pathname === "/account" ? "active" : ""}
            >
              Account
            </Typography>
          </Link>

          {/* User Section */}
          {session ? (
            <Box sx={{ mt: "2rem", display: "flex", alignItems: "center", gap: 1 }}>
              <Button onClick={() => signOut()} sx={{ border: '1px solid #111', color: '#111' }}>Logout</Button>
            </Box>
          ) : (
            <>
              <Link href="/auth/login" passHref>
                <Button variant="outlined" sx={{ textTransform: "capitalize", color: "#111", borderColor: "#111", mt: "1rem" }}>Login</Button>
              </Link>
              <Link href="/auth/register" passHref>
                <Button variant="contained" sx={{ textTransform: "capitalize", color: "#fff", backgroundColor: "#111" }}>Sign up</Button>
              </Link>
            </>
          )}
        </Box>

        {/* Overlay Background */}
        {mobileNavActive && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 900,
            }}
            onClick={() => setMobileNavActive(false)}
          />
        )}

        {/* User Actions */}
        <Box sx={{ width: { xs: "100%", md: "20%" }, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton onClick={() => setMobileNavActive((prev) => !prev)}>
              <BarsIcon size={28} />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {session ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Avatar
                  sx={{ bgcolor: "green", cursor: "pointer" }}
                  onClick={() => router.push("/account")}
                  src={image}
                >
                  {!image && nameFirstChar}
                </Avatar>
                <Button variant="outlined" sx={{ textTransform: 'capitalize', color: '#111', borderColor: '#111' }} onClick={() => signOut()}>Logout</Button>
              </Box>
            ) : (
              <>
                <Link href="/auth/login" passHref>
                  <Button variant="outlined" sx={{ textTransform: "capitalize", color: "#111", borderColor: "#111" }}>Log In</Button>
                </Link>
                <Link href="/auth/register" passHref>
                  <Button variant="contained" sx={{ textTransform: "capitalize", color: "#fff", backgroundColor: "#111" }}>Sign up</Button>
                </Link>
              </>
            )}
          </Box>

          <Link href="/cart">
            <IconButton>
              <Badge badgeContent={cartProducts.length} color="error">
                <ShoppingCart size={28} />
              </Badge>
            </IconButton>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

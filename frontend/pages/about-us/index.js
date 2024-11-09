import React, { useEffect } from "react";
import HeroSection from '../../components/about/HeroSection'
import AboutUsContent from "../../components/about/AboutUsContent";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div style={{ position: "relative" }}>
      <Header />
      {/* <HeroSection /> */}
      <AboutUsContent />
      <Footer />
    </div>
  );
}

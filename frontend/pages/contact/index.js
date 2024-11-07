import React, { useEffect } from "react";
import Footer from '../../components/Footer'
import ContactForm from "../../components/contact/ContactForm";
import Header from '../../components/Header';

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Header />
      <ContactForm />
      <Footer />
    </div>
  );
}

import React, { useEffect } from "react";
import Footer from '../../components/Footer'
import ContactForm from "../../components/contact/ContactForm";
import Header from '../../components/Header';
import ContactLinks from "../../components/contact/ContactLinks";
import ContactInfo from "../../components/contact/ContactInfo";
import NewsLetter from "../../components/contact/Newsletter";

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Header />
      <ContactLinks />
      <ContactForm />
      <ContactInfo />
      <NewsLetter />
      <Footer />
    </div>
  );
}

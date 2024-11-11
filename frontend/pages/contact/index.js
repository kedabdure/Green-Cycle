"use client";

import React from "react";
import Head from "next/head";
import Footer from '../../components/Footer'
import ContactForm from "../../components/contact/ContactForm";
import Header from '../../components/Header';
import ContactLinks from "../../components/contact/ContactLinks";
import ContactInfo from "../../components/contact/ContactInfo";
import NewsLetter from "../../components/contact/Newsletter";

export default function AboutUs() {
  return (
    <div style={{ position: "relative" }}>
      <Head>
        <title>Contact Us - Green Cycle</title>
      </Head>
      <Header />
      <ContactLinks />
      <ContactForm />
      <ContactInfo />
      <NewsLetter />
      <Footer />
    </div>
  );
}

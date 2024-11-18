import Head from "next/head";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";
import AboutContent from "../../components/about/AboutContent";

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About Us - Green Cycle</title>
      </Head>
      <Header />
      <AboutContent />
      <Footer />
    </>
  );
};

export default AboutUs;

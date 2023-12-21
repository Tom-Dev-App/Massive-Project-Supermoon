import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer.jsx";
import Hero from "../../components/Hero/Hero.jsx";
import Article from "../../components/Article/Article.jsx";
import WisataCard from "../../components/Wisata/WisataCard.jsx";
import PackageCard from "../../components/Paket Wisata/PackageCard.jsx";

const Beranda = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Article />
      <WisataCard />
      <PackageCard />
      <Footer />
    </>
  );
};

export default Beranda;

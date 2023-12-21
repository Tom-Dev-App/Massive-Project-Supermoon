import React from "react";
import AuthNavbar from "../../components/Navbar/AuthNavbar";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Article from "../../components/Article/Article";
import WisataCard from "../../components/Wisata/WisataCard";
import PackageCard from "../../components/Paket Wisata/PackageCard";

const AuthBeranda = () => {
  return (
    <>
      <AuthNavbar />
      <Hero />
      <Article />
      <WisataCard />
      <PackageCard />
      <Footer />
    </>
  );
};

export default AuthBeranda;

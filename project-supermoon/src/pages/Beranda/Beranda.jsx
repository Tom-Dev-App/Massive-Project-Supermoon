import React from "react";
import MainNavbar from "../../component/Navbar/MainNavbar";
import MainFooter from "../../component/Footer/MainFooter";
import SecondNavbar from "../../component/Navbar/SecondNavbar";
import MainCard from "../../component/Card/MainCard";

const Beranda = () => {
  return (
    <>
      <SecondNavbar />
      <div className="font-productSans">
        <h2 className="text-4xl">Halaman Beranda</h2>
        <div className="flex flex-row justify-evenly items-center">
          <MainCard />
          <MainCard />
          <MainCard />
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default Beranda;

import React from "react";
import AuthNavbar from "../../components/Navbar/AuthNavbar";
import Logo from "../../assets/logo/KUNINGANTOUR_1.png";
import Footer from "../../components/Footer/Footer";
import CardRiwayat from "../../components/CardProfile/CardRiwayat";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

const Riwayat = () => {
  return (
    <>
      <Navbar />
      <div className="font-productSans bg-[#F7F7FF] flex flex-row">
        <Sidebar />
        <div className="w-full px-4 py-10">
          <div className="px-4 mb-5">
            <h4 className="lg:text-4xl text-xl font-bold">Riwayat Pesanan</h4>
            <p className="lg:text-base text-sm">
              Cek kembali destinasi tersimpan untuk perjalanan berikutnya.
            </p>
            <div className="flex lg:flex-row flex-col gap-10 mt-5">
              <Link className="items-center px-3 py-1 lg:px-4 lg:py-2 lg:text-base text-sm text-center text-white border-solid border-2 border-primary-main bg-primary-main rounded-lg">
                Semua
              </Link>
              <Link className="items-center px-3 py-1 lg:px-4 lg:py-2 lg:text-base text-sm text-center text-primary-main border-solid border-2 border-primary-main bg-primary-surface rounded-lg">
                Paket Wisata
              </Link>
              <Link className="items-center px-3 py-1 lg:px-4 lg:py-2 lg:text-base text-sm text-center text-primary-main border-solid border-2 border-primary-main bg-primary-surface rounded-lg">
                Wisata
              </Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            <CardRiwayat />
            <CardRiwayat />
            <CardRiwayat />
          </div>
          <div className="flex justify-center">
            <Link
              to="/order"
              className="items-center px-3 py-1 lg:px-4 lg:py-2 lg:text-base text-sm text-center text-white border-solid border-2 border-primary-main bg-primary-main rounded-lg"
            >
              Lihat Semua
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Riwayat;

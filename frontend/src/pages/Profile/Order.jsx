import React from "react";
import AuthNavbar from "../../components/Navbar/AuthNavbar";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";

const Order = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-row font-productSans bg-[#F7F7FF]">
        <div className="row-span-3">
          <Sidebar />
        </div>
        <div className="w-full px-4 py-10 bg">
          <div className="px-4 flex flex-col gap-3 bg-neutral-10 mb-10">
            <h4 className="lg:text-4xl text-xl font-bold">Detail Order</h4>
          </div>
          <div className="w-full bg-neutral-10  rounded-lg mb-10 px-4 py-8">
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs">Waktu Pemesanan</p>
              <p className="lg:text-base text-xs">13 November 2023, 11:45</p>
            </div>
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs">Booking ID</p>
              <p className="lg:text-base text-xs">KT-0001</p>
            </div>
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs">Booking Ref</p>
              <p className="lg:text-base text-xs">-</p>
            </div>
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs">Transaction ID</p>
              <p className="lg:text-base text-xs">-</p>
            </div>
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs">Metode Pembayaran</p>
              <p className="lg:text-base text-xs">QRIS</p>
            </div>
          </div>
          <div className="w-full bg-neutral-10  rounded-lg mb-10 px-4 py-8">
            <div className="flex justify-between items-center mb-10">
              <h6 className="lg:text-xl text-base font-bold">Rincian Harga</h6>
            </div>
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs">Paket Wisata 1 (1x)</p>
              <p className="lg:text-base text-xs">Rp. 1.000.000</p>
            </div>
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs">Biaya Layanan</p>
              <p className="lg:text-base text-xs">Rp. 100.000</p>
            </div>
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs font-bold">Total Pembayaran</p>
              <p className="lg:text-base text-xs font-bold">Rp. 1.100.000</p>
            </div>
          </div>
          <div className="w-full bg-neutral-10  rounded-lg mb-5 px-4 py-8">
            <div className="flex justify-between items-center mb-10">
              <h6 className="lg:text-xl text-base font-bold">Rincian Kontak</h6>
            </div>
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs">Nama Lengkap</p>
              <p className="lg:text-base text-xs">Arin</p>
            </div>
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs">Email</p>
              <p className="lg:text-base text-xs">arin@gmail.com</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="lg:text-base text-xs">Nomor Telepon</p>
              <p className="lg:text-base text-xs">08954162748523</p>
            </div>
          </div>
          <Link
            to="/riwayat"
            className="items-center px-3 py-1 lg:px-4 lg:py-2 lg:text-base text-sm text-center text-white border-solid border-2 border-primary-main bg-primary-main rounded-lg"
          >
            Lihat Riwayat Pesanan
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Order;

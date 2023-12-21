import React from "react";
import Logo from "../../assets/logo/KUNINGANTOUR_1.png";
import AuthNavbar from "../../components/Navbar/AuthNavbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import CardProfile from "../../components/CardProfile/CardProfile";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

const Profile = () => {
  let user = JSON.parse(localStorage.getItem("user")) || "No user";
  user = user[0];
  const fullname = user.fullname || "Nama";
  const image_path = user.image_path || "No Image";
  console.log(user);

  return (
    <>
      <Navbar />
      <div className="font-productSans bg-[#F7F7FF] flex flex-row">
        <Sidebar />
        <div className="w-full px-4 py-10">
          <div className="px-4 mb-5">
            <h4 className="lg:text-4xl text-xl font-bold">Hello {fullname}</h4>
            <p className="lg:text-base text-sm">
              Selamat datang dan jelajahi lebih banyak tempat di Kabupaten
              Kuningan.
            </p>
            <div className="py-5 flex lg:flex-row flex-col gap-3">
              <input
                type="text"
                className="lg:w-[573px] w-full px-4 py-2 gap-3 rounded-lg border border-neutral-50"
                placeholder="Cari Destinasi..."
              />
              <button className="px-4 py-2 bg-primary-main rounded-lg text-white">
                Cari
              </button>
            </div>
          </div>
          <div className="mt-10 flex flex-row justify-between px-4">
            <h6 className="font-bold lg:text-xl text-base">
              Cek destinasi sebelum berpergian, kuy!
            </h6>
            <Link
              to="/wisata"
              className="text-neutral-60 cursor-pointer lg:text-base text-sm"
            >
              Lihat Semua
            </Link>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            <CardProfile />
            <CardProfile />
            <CardProfile />
          </div>
          <div className="mt-10 flex lg:flex-row flex-col gap-3 justify-between px-4">
            <div className="flex flex-col gap-3">
              <h6 className="font-bold lg:text-xl md:text-base sm:text-sm">
                Kumpulan Paket Wisata Menarik di Kuningan untukmu
              </h6>
              <p className="lg:text-base md:text-sm sm:text-xs">
                Yuk, temukan berbagai macam paket wisata menarik.
              </p>
            </div>
            <div className="flex flex-row gap-3">
              <Link
                to="/paketWisata"
                className="text-neutral-60 cursor-pointer lg:text-base text-sm"
              >
                Lihat Semua
              </Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            <CardProfile />
            <CardProfile />
            <CardProfile />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;

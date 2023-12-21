import React, { useState, useEffect } from "react";
import Control from "../../assets/images/Dashboard/control.png";
import Logo from "../../assets/logo/KUNINGANTOUR_1.png";
import { Link, useLocation } from "react-router-dom";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaUser, FaCompass, FaArchive, FaCreditCard } from "react-icons/fa";
import { MdHotel, MdOutlineRestaurant, MdComment } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";

const SidebarAdmin = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  return (
    <>
      <div className="flex font-productSans  py-10 bg-[#F7F7FF]">
        <div
          className={`${
            open ? "w-72" : "w-24"
          } duration-300  p-5 pt-3 bg-neutral-10 rounded-lg shadow-xl relative`}
        >
          <img
            src={Control}
            alt="Control"
            className={`absolute cursor-pointer -right-3 top-9 w-10 border-2 border-primary-main rounded-full ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex items-center justify-center py-2">
            <img
              src={Logo}
              alt="Logo"
              className={`cursor-pointer duration-500 w-40 ${
                !open && "scale-0"
              }`}
            />
          </div>
          <ul className="mt-10">
            <li className="py-6">
              <Link
                to="/dashboard/artikel"
                className={`flex items-center gap-5 ${
                  url === "/dashboard/artikel"
                    ? "bg-primary-main px-4 py-2 rounded-lg text-white"
                    : ""
                }`}
              >
                <IoDocumentTextSharp className={`w-8 h-8`} />
                <span className={`${!open && "hidden"}`}>Kelola Artikel</span>
              </Link>
            </li>
            <li className="py-6">
              <Link
                to="/dashboard/user"
                className={`flex items-center gap-5 ${
                  url === "/dashboard/user"
                    ? "bg-primary-main px-4 py-2 rounded-lg text-white"
                    : ""
                }`}
              >
                <FaUser className="w-8 h-8" />
                <span className={`${!open && "hidden"}`}>Kelola Pengguna</span>
              </Link>
            </li>
            <li className="py-6">
              <Link
                to="/dashboard/wisata"
                className={`flex items-center gap-5 ${
                  url === "/dashboard/wisata"
                    ? "bg-primary-main px-4 py-2 rounded-lg text-white"
                    : ""
                }`}
              >
                <FaCompass className={`w-8 h-8`} />
                <span className={`${!open && "hidden"}`}>Kelola Wisata</span>
              </Link>
            </li>
            <li className="py-6">
              <Link
                to="/dashboard/paket-wisata"
                className={`flex items-center gap-5 ${
                  url === "/dashboard/kelolaPaketWisata"
                    ? "bg-primary-main px-4 py-2 rounded-lg text-white"
                    : ""
                }`}
              >
                <FaArchive className={`w-8 h-8`} />
                <span className={`${!open && "hidden"}`}>
                  Kelola Paket Wisata
                </span>
              </Link>
            </li>
            <li className="py-6">
              <Link
                to="/dashboard/penginapan"
                className={`flex items-center gap-5 ${
                  url === "/dashboard/penginapan"
                    ? "bg-primary-main px-4 py-2 rounded-lg text-white"
                    : ""
                }`}
              >
                <MdHotel className={`w-8 h-8`} />
                <span className={`${!open && "hidden"}`}>
                  Kelola Penginapan
                </span>
              </Link>
            </li>
            <li className="py-6">
              <Link
                to="/dashboard/kuliner"
                className={`flex items-center gap-5 ${
                  url === "/dashboard/kuliner"
                    ? "bg-primary-main px-4 py-2 rounded-lg text-white"
                    : ""
                }`}
              >
                <MdOutlineRestaurant className={`w-8 h-8`} />
                <span className={`${!open && "hidden"}`}>Kelola Kuliner</span>
              </Link>
            </li>
            <li className="py-6">
              <Link
                to="/dashboard/komentar"
                className={`flex items-center gap-5 ${
                  url === "/dashboard/kelolaKomentar"
                    ? "bg-primary-main px-4 py-2 rounded-lg text-white"
                    : ""
                }`}
              >
                <MdComment className={`w-8 h-8`} />
                <span className={`${!open && "hidden"}`}>Kelola Komentar</span>
              </Link>
            </li>
            <li className="py-6">
              <Link
                to="/dashboard/transaksi"
                className={`flex items-center gap-5 ${
                  url === "/dashboard/transaksi"
                    ? "bg-primary-main px-4 py-2 rounded-lg text-white"
                    : ""
                }`}
              >
                <FaCreditCard className={`w-8 h-8`} />
                <span className={`${!open && "hidden"}`}>
                  Kelola Pembayaran
                </span>
              </Link>
            </li>
            <li className="py-6">
              <Link
                to="/"
                className={`flex items-center gap-5 ${
                  url === "/"
                    ? "bg-primary-main px-4 py-2 rounded-lg text-white"
                    : ""
                }`}
              >
                <RiLogoutBoxFill className="w-8 h-8" />
                <span className={`${!open && "hidden"}`}>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;

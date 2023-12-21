import React, { useState, useEffect } from "react";
import Control from "../../assets/images/Dashboard/control.png";
import Logo from "../../assets/logo/KUNINGANTOUR_1.png";
import { Link, useLocation } from "react-router-dom";
import { IoMdHome, IoMdSettings } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";

const Sidebar = () => {
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
                to="/mydashboard"
                className={`flex items-center gap-5 ${
                  url === "/mydashboard"
                    ? "bg-primary-main px-4 py-2 rounded-lg text-white"
                    : ""
                }`}
              >
                <IoMdHome className={`w-8 h-8`} />
                <span className={`${!open && "hidden"}`}>Dashboard</span>
              </Link>
            </li>
            <li className="py-6">
              <Link
                to="/mydashboard/transaksi"
                className={`flex items-center gap-5 ${
                  url === "/mydashboard/transaksi"
                    ? "bg-primary-main px-4 py-2 rounded-lg text-white"
                    : ""
                }`}
              >
                <FaShoppingCart className="w-8 h-8" />
                <span className={`${!open && "hidden"}`}>Riwayat Pesanan</span>
              </Link>
            </li>
            <li className="py-6">
              <Link
                to="/mydashboard/akun"
                className={`flex items-center gap-5 ${
                  url === "/mydashboard/akun"
                    ? "bg-primary-main px-4 py-2 rounded-lg text-white"
                    : ""
                }`}
              >
                <IoMdSettings className={`w-8 h-8`} />
                <span className={`${!open && "hidden"}`}>Pengaturan Akun</span>
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

export default Sidebar;

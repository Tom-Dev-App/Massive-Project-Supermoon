import React, { useState } from "react";
import Logo from "../../assets/logo/logo.png";
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProfilePicture from "../../assets/images/Navbar/profile.png";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

const AuthNavbar = () => {
  const [click, setClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="relative bg-primary-main w-full flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 py-2 font-productSans z-50">
        <div>
          <div className="flex justify-between px-4 py-4">
            <Link to="/authBeranda">
              <img src={Logo} alt="Logo" />
            </Link>
            <button
              className="text-white focus:outline-none lg:hidden"
              onClick={() => setClick(!click)}
            >
              {click ? (
                <FaTimes className="md:block w-10 h-10" />
              ) : (
                <CiMenuBurger className="md:block w-10 h-10" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`flex flex-col lg:flex-row lg:item-center lg:flex ${
            click ? "flex" : "hidden"
          }`}
        >
          <Link
            to="/authBeranda"
            className="text-base font-bold block text-white py-4 px-6 relative cursor-pointer before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:bg-secondary-main hover:before:w-full hover:before:opacity-100"
          >
            Beranda
          </Link>
          <Link
            to="/wisata"
            className="text-base font-bold block text-white py-4 px-6 relative cursor-pointer before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:bg-secondary-main hover:before:w-full hover:before:opacity-100"
          >
            Wisata
          </Link>
          <Link
            to="/blog"
            className="text-base font-bold block text-white py-4 px-6 relative cursor-pointer before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:bg-secondary-main hover:before:w-full hover:before:opacity-100"
          >
            Blog
          </Link>
          <Link
            to="/kontak"
            className="text-base font-bold block text-white py-4 px-6 relative cursor-pointer before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:bg-secondary-main hover:before:w-full hover:before:opacity-100"
          >
            Kontak
          </Link>
          <Link
            to="/tentangkami"
            className="text-base font-bold block text-white py-4 px-6 relative cursor-pointer before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-1 before:rounded-full before:opacity-0 before:bg-secondary-main hover:before:w-full hover:before:opacity-100"
          >
            Tentang Kami
          </Link>
        </div>

        <div
          className={`flex flex-col lg:flex-row lg:item-center px-2 py-4 lg:flex gap-3 lg:gap-2 ${
            click ? "flex" : "hidden"
          }`}
        >
          <form>
            <div className="relative flex items-center gap-2">
              <CiSearch className="w-5 h-5 absolute ml-3" />
              <input
                type="text"
                name="search"
                placeholder="Pencarian"
                autoComplete="off"
                arial-label="Pencarian"
                className="w-full pr-3 pl-10 px-6 py-2 font-semibold placeholder-neutral-70 rounded-2xl border-2 bg-primary-surface"
              />
            </div>
          </form>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <div className="flex justify-center items-center cursor-pointer">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2">
                <img
                  src={ProfilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-semibold text-lg">
                {!isOpen ? (
                  <AiOutlineCaretDown className="h-8" />
                ) : (
                  <AiOutlineCaretUp className="h-8" />
                )}
              </div>
            </div>
          </button>
          {isOpen && (
            <div className="bg-neutral-30 lg:absolute w-full lg:top-20 rounded-lg lg:w-80 px-4 py-2 z-50">
              <div className="flex flex-col">
                <Link
                  to="/profile"
                  className="p-3 hover:bg-primary-main hover:rounded-lg  hover:text-neutral-10"
                >
                  Profile Saya
                </Link>
                <hr className="border-neutral-10" />
                <Link
                  to="/"
                  className="p-3 hover:bg-primary-main hover:rounded-lg  hover:text-neutral-10"
                >
                  Keluar
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthNavbar;

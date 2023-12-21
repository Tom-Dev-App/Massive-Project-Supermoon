import React from "react";
import { RiInstagramFill, RiPinterestFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-primary-pressed text-center text-neutral-10 lg:text-left font-productSans px-9 lg:px-24 py-12 gap-12">
        <div className="flex p-6 justify-between gap-6">
          <div className="flex flex-row gap-2 lg:gap-4">
            <Link
              to="/tentangkami"
              className="lg:text-base text-sm block text-neutral-10"
            >
              Tentang Kami
            </Link>
            <Link
              to="/kontak"
              className="lg:text-base text-sm block text-neutral-10"
            >
              Kontak
            </Link>
          </div>
          <div className="flex gap-2 lg:gap-3">
            <a href="#" target="_blank">
              <RiInstagramFill className="lg:w-8 lg:h-8 w-6 h-6 text-[#D0EBE3]" />
            </a>
            <a href="#" target="_blank">
              <FaTwitter className="lg:w-8 lg:h-8 w-6 h-6 text-[#D0EBE3]" />
            </a>
            <a href="#" target="_blank">
              <RiPinterestFill className="lg:w-8 lg:h-8 w-6 h-6 text-[#D0EBE3]" />
            </a>
          </div>
        </div>
        <div className="border-b border-primary-surface w-11/12 mx-auto"></div>
        <p className="flex text-sm justify-center text-white py-4">
          kuningantour.com @2023 All rights reserved
        </p>

        <div className="mx-6 py-10 text-center md:text-left"></div>
      </footer>
    </>
  );
};

export default Footer;

import React from "react";
import Wisata from "../../assets/images/profile/gunung-ciremai.png";
import { Link } from "react-router-dom";

const CardRiwayat = () => {
  return (
    <>
      <div className="p-4">
        <div className="w-full bg-neutral-card rounded-lg drop-shadow-xl">
          <img className="rounded-lg w-full" src={Wisata} alt="image" />
          <div className="p-5">
            <h5 className="mb-2 lg:text-xl text-base font-bold tracking-tight text-gray-900">
              Gunung Ciremai
            </h5>
            <p className="lg:text-base text-sm">
              Paket Wisata Exclusive di Kabupaten Kuningan - Kuningantour.com
            </p>
            <div className="flex flex-row justify-end p-3">
              <Link className="flex items-center px-3 py-1 lg:px-4 lg:py-2 lg:text-base text-sm  text-center text-primary-main border-solid border-2 border-primary-main bg-primary-surface rounded-lg">
                Detail Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardRiwayat;

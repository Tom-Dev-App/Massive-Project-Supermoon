import React from "react";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Wisata from "../../assets/images/profile/gunung-ciremai.png";

const CardProfile = () => {
  return (
    <>
      <div className="p-4">
        <div className="w-full bg-neutral-card rounded-lg drop-shadow-xl">
          <img className="rounded-lg w-full" src={Wisata} alt="image" />
          <div className="p-5">
            <h5 className="mb-2 lg:text-xl text-base font-bold tracking-tight text-gray-900">
              Gunung Ciremai
            </h5>
            <div className="flex flex-row gap-3">
              <a href="#" className="text-primary-pressed lg:text-base text-sm">
                #Alam
              </a>
              <a href="#" className="text-primary-pressed lg:text-base text-sm">
                #Gunung
              </a>
              <a href="#" className="text-primary-pressed lg:text-base text-sm">
                #Wisata
              </a>
            </div>
            <div className="flex flex-row justify-between p-3">
              <div className="flex flex-row">
                <BsStarFill
                  className="lg:w-10 lg:h-10 w-8 h-8"
                  fill="#FFA41B"
                />
                <div className="ml-3">
                  <p className="lg:text-sm text-xs font-bold">4.9</p>
                  <p className="lg:text-sm text-xs">1.2k reviews</p>
                </div>
              </div>
              <Link className="flex items-center px-2 lg:px-4 lg:py-2 lg:text-base text-sm  text-center text-primary-main border-solid border-2 border-primary-main bg-primary-surface rounded-lg">
                Detail
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProfile;

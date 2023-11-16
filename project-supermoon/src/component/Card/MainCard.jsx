import React from "react";
import Wisata from "../../assets/cibulan.jpg";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const MainCard = () => {
  return (
    <>
      <div className="p-4">
        <div className="w-[328px] bg-neutral-card rounded-lg drop-shadow-xl">
          <a href="#">
            <img class="rounded-t-lg" src={Wisata} alt="image" />
          </a>
          <div className="p-5">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              Lorem ipsum dolor sit amet.
            </h5>
            <div className="flex flex-row gap-3">
              <a href="#" className="text-primary-pressed">
                #kategori
              </a>
              <a href="#" className="text-primary-pressed">
                #kategori
              </a>
              <a href="#" className="text-primary-pressed">
                #kategori
              </a>
            </div>
            <div className="flex flex-row justify-between p-3">
              <div className="flex flex-row">
                <BsStarFill className="w-10 h-10" fill="#ffe234" />
                <div className="ml-3">
                  <p className="text-sm font-bold">4.9</p>
                  <p className="text-sm">1.200 review</p>
                </div>
              </div>
              <Link className="inline-flex items-center px-4 py-2 text-[16px]  text-center text-primary-main border-solid border-2 border-primary-main bg-primary-surface rounded-lg">
                Detail
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainCard;

import React, { useState,useEffect } from "react";
import data from "../../utils/constants/PackageTours";
import CardPackage from "../CardPackage/CardPackage";
import { Link } from "react-router-dom";
import axios from 'axios';
import { BsStarFill } from "react-icons/bs";
import config from "../../config";


const PackageCard = () => {
  const [packageTours, setPackageTours] = useState(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL ?? 'localhost:8000/api/'}tour-packets/three`);
        console.log(allData.data);
        setPackageTours(() => allData.data.data ?? []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="py-6 font-productSans">
        <h3 className="lg:text-[40px] text-2xl font-bold flex items-center justify-center">
          Paket Wisata
        </h3>
               <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row justify-evenly mt-10 items-center">
          {packageTours.map((t) => (
            <div key={t?.slug ?? t?.title ?? t.id} className="p-4 font-productSans">
              <div className="w-[328px] bg-neutral-card rounded-lg drop-shadow-xl">
                <img
                  src={`${import.meta.env.VITE_APP_SERVER_URL ?? 'localhost:8000/api/'}{t?.image}`}
                  alt="image"
                />
                <div className="p-5">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                    {t?.title}
                  </h5>
                  <div className="flex flex-row gap-2">
                    <span className="text-primary-pressed">
                      {t?.categories ?? 'Alam, Outdoor, Camping'}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between p-3">
                    <div className="flex flex-row">
                      <BsStarFill className="w-10 h-10" fill="#EE9C22" />
                      <div className="ml-4">
                        <p className="text-sm font-bold">{parseInt(t?.average_rating) ?? 0}</p>
                        <p className="text-sm text-neutral-70">
                          {t?.review ?? 0} Reviews
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/dashboard/paket-wisata/detil/${t?.slug}`}
                      className="inline-flex items-center px-4 py-2 text-[16px] text-center text-primary-main border-solid border-2 border-primary-main bg-primary-surface rounded-lg"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center mt-4">
          <Link
            to="/paket-wisata"
            className="px-4 py-2 gap-1 bg-primary-main rounded-lg text-xl text-neutral-10  flex items-center justify-center"
          >
            Tampilkan Lebih Banyak
          </Link>
        </div>
         </div>
      </div>
    </>
  );
};

export default PackageCard;

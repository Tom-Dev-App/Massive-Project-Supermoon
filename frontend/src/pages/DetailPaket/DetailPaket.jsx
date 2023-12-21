import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { FaToilet } from "react-icons/fa";
import { MdMuseum } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { FaLandmarkFlag } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import { GiChickenOven } from "react-icons/gi";
import { GiSadCrab } from "react-icons/gi";
import { FaGlassWater } from "react-icons/fa6";
import { MdHotel } from "react-icons/md";
import { FaCoffee } from "react-icons/fa";
import { FaPersonSwimming } from "react-icons/fa6";
import { GiHotSurface } from "react-icons/gi";
import { Link } from "react-router-dom";

const DetailPaket = () => {
  const [packageTours, setPackageTours] = useState({});
  console.log(packageTours);
  return (
    <>
      <Navbar />
      <div className="font-productSans">
        <div className="lg:px-16 px-4 flex flex-col gap-8 py-6 lg:py-24">
          <div className="grid grid-flow-col grid-rows-2 gap-3">
            <img
              src={``}
              alt="Image-1"
              className="w-full rounded-lg object-cover row-span-2 h-full"
            />
            <img
              src={``}
              alt="Image-2"
              className="w-full rounded-lg object-cover"
            />
            <img
              src={``}
              alt="Image-3"
              className="w-full rounded-lg object-cover"
            />
            <img
              src={``}
              alt="Image-4"
              className="w-full rounded-lg object-cover row-span-2 h-full"
            />
          </div>
          <div className="flex lg:flex-row gap-8 flex-col">
            <div className="flex flex-col gap-8 flex-[2_2_0%]">
              <div className="flex flex-col gap-6 col-span-2">
                <div className="flex lg:flex-row flex-col justify-between gap-8">
                  <h2 className="text-primary-main uppercase font-bold lg:text-[48px] text-2xl">
                    {packageTours[0].title ?? "Title"}
                  </h2>
                </div>
              </div>
              <div className="flex flex-col gap-8 col-span-2">
                <p className="lg:text-base text-sm">
                  {packageTours[0].description ?? "Deskripsi"}
                </p>
              </div>
              <div className="flex flex-col gap-8 col-span-2">
                <h3 className="lg:text-[40px] font-bold text-primary-main text-[20px]">
                  Wisata
                </h3>
                <p>Gedung Lingarjati</p>
                <a href="#" target="_blank" className="text-neutral-60">
                  Lihat Maps
                </a>
                <div className="flex flex-col lg:flex-row gap-32">
                  <div className="flex  items-center gap-3">
                    <MdMuseum className="w-10 h-10" />
                    <p className="text-neutral-60">Museum</p>
                  </div>
                  {/* GANTI DENGAN FACILITY LIST KOMPONEN */}
                </div>
              </div>
              <div className="flex flex-col gap-8 col-span-2">
                <h3 className="lg:text-[40px] font-bold text-primary-main text-[20px]">
                  Kuliner
                </h3>
                <p>Resto Grage Lanai Sangkanhurip</p>
                <a href="#" target="_blank" className="text-neutral-60">
                  Lihat Maps
                </a>
                <div className="flex flex-col lg:flex-row gap-32">
                  {/* GANTI DENGAN KOMPONEN FASILITAS */}
                  <div className="flex items-center gap-3">
                    <FaToilet className="w-10 h-10" />
                    <p className="text-neutral-60">Toilet</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8 col-span-2">
                <h3 className="lg:text-[40px] font-bold text-primary-main text-[20px]">
                  Penginapan
                </h3>
                <p>Hotel Grage Sangkanhurip</p>
                <a href="#" target="_blank" className="text-neutral-60">
                  Lihat Maps
                </a>
                <div className="flex flex-col lg:flex-row gap-32">
                  {/* GANTI DENGAN KOMPONEN FASILITAS */}
                  <div className="flex items-center gap-3">
                    <FaToilet className="w-10 h-10" />
                    <p className="text-neutral-60">Toilet</p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex flex-col gap-6  flex-1">
              <div className="flex gap-3">
                <FaStar fill="#EE9C22" className="w-[50px] h-[53px]" />
                <div>
                  <h4 className="lg:text-[32px] text-[16px]  font-bold">
                    {packageTours[0].rating ?? ""}
                  </h4>
                  <p className="text-neutral-60 lg:text-base text-sm">
                    {packageTours[0].review ?? `NULL`} reviews
                  </p>
                  <p className="text-neutral-60">
                    {packageTours[0].category ?? `NULL`}
                  </p>
                  <h5 className="font-bold lg:text-2xl text-xl">
                    {packageTours[0].price ?? `NULL`}
                  </h5>
                </div>
              </div>
              <Link
                to="/checkout"
                className="w-full text-center py-2 bg-primary-surface border-2 rounded-lg border-primary-main"
              >
                Beli
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h3 className="lg:text-[40px] font-bold text-primary-main text[20px]">
              Komentar
            </h3>
            <div className="py-1 grid lg:grid-cols-2 grid-cols-1 gap-3">
              <div className="flex flex-col w-full shadow-md rounded-lg p-3 gap-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img src={``} alt="profile" />
                    <div>
                      <p className="lg:text-base text-sm font-bold">
                        {packageTours[0].komentar[0].nama`NAMA`}
                      </p>
                      <p className="lg:text-sm text-xs">
                        {packageTours[0].komentar[0].waktu`NAMA`}
                      </p>
                    </div>
                  </div>
                  <div className="h-fit px-4 py-2 bg-primary-surface rounded-lg flex justify-center items-center gap-1">
                    <FaStar fill="#149B76" />
                    <FaStar fill="#149B76" />
                    <FaStar fill="#149B76" />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
                <p className="lg:text-base text-sm px-[10px] line-clamp-3">
                  {packageTours[0].komentar[0].description ?? `NULL`}
                </p>
              </div>
              <div className="flex flex-col w-full shadow-md rounded-lg p-3 gap-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img src={``} alt="profile" />
                    <div>
                      <p className="lg:text-base text-sm font-bold">
                        {packageTours[0].komentar[0].nama ?? `NULL`}
                      </p>
                      <p className="lg:text-sm text-xs">
                        {packageTours[0].komentar[0].waktu ?? `NULL`}
                      </p>
                    </div>
                  </div>
                  <div className="h-fit px-4 py-2 bg-primary-surface rounded-lg flex justify-center items-center gap-1">
                    <FaStar fill="#149B76" />
                    <FaStar fill="#149B76" />
                    <FaStar fill="#149B76" />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
                <p className="lg:text-base text-sm px-[10px] line-clamp-3">
                  {packageTours[0].komentar[0].description ?? `NULL`}
                </p>
              </div>
            </div>
            <div className="py-1 grid lg:grid-cols-1 gap-3">
              <div className="w-full shadow-md rounded-lg p-3 gap-3">
                <div className="flex items-center gap-3 py-3">
                  <img src={`NULL`} alt="" />
                  <p className="font-bold">Arin</p>
                </div>
                <input
                  type="text"
                  className="w-full border border-neutral-50 rounded-md px-2 py-3"
                />
                <div className="py-3">
                  <div className="w-36 px-4 py-2 bg-primary-surface rounded-lg flex justify-start items-center gap-3">
                    <FaStar className="hover:fill-primary-main" />
                    <FaStar className="hover:fill-primary-main" />
                    <FaStar className="hover:fill-primary-main" />
                    <FaStar className="hover:fill-primary-main" />
                    <FaStar className="hover:fill-primary-main" />
                  </div>
                </div>
                <div className="py-3">
                  <div className="flex gap-3 justify-end">
                    <button className="px-4 py-2 border bg-primary-surface text-primary-main rounded-lg">
                      Batal
                    </button>
                    <button className="px-4 py-2 bg-primary-main text-white rounded-lg">
                      Kirim
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailPaket;

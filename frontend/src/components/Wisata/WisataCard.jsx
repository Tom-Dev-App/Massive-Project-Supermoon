import React, { useState, useEffect } from "react";
import { BsStarFill } from "react-icons/bs";
import Card from "../Card/Card";
import data from "../../utils/constants/Data";
import { Link } from "react-router-dom";
import axios from 'axios';

const WisataCard = () => {
  const [tours, setTours] = useState([]);
  const [packets, setPackets] =useState([])

  // WISATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await axios.get(`http://localhost:8000/api/tours/three`);
        console.log(allData.data);
        setTours(() => allData.data.data ?? []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

// PAKET WISATA
useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await axios.get(`http://localhost:8000/api/tour-packets/three`);
        console.log(allData.data);
        setPackets(() => allData.data.data ?? []);
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
          Wisata Yang Tersedia
        </h3>
        <div className="flex flex-col lg:flex-row justify-evenly mt-10 items-center">

          {tours.map((t) => (
            <div key={t?.slug ?? t?.title ?? t.id} className="p-4 font-productSans">
              <div className="w-[328px] bg-neutral-card rounded-lg drop-shadow-xl">
                <img
                  src={`http://localhost:8000${t?.image}`}
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
                      to={`/dashboard/wisata/detil/${t?.slug}`}
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
              to="/wisata"
              className="px-4 py-2 gap-1 bg-primary-main rounded-lg text-xl text-neutral-10  flex items-center justify-center"
            >
              Tampilkan Lebih Banyak
            </Link>
          </div>
      </div>
    </>
  );
};

export default WisataCard;

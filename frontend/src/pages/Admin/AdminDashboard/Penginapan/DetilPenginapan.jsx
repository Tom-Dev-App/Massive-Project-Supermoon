import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../../components/Navbar/Navbar";
import Footer from "../../../../components/Footer/Footer";
import axios from "axios";
import FacilityList from "../../../../components/Facility/FacilityList";

import { ROLES } from "../../../../constants";
import useAuth from "../../../../hooks/useAuth";
// FROM OLD
// import data from "../../../../utils/constants/Data";
import imgLokasi from "../../../../assets/images/DetailWisata/DetailWisata-1/lokasi.png";
// import imgAvatar from "../../../../assets/images/DetailWisata/DetailWisata-1/avatar.png";
// import imgProfile from "../../../../assets/images/DetailWisata/DetailWisata-1/profile.png";

import dataFood from "../../../../utils/constants/Kuliner";
import dataLodge from "../../../../utils/constants/Penginapan";
import iconStrangerp from "../../../../assets/images/DetailPenginapan/avatar_Stranger.png";
import iconPersonap from "../../../../assets/images/DetailPenginapan/avatar_Persona.png";

const DetilPenginapan = () => {
  const { auth, setAuth } = useAuth();
  const ADMIN = auth.roles.includes(ROLES.ADMIN);
  const CLIENT = auth.roles.includes(ROLES.CLIENT);
  const [inn, setInn] = useState({});
  const [facilities, setFacilities] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/lodgings/slug/${slug}`
        );

        const data = response.data.data;
        console.log("data", data);

        // Update state with the fetched data
        setInn(data);
        setImages(data.images ?? []);
        setFacilities(data.facilities ?? []);
        setReviews(data.reviews ?? []);
      } catch (error) {
        console.error(error);
      }
    };

    // Immediately invoke the fetchData function
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="font-productSans">
        <div className="lg:px-16 px-4 flex flex-col gap-8 py-6 lg:py-24">
          <div className="grid grid-rows-1 gap-3">
            <img
              src={`http://localhost:8000${images[0]?.img_path}`}
              alt="Grage Sangkan Hotel"
              className="w-full rounded-lg object-cover row-span-2 h-full"
            />
          </div>
          <div className="flex lg:flex-row gap-8 flex-col">
            <div className="flex flex-col gap-8 flex-[2_2_0%] ">
              <div className="flex flex-col gap-6 col-span-2 ">
                <div className="flex lg:flex-row flex-col justify-between gap-8">
                  <h2 className="text-primary-main uppercase font-bold lg:text-[48px] text-2xl">
                    {inn.title ?? "JUDUL"}
                  </h2>
                  <div className="flex gap-3 justify-start items-center">
                    <FaStar fill="#EE9C22" className="w-[50px] h-[53px]" />
                    <div>
                      <h4 className="lg:text-[32px] text-[16px]  font-bold">
                        {parseInt(inn?.average_rating) ?? 0}
                      </h4>
                      <p className="text-neutral-60 lg:text-base text-sm">
                        {inn.reviews?.length ?? 0} reviews
                      </p>
                    </div>
                  </div>
                </div>
                {/* FACILITY */}
                <div className="grid lg:grid-cols-4 grid-cols-2"></div>
                {/* END FACILITY */}
              </div>
              <div className="flex flex-col gap-8 col-span-2">
                <h3 className="lg:text-[40px] font-bold text-primary-main text-[20px]">
                  Deskripsi
                </h3>
                {/* DESCRP */}
                <p className="lg:text-base text-sm">{inn.description}</p>
              </div>
              <div className="flex flex-col gap-8 col-span-2">
                <h3 className="lg:text-[40px] font-bold text-primary-main text-[20px]">
                  Tiket & Jam Operasional
                </h3>
                <ul className="list-disc px-5 lg:text-base text-sm">
                  {/* TICKET OPERASIONAL */}
                  <li>
                    {inn.ticket_operasional ?? "HARGA DAN JAM OPERASIONAL"}
                  </li>
                </ul>
              </div>
            </div>
            <div className=" flex flex-col gap-[20px] flex-1">
              <img src={imgLokasi} alt="" />
              {/* LOCATION DETAIL */}
              <p className="lg:text-base text-sm">{inn.address ?? "ALAMAT"}</p>
              {/* LOCATION LINK */}
              <a
                href={`${inn.address_link}`}
                target="_blank"
                className="text-neutral-60 lg:text-base text-sm"
              >
                Lihat Maps
              </a>
            </div>
          </div>
          {/* comments */}
          <div className="flex flex-col gap-8">
            <h3 className="lg:text-[40px] font-bold text-primary-main text[20px]">
              Komentar
            </h3>
            <div className="py-1 grid lg:grid-cols-2 grid-cols-1 gap-3">
              <div className="flex flex-col w-full shadow-md rounded-lg p-3 gap-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img src={iconStrangerp} alt="profile" />
                    <div>
                      <p className="lg:text-base text-sm font-bold">
                        Salsabila Abadi
                      </p>
                      <p className="lg:text-sm text-xs">Agustus 2023</p>
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
                  Kamar yang saya tempati sangat bersih dan nyaman. Desain
                  interior modern dan perabotan yang elegan menciptakan atmosfer
                  yang menyenangkan. Kasur yang empuk memberikan kualitas tidur
                  yang baik, dan kamar mandi dilengkapi dengan perlengkapan yang
                  lengkap.
                </p>
              </div>
              <div className="flex flex-col w-full shadow-md rounded-lg p-3 gap-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img src={iconStrangerp} alt="profile" />
                    <div>
                      <p className="lg:text-base text-sm font-bold">
                        Farah Nabila
                      </p>
                      <p className="lg:text-sm text-xs">Oktober 2023</p>
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
                  Secara keseluruhan, saya merekomendasikan Hotel ini untuk para
                  wisatawan yang mencari pengalaman menginap yang menyenangkan
                  dan layanan yang berkualitas. Saya pasti akan kembali menginap
                  di sini pada kunjungan berikutnya.
                </p>
              </div>
            </div>
            <div className="py-1 grid lg:grid-cols-1 gap-3">
              <div className="w-full shadow-md rounded-lg p-3 gap-3">
                <div className="flex items-center gap-3 py-3">
                  <img src={iconPersonap} alt="" />
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

export default DetilPenginapan;

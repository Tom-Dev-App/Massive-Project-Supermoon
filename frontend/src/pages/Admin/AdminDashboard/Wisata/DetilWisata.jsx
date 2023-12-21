import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../../components/Navbar/Navbar";
import Footer from "../../../../components/Footer/Footer";
import axios from "axios";
import FacilityList from "../../../../components/Facility/FacilityList";
import data from "../../../../utils/constants/PackageTours";
import AllPaketWisata from "../../../../components/AllPaketWisata/AllPaketWisata";
import { ROLES } from "../../../../constants";
import useAuth from "../../../../hooks/useAuth";
// FROM OLD
// import data from "../../../../utils/constants/Data";
import imgLokasi from "../../../../assets/images/DetailWisata/DetailWisata-1/lokasi.png";
import imgAvatar from "../../../../assets/images/DetailWisata/DetailWisata-1/avatar.png";
import imgProfile from "../../../../assets/images/DetailWisata/DetailWisata-1/profile.png";
import {
  FaToilet,
  FaParking,
  FaBuilding,
  FaSwimmingPool,
  FaCampground,
} from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { MdMosque } from "react-icons/md";
import { GiFlyingFox } from "react-icons/gi";
import CardKuliner from "../../../../components//CardKuliner/CardKuliner";
import dataFood from "../../../../utils/constants/Kuliner";
import dataLodge from "../../../../utils/constants/Penginapan";
import CardPenginapan from "../../../../components/CardPenginapan/CardPenginapan";
import splitComa from "../../../../utils/SplitComaToArray";
import { BsStarFill } from "react-icons/bs";

const DetilWisata = () => {
  // FROM OLD
  const [culinars, setCulinars] = useState(dataFood);
  const [lodges, setLodges] = useState(dataLodge);
  const [TOURS, SETTOURS] = useState(data);
  const [packageTours, setPackageTours] = useState(data);
  const { auth, setAuth } = useAuth();
  const ADMIN = auth.roles.includes(ROLES.ADMIN);
  const CLIENT = auth.roles.includes(ROLES.CLIENT);
  const [tourData, setTourData] = useState({});
  const [facilities, setFacilities] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const { slug } = useParams();

  const [inns, setInns] = useState([]);
  const [culinaries, setCulinaries] = useState([]);

  // REKOMENDASI KULINER
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/culinaries/all`
        );
        //console.log(response.data?.data ?? []);
        setCulinaries(response.data?.data ?? []);
      } catch (error) {}
    }
    fetchData();
  }, []);

  // REKOMENDASI PENGINAPAN
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/lodgings/all`
        );
        //console.log(response.data?.data ?? []);
        setInns(response.data?.data ?? []);
      } catch (error) {}
    }
    fetchData();
  }, []);

// REKOMENDASI KULINER
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/culinaries/all`
        );
        //console.log(response.data?.data ?? []);
        setCulinaries(response.data?.data ?? []);
      } catch (error) {}
    }
    fetchData();
  }, []);


  // WISATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/tours/slug/${slug}`
        );

        const fetchingData = response.data.data;
        // Update state with the fetched data
        setTourData(fetchingData);
        setImages(fetchingData.images ?? []);
        setFacilities(fetchingData.facilities ?? []);
        setReviews(fetchingData.reviews ?? []);
      } catch (error) {
        console.error("Fetch data error:", error);
      }
    };

  
    fetchData();
  }, []);





  // useEffect(() => {
  //   console.log("Updated state:", tourData);
  // }, [tourData]);

  return (
    <>
      <Navbar />
      <div className="font-productSans">
        <div className="lg:px-16 px-4 flex flex-col gap-8 py-6 lg:py-24">
          <div className="grid grid-flow-col grid-rows-2 gap-3">
            <img
              src={`http://localhost:8000${images[0]?.img_path}`}
              alt={""}
              className="w-full rounded-lg object-cover row-span-2 h-full"
            />
            <img
              src={`http://localhost:8000${images[1]?.img_path}`}
              alt={""}
              className="w-full rounded-lg object-cover"
            />
            <img
              src={`http://localhost:8000${images[2]?.img_path}`}
              className="w-full rounded-lg object-cover"
            />
            <img
              src={`http://localhost:8000${images[3]?.img_path}`}
              className="w-full rounded-lg object-cover row-span-2 h-full"
            />
          </div>
          <div className="flex lg:flex-row gap-8 flex-col">
            <div className="flex flex-col gap-8 flex-[2_2_0%] ">
              <div className="flex flex-col gap-6 col-span-2 ">
                <div className="flex lg:flex-row flex-col justify-between gap-8">
                  <h2 className="text-primary-main uppercase font-bold lg:text-[48px] text-2xl">
                    {tourData.title ?? "JUDUL"}
                  </h2>
                  {/*REVIEWS AND CATEGORIES*/}
                  <div className="flex gap-3 justify-start items-center">
                    <FaStar fill="#EE9C22" className="w-[50px] h-[53px]" />
                    <div>
{/*                      <h4 className="lg:text-[32px] text-[16px]  font-bold">
                        {tourData.categories ?? 0}
                      </h4>*/}
                    <p className="font-bold lg:text-12 text-sm md:text-base">
                        {tourData?.rating ?? 0}
                      </p>
                      <p className="text-neutral-60 lg:text-base text-sm">
                        {tourData.reviews?.length ?? 0} reviews
                      </p>
                    </div>
                  </div>
                </div>
                {/* FACILITY */}
                <div className="grid lg:grid-cols-4 grid-cols-2"></div>
                {/* END FACILITY */}
                <FacilityList facilities={facilities} />
              </div>
              <div className="flex flex-col gap-8 col-span-2">
                <h3 className="lg:text-[40px] font-bold text-primary-main text-[20px]">
                  Deskripsi
                </h3>
                {/* DESCRP */}
                <p className="lg:text-base text-sm">{tourData.description}</p>
              </div>
              <div className="flex flex-col gap-8 col-span-2">
                <h3 className="lg:text-[40px] font-bold text-primary-main text-[20px]">
                  Tiket & Jam Operasional
                </h3>
                <ul className="list-disc px-5 lg:text-base text-sm">
                  {/* TICKET OPERASIONAL */}
                  <li>
                    {tourData.ticket_operasional ?? "HARGA DAN JAM OPERASIONAL"}
                  </li>
                </ul>
              </div>
            </div>
            <div className=" flex flex-col gap-[20px] flex-1">
              <img src={imgLokasi} alt="" />
              {/* LOCATION DETAIL */}
              <p className="lg:text-base text-sm">
                {tourData.address ?? "ALAMAT"}
              </p>
              {/* LOCATION LINK */}
              <a
                href={`${tourData.address_link}`}
                target="_blank"
                className="text-neutral-60 lg:text-base text-sm"
              >
                Lihat Maps
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {/* COMMENT */}
            <h3 className="lg:text-[40px] font-bold text-primary-main text[20px]">
              Komentar
            </h3>
            <div className="py-1 grid lg:grid-cols-2 grid-cols-1 gap-3">
              <div className="flex flex-col w-full shadow-md rounded-lg p-3 gap-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img src={imgAvatar} alt="profile" />
                    <div>
                      <p className="lg:text-base text-sm font-bold">
                        {TOURS[0].komentar[0].nama}
                      </p>
                      <p className="lg:text-sm text-xs">
                        {TOURS[0].komentar[0].waktu}
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
                  {TOURS[0].komentar[0].description}
                </p>
              </div>
              <div className="flex flex-col w-full shadow-md rounded-lg p-3 gap-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img src={imgAvatar} alt="profile" />
                    <div>
                      <p className="lg:text-base text-sm font-bold">
                        {TOURS[0].komentar[0].nama}
                      </p>
                      <p className="lg:text-sm text-xs">
                        {TOURS[0].komentar[0].waktu}
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
                  {TOURS[0].komentar[0].description}
                </p>
              </div>
            </div>
            <div className="py-1 grid lg:grid-cols-1 gap-3">
              <div className="w-full shadow-md rounded-lg p-3 gap-3">
                <div className="flex items-center gap-3 py-3">
                  <img src={imgProfile} alt="" />
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
          {/* rekomendasi penginapan */}
          <div>
            <h3 className="text-[40px] font-bold text-primary-main">
              Rekomendasi Penginapan
            </h3>
            <div className="flex flex-col lg:flex-row justify-between mt-10 items-center">
              {/* CARDS */}
              {inns.map((inn) => {
                return (
                  <>
                    <div className="p-4 font-productSans">
                      <div className="p-4 font-productSans">
                        <div className="w-[328px] bg-neutral-card rounded-lg drop-shadow-xl">
                          <img
                            className="rounded-t-lg mx-auto object-cover w-full"
                            src={`http://localhost:8000${inn?.image}`}
                            alt="image"
                          />
                          <div className="p-5">
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                              {inn?.title}
                            </h5>
                            <div className="flex flex-row gap-2">
                              <span className="text-primary-pressed">
                                {splitComa(inn?.categories)[0] ?? 'Bervariasi'}
                              </span>
                              <span className="text-primary-pressed">
                                {splitComa(inn?.categories)[1] ?? 'Sesuai Budget'}
                              </span>
                              <span className="text-primary-pressed">
                                {splitComa(inn?.categories)[2] ?? 'Pasti Nyaman'}
                              </span>
                            </div>
                            <div className="flex flex-row justify-between p-3">
                              <div className="flex flex-row">
                                <BsStarFill
                                  className="w-10 h-10"
                                  fill="#EE9C22"
                                />
                                <div className="ml-4">
                                  <p className="text-sm font-bold">
                                    {parseInt(inn?.average_rating) ?? 0}
                                  </p>
                                  <p className="text-sm text-neutral-70">
                                    {inn?.review ?? 0} Reviews
                                  </p>
                                </div>
                              </div>
                              <Link
                                to={`/dashboard/penginapan/detil/${inn?.slug}`}
                                className="inline-flex items-center lg:px-4  px-2 lg:py-2 lg:text-[16px] text-[14px] text-center text-primary-main border-solid border-2 border-primary-main bg-primary-surface rounded-lg
"
                              >
                                Detail
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
              {/* END CARDS */}
            </div>
          </div>
          {/* rekomendasi kuliner */}
 {/* CARDS */}
              {culinaries.map((cul) => {
                return (
                  <>
                    <div className="p-4 font-productSans">
                      <div className="p-4 font-productSans">
                        <div className="w-[328px] bg-neutral-card rounded-lg drop-shadow-xl">
                          <img
                            className="rounded-t-lg mx-auto object-cover w-full"
                            src={`http://localhost:8000${cul?.image}`}
                            alt="image"
                          />
                          <div className="p-5">
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                              {cul?.title}
                            </h5>
                            <div className="flex flex-row gap-2">
                              <span className="text-primary-pressed">
                                {splitComa(cul?.categories)[0] ?? 'Lezat'}
                              </span>
                              <span className="text-primary-pressed">
                                {splitComa(cul?.categories)[1] ?? 'Nyaman'}
                              </span>
                              <span className="text-primary-pressed">
                                {splitComa(cul?.categories)[2] ?? 'Khas'}
                              </span>
                            </div>
                            <div className="flex flex-row justify-between p-3">
                              <div className="flex flex-row">
                                <BsStarFill
                                  className="w-10 h-10"
                                  fill="#EE9C22"
                                />
                                <div className="ml-4">
                                  <p className="text-sm font-bold">
                                    {parseInt(cul?.average_rating) ?? 0}
                                  </p>
                                  <p className="text-sm text-neutral-70">
                                    {cul?.review ?? 0} Reviews
                                  </p>
                                </div>
                              </div>
                              <Link
                                to={`/dashboard/kuliner/detil/${cul?.slug}`}
                                className="inline-flex items-center lg:px-4  px-2 lg:py-2 lg:text-[16px] text-[14px] text-center text-primary-main border-solid border-2 border-primary-main bg-primary-surface rounded-lg
"
                              >
                                Detail
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
              {/* END CARDS */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetilWisata;

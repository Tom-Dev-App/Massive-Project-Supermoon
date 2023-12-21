import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import data from "../../utils/constants/Data";
import CardWisata from "../../components/CardWisata/CardWisata";
import AuthNavbar from "../../components/Navbar/AuthNavbar";
import { Link } from "react-router-dom";
import { BsFillStarFill } from "react-icons/bs";
import axios from "axios";

const Wisata = () => {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/tours/data/all`
        );
        // console.log("TOURS", response.data ?? []);
        setTours(response.data?.data ?? []);
      } catch (error) {}
    }
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="font-productSans py-6 px-6">
        <div className=" flex justify-center mt-10">
          <div className="flex rounded-full bg-primary-surface w-[544px] h-[60px]">
            <div className="bg-primary-main text-white w-full rounded-full flex justify-center">
              <Link to="/wisata" className="flex items-center">
                Wisata
              </Link>
            </div>
            <div className="text-center bg-primary-surface text-primary-main w-full rounded-full flex justify-center">
              <Link to="/paket-wisata" className="flex items-center">
                Paket Wisata
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center py-6">
            <h3 className="lg:text-[40px] text-2xl mb-3 font-bold">Wisata</h3>
            <p className="text-neutral-100 lg:text-base text-sm">
              "Temukan keajaiban alam dan warisan budaya tersembunyi Kabupaten
              Kuningan dengan kami, dan buat setiap momen <br /> perjalanan Anda
              menjadi pengalaman yang tak terlupakan."
            </p>
          </div>
          <div>
            <div className="flex flex-wrap justify-evenly gap-7">
              {/* cards */}
            <div className="grid gap-8 lg:gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => {
                return (
                  <div className="p-4 font-productSans" key={tour?.title ?? ""}>
                    <div className="w-full bg-neutral-card rounded-lg drop-shadow-xl">
                      <img
                        className="rounded-t-lg aspect-square object-fill"
                        src={`http://localhost:8000${tour?.image}` ?? ""}
                        alt={""}
                      />
                      <div className="p-5">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-neutral-100">
                          {tour?.title ?? ""}
                        </h5>
                        <div className="flex flex-row gap-3">
                          <a className="text-primary-pressed">
                            {tour?.categories}
                          </a>
                        </div>
                        <div className="flex flex-row justify-between p-3">
                          <div className="flex flex-row">
                            <BsFillStarFill
                              className="w-10 h-10"
                              fill="#EE9C22"
                            />
                            <div className="ml-4">
                              <p className="text-sm font-bold">
                                {parseInt(tour?.average_rating) ?? ""}
                              </p>
                              <p className="text-sm">
                                {tour?.review_count ?? 0} Reviews
                              </p>
                            </div>
                          </div>
                          <Link
                            to={`/dashboard/wisata/detil/${tour?.slug}`}
                            className="inline-flex items-center lg:px-4  px-2 lg:py-2 lg:text-[16px] text-[14px] text-center text-primary-main border-solid border-2 border-primary-main bg-primary-surface rounded-lg"
                          >
                            Detail
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wisata;

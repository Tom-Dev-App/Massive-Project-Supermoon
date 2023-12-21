import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import data from "../../utils/constants/Data";
import CardWisata from "../../components/CardWisata/CardWisata";
import AuthNavbar from "../../components/Navbar/AuthNavbar";
import { Link } from "react-router-dom";

const Wisata = () => {
  const [tours, setTours] = useState(data);
  return (
    <>
      <Navbar />
      <div className="font-productSans py-6">
        <div className=" flex justify-center mt-10">
          <div className="flex rounded-full bg-primary-surface w-[544px] h-[60px]">
            <div className="bg-primary-main text-white w-full rounded-full flex justify-center">
              <Link to="/wisata" className="flex items-center">
                Wisata
              </Link>
            </div>
            <div className="text-center bg-primary-surface text-primary-main w-full rounded-full flex justify-center">
              <Link to="/paketWisata" className="flex items-center">
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
              {tours.map((tour) => (
                <CardWisata key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wisata;

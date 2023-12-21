import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import data from "../../utils/constants/PackageTours";
import AllPaketWisata from "../../components/AllPaketWisata/AllPaketWisata";
import { Link } from "react-router-dom";

const PaketWisata = () => {
  const [packageTours, setPackageTours] = useState(data);
  return (
    <>
      <Navbar />
      <div className="font-productSans py-6">
        <div className=" flex justify-center mt-10">
          <div className="flex rounded-full bg-primary-surface w-[544px] h-[60px]">
            <div className=" bg-primary-surface text-primary-main w-full rounded-full flex justify-center">
              <Link to="/wisata" className="flex items-center">
                Wisata
              </Link>
            </div>
            <div className="bg-primary-main text-white w-full rounded-full flex justify-center">
              <Link to="/paketWisata" className="flex items-center">
                Paket Wisata
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center py-6">
            <h3 className="lg:text-[40px] text-2xl mb-3 font-bold">
              Paket Wisata
            </h3>
            <p className="text-neutral-100 lg:text-base text-sm">
              "Jadikan setiap momen tak terlupakan dengan paket wisata kami yang
              dirancang khusus untuk memberikan pengalaman <br /> wisata yang
              istimewa dan memenuhi semua harapan Anda."
            </p>
          </div>
          <div>
          <div className="grid gap-8 lg:gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-wrap justify-evenly gap-7">
              {packageTours.map((packageTour) => (
                <AllPaketWisata
                  key={packageTour.id}
                  packageTour={packageTour}
                />
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaketWisata;

import React from "react";
import imgHero from "../../assets/images/Beranda/hero.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <section className="mt-10 font-productSans">
        <div className="grid max-w-screen-xl px-9 lg:px-4 py-8 mx-auto lg:gap-4 xl:gap-0 lg:py-15 lg:grid-cols-12">
          <div className="mr-auto place-self-center  lg:col-span-7">
            <h2 className="text-2xl lg:text-5xl font-bold mb-4">
              Berwisata ke Kabupaten Kuningan Tanpa Ribet
            </h2>
            <p className="lg:text-base text-sm mb-4">
              Beragam destinasi wisata memanjakan mata dengan pesona alam yang
              asri dan tanpa perlu khawatir untuk mencari penginapan yang sesuai
              budget anda.
            </p>
            <Link
              to="/wisata"
              className="inline-flex items-center justify-center px-4 py-2 gap-1 mr-3 lg:text-base text-sm text-neutral-10 rounded-lg bg-primary-main"
            >
              Jelajahi Sekarang
            </Link>
          </div>
          <div className="flex-col mt-10 lg:mt-0 lg:col-span-5 lg:flex">
            <img src={imgHero} alt="Kabupaten Kuningan" className="w-full" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;

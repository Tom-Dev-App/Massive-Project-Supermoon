import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import imgkuningan from "../../assets/images/Kontak/kuningan.png";
import { CgMail } from "react-icons/cg";
import { SiGooglemaps } from "react-icons/si";

const Kontak = () => {
  return (
    <>
      <Navbar />
      <section class="lg:flex font-productSans px-24 gap-2">
        <div className="py-8">
          <div className="w-full h-full hidden lg:block">
            <img src={imgkuningan} alt="Logo" />
          </div>
        </div>
        <div class="py-8 px-4 mx-auto max-w-screen-md column-4">
          <h3 class="mb-3 text-[40px] tracking-tight font-bold text-neutral-100">
            Hubungi Kami
          </h3>
          <p class="mb-3 text-base text-neutral-100">
            Kami sangat menghargai setiap masukkan yang ada
          </p>
          <form class="space-y-3">
            <div>
              <input
                type="text"
                id="name"
                class="shadow border border-neutral-50 rounded-lg block w-full p-2.5"
                placeholder="Masukkan Nama Anda"
                required
              />
            </div>
            <div>
              <input
                type="email"
                id="email"
                class="shadow border border-neutral-50 rounded-lg block w-full p-2.5"
                placeholder="Masukkan Email Anda"
                required
              />
            </div>
            <div class="sm:col-span-2">
              <textarea
                id="message"
                rows="6"
                class="shadow border border-neutral-50 rounded-lg block w-full p-2.5"
                placeholder="Masukkan Pesan Anda"
              ></textarea>
            </div>
            <div className="sm:col-span-2 flex items-center gap-3">
              <input
                type="checkbox"
                id="check"
                className="shadow border border-neutral-100 w-6 h-6 rounded>"
              />
              <label htmlFor="check">
                Setuju untuk menerima email seputar informasi wisata di Kuningan
              </label>
            </div>
            <button
              type="submit"
              class="py-3 px-5 text-sm text-center text-white rounded-lg bg-primary-main block w-full"
            >
              Kirim
            </button>
          </form>
        </div>
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <div className="mt-5 block w-full">
            <h6 className="text-xl font-bold mb-3">Kontak Kami</h6>
            <div className="flex items-center gap-3 mb-3">
              <CgMail className="w-8 h-8" />
              <p className="text-base underline">kuningantour@gmail.com</p>
            </div>
            <div className="flex items-center gap-3">
              <SiGooglemaps className="w-8 h-8" />
              <p className="text-base">
                Digital Park, Sambau, Kecamatan Nongsa, Kota Batam, Kepulauan
                Riau 29466
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Kontak;

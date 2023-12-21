import React from "react";
import { FaStar } from "react-icons/fa6";
import Navbar from "../../components/Navbar/Navbar";
import { FaWifi } from "react-icons/fa";
import { MdMosque } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import Footer from "../../components/Footer/Footer";
import pictDetail from "../../assets/images/DetailKuliner/Grage lanai Resto.png";
import pictMaps from "../../assets/images/DetailKuliner/maps_grage lanai.png";
import iconStranger from "../../assets/images/DetailKuliner/avatar_Stanger.png";
import iconPersona from "../../assets/images/DetailKuliner/avatar_Persona.png";

const DetailKuliner = () => {
  return (
    <>
      <Navbar />
      <div className="font-productSans">
        <div className="lg:px-16 px-4 flex flex-col gap-8 py-6 lg:py-24">
          <div className="grid grid-rows-1 gap-3">
            <img
              src={pictDetail}
              alt="GRAGE LANAI RESTO"
              className="w-full rounded-lg object-cover row-span-2 h-full"
            />
          </div>
          <div className="flex lg:flex-row gap-8 flex-col">
            <div className="flex flex-col gap-8 flex-[2_2_0%] ">
              <div className="flex flex-col gap-6 col-span-2 ">
                <div className="flex lg:flex-row flex-col justify-between gap-8">
                  <h2 className="text-primary-main uppercase font-bold lg:text-[48px] text-2xl">
                    GRAGE LANAI RESTO
                  </h2>
                  <div className="flex gap-3 justify-start items-center">
                    <FaStar fill="#EE9C22" className="w-[50px] h-[53px]" />
                    <div>
                      <h4 className="lg:text-[32px] text-[16px]  font-bold">
                        4.6
                      </h4>
                      <p className="text-neutral-60 lg:text-base text-sm">
                        1k reviews
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
                  <div className="flex items-center gap-3">
                    <FaWifi className="w-[50px] h-[50px]" />
                    <p className="lg:text-base text-sm">Wifi</p>
                  </div>
                  <div className="flex  items-center gap-3">
                    <MdMosque className="w-[50px] h-[50px] rounded-full" />
                    <p className="lg:text-base text-sm">Musholla</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaParking className="w-[50px] h-[50px]" />
                    <p className="lg:text-base text-sm">Parkiran</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8 col-span-2">
                <h3 className="lg:text-[40px] font-bold text-primary-main text-[20px]">
                  Deskripsi
                </h3>
                <p className="lg:text-base text-sm">
                  Grage Lanai Resto merupakan restoran sunda yang berada di
                  kabupaten kuningan dengan menghidangkan berbagai masakan
                  sunda. Dengan menyediakan menu paket serta tempat tersebut
                  dapat disewa untuk acara ulang tahun serta pernikahan.
                </p>
              </div>
              <div className="flex flex-col gap-8 col-span-2">
                <h3 className="lg:text-[40px] font-bold text-primary-main text-[20px]">
                  Harga & Jam Operasional
                </h3>
                <ul className="list-disc px-5 lg:text-base text-sm">
                  <li>Jam Operasional 10.00 WIB - 22.00 WIB</li>
                  <li>
                    Harga Menu Sop <br />
                    Untuk bisa menikmati menu sop yang disajikan di grage lanai
                    resto, dimulai dengan harga Rp. 10.000- Rp.72.000.
                  </li>
                  <li>
                    Harga Menu Seafood <br />
                    Untuk harga menu seafood yang disajikan oleh grage lanai
                    resto di bandrol sekitar Rp. 68.750 - an.
                  </li>
                  <li>
                    Harga Menu Nasi <br />
                    Untuk menu nasi di grage lanai resto cukup dengan menyiapkan
                    uang sekitar Rp. 10.000 -an saja.
                  </li>
                  <li>
                    Harga untuk Gurame <br />
                    Harga untuk menu ini juga cukup ekonomis, karena berkisar
                    dari Rp.19.000 - Rp. 25.000 saja kita bisa menikmati menu
                    gurame yang ada di Grage Lanai Resto,Sangkanhurip.
                  </li>
                  <li>
                    Harga Menu Karuhun <br />
                    Untuk menu karuhun ini juga ekonomis, karena kita cukup
                    menyiapkan sekitar Rp.28.000 - an saja sudah bisa menyantap
                    menu ini di Grage Lanai Resto,Sangkanhurip.
                  </li>
                  <li>
                    Harga Menu Light Food <br />
                    Kita dapat menyantap menu yang tersedia di light food dengan
                    harga Rp. 24.00 - an saja.
                  </li>
                  <li>
                    Harga Aneka Iga <br />
                    Untuk harga aneka iga ini sendiri berkisar Rp.90.000-an
                    saja.
                  </li>
                  <li>
                    Harga Minuman <br />
                    Harga minuman yang ada di Grage Lanai Resto dimulai dari
                    Rp.19.000 - Rp.39.000.
                  </li>
                </ul>
              </div>
            </div>
            <div className=" flex flex-col gap-[20px] flex-1">
              <img src={pictMaps} alt="Lokasi" />
              <p className="lg:text-base text-sm">
                Jl. Raya Sangkanurip No.1, Panawuan, Kec. Cilimus, Kabupaten
                Kuningan, Jawa Barat 45556
              </p>
              <a href="#" className="text-neutral-60 lg:text-base text-sm">
                Lihat Maps
              </a>
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
                    <img src={iconStranger} alt="profile" />
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
                    <img src={iconStranger} alt="profile" />
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
                  <img src={iconPersona} alt="" />
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

export default DetailKuliner;

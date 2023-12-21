import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaStar } from "react-icons/fa6";
import { FaWifi } from "react-icons/fa";
import { MdOutlinePool } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { HiOfficeBuilding } from "react-icons/hi";
import { MdOutlineRestaurant } from "react-icons/md";
import { TbMassage } from "react-icons/tb";
import pictDetailp from "../../assets/images/DetailPenginapan/Hotel Grage sangkan.png";
import pictMapsp from "../../assets/images/DetailPenginapan/maps_hotel grage.png";
import iconStrangerp from "../../assets/images/DetailPenginapan/avatar_Stranger.png";
import iconPersonap from "../../assets/images/DetailPenginapan/avatar_Persona.png";

const DetailPenginapan = () => {
  return (
    <>
      <Navbar />
      <div className="font-productSans">
        <div className="lg:px-16 px-4 flex flex-col gap-8 py-6 lg:py-24">
          <div className="grid grid-rows-1 gap-3">
            <img
              src={pictDetailp}
              alt="Grage Sangkan Hotel"
              className="w-full rounded-lg object-cover row-span-2 h-full"
            />
          </div>
          <div className="flex lg:flex-row gap-8 flex-col">
            <div className="flex flex-col gap-8 flex-[2_2_0%] ">
              <div className="flex flex-col gap-6 col-span-2 ">
                <div className="flex lg:flex-row flex-col justify-between gap-8">
                  <h2 className="text-primary-main uppercase font-bold lg:text-[48px] text-2xl">
                    GRAGE SANGKAN HOTEL
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
                    <MdOutlinePool className="w-[50px] h-[50px] rounded-full" />
                    <p className="lg:text-base text-sm">Kolam Renang</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaParking className="w-[50px] h-[50px]" />
                    <p className="lg:text-base text-sm">Parkiran</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <TbMassage className="w-[50px] h-[50px]" />
                    <p className="lg:text-base text-sm">Spa</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdOutlineRestaurant className="w-[50px] h-[50px]" />
                    <p className="lg:text-base text-sm">Restoran</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <HiOfficeBuilding className="w-[50px] h-[50px]" />
                    <p className="lg:text-base text-sm">Aula</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8 col-span-2">
                <h3 className="lg:text-[40px] font-bold text-primary-main text-[20px]">
                  Deskripsi
                </h3>
                <p className="lg:text-base text-sm">
                  {" "}
                  Hotel Grage Sangkan, yang berlokasi di Kota Kuningan,
                  merupakan akomodasi berbintang tiga yang menonjol dengan
                  fasilitas yang luar biasa dan layanan yang ramah dan baik.
                  Tidak hanya menyediakan kemudahan untuk menjelajahi destinasi
                  petualangan, tetapi menginap di Hotel Grage Sangkan juga
                  memberikan kenyamanan istirahat yang optimal.
                </p>
              </div>
              <div className="flex flex-col gap-8 col-span-2">
                <h3 className="lg:text-[40px] font-bold text-primary-main text-[20px]">
                  Harga & Jam Operasional
                </h3>
                <ul className="list-disc px-5 lg:text-base text-sm">
                  <li>Rp. 725.000 / Malam</li>
                  <li>
                    Resepsionis siap 24 jam untuk melayani proses check-in,
                    check-out.
                  </li>
                </ul>
              </div>
            </div>
            <div className=" flex flex-col gap-[20px] flex-1">
              <img src={pictMapsp} alt="Lokasi" />
              <p className="lg:text-base text-sm">
                Jl. Raya Sangkanhurip No. 1 Kuningan , Cilimus, Kuningan, Jawa
                Barat, Indonesia, 45556
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

export default DetailPenginapan;

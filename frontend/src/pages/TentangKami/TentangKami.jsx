import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import bgAbout from "../../assets/images/TentangKami/bgtentangkami.png";
import data from "../../utils/constants/Carousel";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import tentangKami from "../../assets/images/TentangKami/tentangkami.png";
import logovisimisi from "../../assets/images/TentangKami/visimisilogo.png";
import imgmember1 from "../../assets/images/TentangKami/member/1.png";
import imgmember2 from "../../assets/images/TentangKami/member/2.png";
import imgmember3 from "../../assets/images/TentangKami/member/3.png";
import imgmember4 from "../../assets/images/TentangKami/member/4.png";
import imgmember5 from "../../assets/images/TentangKami/member/5.png";
import imgmember6 from "../../assets/images/TentangKami/member/6.png";
import imgmember7 from "../../assets/images/TentangKami/member/7.png";
import imgmember8 from "../../assets/images/TentangKami/member/8.png";
import imgmember9 from "../../assets/images/TentangKami/member/9.png";
import AuthNavbar from "../../components/Navbar/AuthNavbar";

const TentangKami = () => {
  const [carouselsImg, setCarouselsImg] = useState(data);
  return (
    <>
      <Navbar />
      <div className="font-productSans">
        <div className="w-full mb-10">
          <img
            className="top-0 left-0 w-full h-[640px] object-cover"
            src={bgAbout}
            alt="kuningan"
          />
          <div className="absolute top-0 w-full h-full flex flex-col justify-center text-primary-surface">
            <div className="flex flex-col items-center gap-3 lg:px-32">
              <h1 className="text-5xl lg:text-[56px] text-center font-bold">
                Kabupaten Kuningan
              </h1>
              <p className="lg:text-xl text-base text-center">
                Kabupaten Kuningan menawarkan lanskap indah perbukitan dan sawah{" "}
                <br />
                hijau, didukung oleh situs sejarah dan kebudayaan, menjadikannya
                <br />
                destinasi unik wisata alam dan budaya di Jawa Barat.
              </p>
              <a
                href="#"
                className="px-6 py-2 bg-primary-main text-white rounded-full"
              >
                Pilih Paket
              </a>
            </div>
          </div>
        </div>
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            {carouselsImg.map((carouselImg) => {
              return (
                <CardCarousel key={carouselImg.id} carouselImg={carouselImg} />
              );
            })}
          </ul>
        </div>
        <div className="py-14">
          <div className="flex flex-col lg:flex-row justify-around px-[72px]">
            <div>
              <h2 className="lg:text-5xl text-2xl font-bold mt-8 text-primary-main">
                Tentang Kami
              </h2>
              <p className="lg:text-2xl text-base mt-8 mb-8">
                Tim Supermoon, kreatif dan penuh semangat, merancang situs web
                destinasi wisata Kabupaten Kuningan. Fokus pada keindahan alam
                dan budaya, platform ini menyajikan informasi lengkap tentang
                perbukitan, sawah, dan situs sejarah. Dengan desain ramah
                pengguna, kami mengundang pengunjung untuk menjelajahi pesona
                unik Jawa Barat melalui pengalaman pariwisata yang menarik.
              </p>
            </div>
            <img src={tentangKami} alt="tentang kami" className="w-full" />
          </div>
        </div>
        <div className="px-24 py-12 bg-primary-surface">
          <div className="flex flex-col lg:flex-row justify-around">
            <img
              src={logovisimisi}
              alt="visi misi logo"
              className="w-[400px] h-[400px]"
            />
            <div className="py-16">
              <div className="py-4">
                <h3 className="lg:text-[40px] text-xl text-primary-main font-bold">
                  Visi
                </h3>
                <p className="lg:text-2xl text-base mt-3">
                  Menjadi sumber utama inspirasi bagi pengunjung yang ingin
                  mengeksplor keindahan alam, budaya, dan potensi pariwisata
                  Kabupaten Kuningan.
                </p>
              </div>
              <div className="py-4">
                <h3 className="lg:text-[40px] text-xl text-primary-main font-bold">
                  Misi
                </h3>
                <ol className="list-decimal ml-3 lg:text-2xl text-base mt-3 px-3">
                  <li>
                    Memajukan pariwisata Kabupaten Kuningan dengan promosi yang
                    menarik perhatian.
                  </li>
                  <li>
                    Menyediakan informasi terpercaya untuk pengalaman wisata
                    luar biasa.
                  </li>
                  <li>
                    Menyediakan platform ramah pengguna untuk berbagi
                    pengalaman, rekomendasi, dan interaksi komunitas.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="px-24 py-[48px, 72px] mt-5">
          <div className="text-center">
            <h3 className="lg:text-[40px] text-xl font-bold text-primary-main">
              Anggota Tim Supermoon
            </h3>
            <p className="lg:text-2xl text-base mt-3">
              Kami adalah tim berdedikasi yang terdiri dari individu-individu
              berbakat <br /> dan bersemangat. Mari kita kenali lebih dekat para
              anggota kami:
            </p>
          </div>
          <section className="bg-white">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
              <div className="grid gap-8 lg:gap-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-10">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <img
                    className="mx-auto mb-4 w-36 h-36 rounded-full"
                    src={imgmember1}
                    alt="Bonnie Avatar"
                  />
                  <h3 className="mb-1 uppercase text-sm lg:text-2xl font-bold tracking-tight text-gray-900 ">
                    Dini Fariha
                  </h3>
                  <p className="text-xs lg:text-base uppercase">Project Manager</p>
                </div>
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <img
                    className="mx-auto mb-4 w-36 h-36 rounded-full"
                    src={imgmember6}
                    alt="Agus Ananda Putra"
                  />
                  <h3 className="mb-1 uppercase text-sm lg:text-2xl font-bold tracking-tight text-gray-900 ">
                    Agus Ananda Putra
                  </h3>
                  <p className="text-xs lg:text-base uppercase">Hipster</p>
                </div>
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <img
                    className="mx-auto mb-4 w-36 h-36 rounded-full"
                    src={imgmember7}
                    alt="Johan Arifin"
                  />
                  <h3 className="mb-1 uppercase text-sm lg:text-2xl font-bold tracking-tight text-gray-900 ">
                    M. Johan Arifin
                  </h3>
                  <p className="text-xs lg:text-base uppercase">Hacker</p>
                </div>
              </div>
              <div className="grid gap-8 lg:gap-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-10">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <img
                    className="mx-auto mb-4 w-36 h-36 rounded-full"
                    src={imgmember3}
                    alt="Bonnie Avatar"
                  />
                  <h3 className="mb-1 uppercase text-sm lg:text-2xl font-bold tracking-tight text-gray-900 ">
                    Ridho Fauzi Grafika
                  </h3>
                  <p className="text-xs lg:text-base uppercase">Hacker/Scrum Master</p>
                </div>
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <img
                    className="mx-auto mb-4 w-36 h-36 rounded-full"
                    src={imgmember2}
                    alt="Agus Ananda Putra"
                  />
                  <h3 className="mb-1 uppercase text-sm lg:text-2xl font-bold tracking-tight text-gray-900 ">
                    Muharim Awaluddin
                  </h3>
                  <p className="text-xs lg:text-base uppercase">Hipster</p>
                </div>
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <img
                    className="mx-auto mb-4 w-36 h-36 rounded-full"
                    src={imgmember4}
                    alt="Johan Arifin"
                  />
                  <h3 className="mb-1 uppercase text-sm lg:text-2xl font-bold tracking-tight text-gray-900 ">
                    Ahmad Thomthomi Barosimi
                  </h3>
                  <p className="text-xs lg:text-base uppercase">Hacker</p>
                </div>
              </div>
              <div className="grid gap-8 lg:gap-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-10">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <img
                    className="mx-auto mb-4 w-36 h-36 rounded-full"
                    src={imgmember5}
                    alt="Bonnie Avatar"
                  />
                  <h3 className="mb-1 text-sm lg:text-2xl font-bold tracking-tight text-gray-900 ">
                    Ahmad Febrian Sembiring
                  </h3>
                  <p className="text-xs lg:text-base">Hipster</p>
                </div>
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <img
                    className="mx-auto mb-4 w-36 h-36 rounded-full"
                    src={imgmember9}
                    alt="Agus Ananda Putra"
                  />
                  <h3 className="mb-1 uppercase text-sm lg:text-2xl font-bold tracking-tight text-gray-900 ">
                    Maudi Nur Aisyah
                  </h3>
                  <p className="text-xs lg:text-base uppercase">HCAI</p>
                </div>
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <img
                    className="mx-auto mb-4 w-36 h-36 rounded-full"
                    src={imgmember8}
                    alt="Johan Arifin"
                  />
                  <h3 className="mb-1 uppercase text-sm lg:text-2xl font-bold tracking-tight text-gray-900 ">
                    Muhamad Dimas Joreski
                  </h3>
                  <p className="text-xs lg:text-base uppercase">HCAI</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TentangKami;

import React from "react";
import AuthNavbar from "../../components/Navbar/AuthNavbar";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { BiSolidHide, BiShow } from "react-icons/bi";

const Setting = () => {
  let user = JSON.parse(localStorage.getItem("user")) || "No user";
  user = user[0];
  const fullname = user.fullname || "Nama";
  const profile_image = user.image_path || "No Image";
  const phone = user.phone_number;
  const email = user.email;
  const user_gender = user.gender || "Tidak ada";

  console.log(user);

  return (
    <>
      <Navbar />
      <div className="flex flex-row font-productSans bg-[#F7F7FF]">
        <div className="row-span-3">
          <Sidebar />
        </div>
        <div className="w-full px-4 py-10">
          <div className="px-4 flex flex-col gap-3 mb-5">
            <h4 className="lg:text-4xl text-xl font-bold">Detail Profil</h4>
            <p className="lg:text-base text-sm">
              Pastikan seluruh data anda sesuai
            </p>
          </div>
          <form>
            <div className="w-full bg-neutral-10 grid lg:grid-cols-2 rounded-lg">
              <div className="px-4 py-3">
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  className="w-full h-[38px] border border-neutral-50 rounded-lg mt-3 px-3 placeholder:text-neutral-100"
                  placeholder="Arin"
                />
              </div>
              <div className="px-4 py-3">
                <label>Nomor Telepon</label>
                <input
                  type="text"
                  className="w-full h-[38px] border border-neutral-50 rounded-lg mt-3 px-3 placeholder:text-neutral-100"
                  placeholder="0895413135131"
                />
              </div>
              <div className="px-4 py-3">
                <label>Tanggal Lahir</label>
                <select
                  type="text"
                  className="w-full h-[38px] border border-neutral-50 rounded-lg mt-3 px-3 placeholder:text-neutral-100"
                >
                  <option placeholder="Pilih Tanggal Lahir">
                    Pilih Tanggal Lahir
                  </option>
                </select>
              </div>
              <div className="px-4 py-3">
                <label>Jenis Kelamin</label>
                <select
                  type="text"
                  className="w-full h-[38px] border border-neutral-50 rounded-lg mt-3 px-3 placeholder:text-neutral-100"
                >
                  <option placeholder="Pilih Tanggal Lahir">Perempuan</option>
                </select>
              </div>
            </div>
            <div className="py-5 flex flex-col gap-3 mt-10">
              <h4 className="font-bold text-3xl">Kontak Detail</h4>
              <p className="lg:text-base text-sm">
                Informasi ini memerlukan verifikasi ulang jika diubah
              </p>
            </div>
            <div className="w-full bg-neutral-10 grid lg:grid-cols-2 mt-5 rounded-lg">
              <div className="px-4 py-3">
                <label>Email</label>
                <input
                  type="text"
                  className="w-full h-[38px] border border-neutral-50 rounded-lg mt-3 px-3 placeholder:text-neutral-100"
                  placeholder="arin@gmail.com"
                />
              </div>
            </div>
            <div className="w-full bg-neutral-10 grid lg:grid-cols-2 rounded-lg">
              <div className="relative mt-3">
                <div className="flex flex-col px-4 gap-3">
                  <label htmlFor="password">Kata Sandi</label>
                  <input
                    type="password"
                    className="w-full h-[38px] border border-neutral-50 rounded-lg  px-3 placeholder:text-neutral-100"
                    placeholder="Masukkan Kata Sandi"
                  />
                  <div className="absolute py-12 end-5">
                    <label>
                      <BiSolidHide fill="#757575" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="relative mt-3">
                <div className="flex flex-col px-4 gap-3">
                  <label htmlFor="password">Kata Sandi Baru</label>
                  <input
                    type="password"
                    className="w-full h-[38px] border border-neutral-50 rounded-lg  px-3 placeholder:text-neutral-100"
                    placeholder="Masukkan Kata Sandi Baru"
                  />
                  <div className="absolute py-12 end-5">
                    <label>
                      <BiSolidHide fill="#757575" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="px-4 mb-3">
                <button className="items-center px-3 py-1 lg:px-4 lg:py-2 lg:text-base text-sm text-center text-white border-solid border-2 border-primary-main bg-primary-main rounded-lg mt-5">
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Setting;

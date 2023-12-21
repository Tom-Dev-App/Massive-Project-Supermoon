import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../../components/Navbar/Navbar";
import SidebarAdmin from "../../../../components/SidebarAdmin/SidebarAdmin";
import Footer from "../../../../components/Footer/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const BuatPaketWisata = () => {
  const navigate = useNavigate();
  // menyimpan form data
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    price: "",
    address: "",
    address_link: "",
    description: "",
    tour_description: "",
    tour_link: "",
    culinary_description: "",
    culinary_link: "",
    lodging_description: "",
    lodging_link: "",
  });

  // menangani perubahan data di form input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // simpan ke server/ aksi ke server put post get delete
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/tour-packets/create",
        formData
      );
      console.log(response?.data);
      toast.success("Paket wisata dibuat!");
      navigate("/dashboard/paket-wisata", { replace: true });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Can't connect to a server!");
      } else {
        toast.error("Error setting up the request!");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="font-productSans bg-[#F7F7FF] flex flex-row">
        <SidebarAdmin />
        <div className="w-full px-4 py-10 overflow-x-auto">
          <div className="w-full bg-neutral-10 rounded-lg mb-10 px-4 py-8">
            <div className="px-4 py-6">
              <div className="w-full">
                <div className="m-8">
                  <h6 className="lg:text-3xl text-xl font-bold tracking-tight text-gray-900">
                    Tambah Paket Wisata
                  </h6>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* title */}
                  <div className="m-8">
                    <div className="my-5">
                      <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                        Nama Paket
                      </h6>
                      <div className="relative flex items-center gap-2">
                        <input
                          type="text"
                          name="title"
                          className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                          value={formData.title}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    {/* slug */}
                    <div className="my-5">
                      <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                        Slug
                      </h6>
                      <div className="relative flex items-center gap-2">
                        <input
                          type="text"
                          name="slug"
                          className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                          value={formData.slug}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <p className="lg:text-base text-xs text-neutral-60 mt-3">
                        Slug digunakan untuk akses artikel lewat url atau alamat
                        web, slug diatas tidak boleh sama dengan slug dari
                        artikel yang lain.
                      </p>
                    </div>
                    {/* End slug */}
                    {/* price */}
                    <div className="my-5">
                      <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                        Harga
                      </h6>
                      <div className="relative flex items-center gap-2">
                        <input
                          type="number"
                          name="price"
                          className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                          value={formData.price}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    {/* address */}
                    <div className="my-5">
                      <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                        Alamat
                      </h6>
                      <div className="relative flex items-center gap-2">
                        <textarea
                          name="address"
                          id=""
                          cols="30"
                          className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                          rows="10"
                          onChange={handleChange}
                          required
                          value={formData.address}
                        ></textarea>
                      </div>
                    </div>
                    {/* address link */}
                    <div className="my-5">
                      <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                        Link Alamat
                      </h6>
                      <div className="relative flex items-center gap-2">
                        <input
                          type="text"
                          name="address_link"
                          className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                          value={formData.address_link}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    {/* desccription */}
                    <div className="my-5">
                      <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                        Deskripsi
                      </h6>
                      <div className="relative flex items-center gap-2">
                        <textarea
                          name="description"
                          id=""
                          cols="30"
                          className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                          rows="10"
                          onChange={handleChange}
                          required
                          value={formData.description}
                        ></textarea>
                      </div>
                    </div>
                    {/*  tour description */}
                    <div className="my-5">
                      <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                        Deskripsi Wisata
                      </h6>
                      <div className="relative flex items-center gap-2">
                        <textarea
                          name="tour_description"
                          id=""
                          cols="30"
                          className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                          rows="10"
                          onChange={handleChange}
                          required
                          value={formData.tour_description}
                        ></textarea>
                      </div>
                    </div>
                    {/* tour link */}
                    <div className="my-5">
                      <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                        Link Wisata
                      </h6>
                      <div className="relative flex items-center gap-2">
                        <input
                          type="text"
                          name="tour_link"
                          className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                          value={formData.tour_link}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/*  culinary_description */}
                    <div className="my-5">
                      <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                        Deskripsi Kuliner
                      </h6>
                      <div className="relative flex items-center gap-2">
                        <textarea
                          name="culinary_description"
                          id=""
                          cols="30"
                          className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                          rows="10"
                          onChange={handleChange}
                          required
                          value={formData.culinary_description}
                        ></textarea>
                      </div>
                    </div>
                    {/*culinary_link */}
                    <div className="my-5">
                      <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                        Link Kuliner
                      </h6>
                      <div className="relative flex items-center gap-2">
                        <input
                          type="text"
                          name="culinary_link"
                          className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                          value={formData.culinary_link}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    {/*  lodging_description */}
                    <div className="my-5">
                      <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                        Deskripsi Penginapan
                      </h6>
                      <div className="relative flex items-center gap-2">
                        <textarea
                          name="lodging_description"
                          id=""
                          cols="30"
                          className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                          rows="10"
                          onChange={handleChange}
                          required
                          value={formData.lodging_description}
                        ></textarea>
                      </div>
                    </div>
                    {/*lodging_link */}
                    <div className="my-5">
                      <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                        Link Penginapan
                      </h6>
                      <div className="relative flex items-center gap-2">
                        <input
                          type="text"
                          name="lodging_link"
                          className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                          value={formData.lodging_link}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex lg:flex-row flex-col justify-start m-8 gap-3">
                    <button
                      type="submit"
                      to="/"
                      className="lg:px-4 px-2 py-2 lg:text-base text-sm rounded-lg text-center border-solid border-2 text-white bg-primary-main border-primary-main"
                    >
                      Publish
                    </button>
                    <Link
                      to="/dashboard/paket-wisata"
                      className="lg:px-4 px-2 py-2 lg:text-base text-sm rounded-lg text-center border-solid border-2 text-primary-main bg-primary-surface border-primary-main"
                    >
                      Batal
                    </Link>
                  </div>
                </form>
                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BuatPaketWisata;

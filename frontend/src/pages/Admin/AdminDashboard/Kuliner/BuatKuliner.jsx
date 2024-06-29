import React, { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import SidebarAdmin from "../../../../components/SidebarAdmin/SidebarAdmin";
import Footer from "../../../../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Select from "react-select";
import config from "../../../../config";


const BuatKuliner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    price: "",
    categories: "",
    address: "",
    address_link: "",
    description: "",
    ticket_operasional: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL ?? 'localhost:8000/api/'}culinaries`,
        formData
      );
      console.log(response?.data);
      toast.success("Disimpan!");
      navigate("/dashboard/kuliner", { replace: true });
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
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="m-8">
                  <h6 className="lg:text-3xl text-xl font-bold tracking-tight text-gray-900">
                    Form Tambah Kuliner
                  </h6>
                </div>

                <div className="m-8">
                  <div className="my-5">
                    <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                      Judul Kuliner
                    </h6>
                    <div className="relative flex items-center gap-2">
                      <input
                        required
                        type="text"
                        name="title"
                        className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="my-5">
                    <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                      Slug
                    </h6>
                    <div className="relative flex items-center gap-2">
                      <input
                        required
                        type="text"
                        name="slug"
                        className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                        value={formData.slug}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="lg:text-base text-xs text-neutral-60 mt-3">
                      Slug digunakan untuk akses artikel lewat url atau alamat
                      web, slug diatas tidak boleh sama dengan slug dari artikel
                      yang lain.
                    </p>
                  </div>
                  <div className="my-5">
                    <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                      Tag (Perkemahan, Curug)
                    </h6>
                    <div className="relative flex items-center gap-2">
                      <input
                        required
                        type="text"
                        name="categories"
                        placeholder=""
                        className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                        value={formData.categories}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="my-5">
                    <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                      Alamat
                    </h6>
                    <div className="relative flex items-center gap-2">
                      <textarea
                        required
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        autoComplete="off"
                        className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                      >
                        {" "}
                      </textarea>
                    </div>
                  </div>
                  <div className="my-5">
                    <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                      Link Google Maps
                    </h6>
                    <div className="relative flex items-center gap-2">
                      <input
                        required
                        type="text"
                        name="address_link"
                        className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                        value={formData.address_link}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="my-5">
                    <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                      Harga
                    </h6>
                    <div className="relative flex items-center gap-2">
                      <input
                        required
                        type="number"
                        name="price"
                        className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="my-5">
                    <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                      Deskripsi
                    </h6>
                    <div className="relative flex items-center gap-2">
                      <textarea
                        required
                        type="text"
                        name="description"
                        autoComplete="off"
                        className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="my-5">
                    <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                      Harga dan Jam Operasional
                    </h6>
                    <div className="relative flex items-center gap-2">
                      <textarea
                        required
                        type="text"
                        name="ticket_operasional"
                        autoComplete="off"
                        className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                        value={formData.ticket_operasional}
                        onChange={handleChange}
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
                    to="/dashboard/kuliner"
                    className="lg:px-4 px-2 py-2 lg:text-base text-sm rounded-lg text-center border-solid border-2 text-primary-main bg-primary-surface border-primary-main"
                  >
                    Batal
                  </Link>
                </div>
              </form>
            </div>
          </div>
          {/* FORM LAIN JIKA ADA */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BuatKuliner;

import React, { useState } from "react";
import Footer from "../../../../components/Footer/Footer";
import SidebarAdmin from "../../../../components/SidebarAdmin/SidebarAdmin";
import Navbar from "../../../../components/Navbar/Navbar";
import { IoConstruct } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function BuatBlog() {
  const navigate = useNavigate();
  const [images, setImages] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    is_published: true,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("slug", formData.slug);
      submitData.append("content", formData.content);
      submitData.append("is_published", formData.is_published);

      Object.values(images).forEach((file) => {
        submitData.append("images", file);
      });

      const response = await axios.post(
        `http://localhost:8000/api/posts/`,
        submitData
      );

      toast.success(response.data.message);
      navigate("/dashboard/artikel", { replace: true });
      console.log("Images submitted successfully");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Can't connect to a server!");
      } else {
        toast.error("Error setting up the request!");
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`Updating ${name} to:`, value);
    setFormData({ ...formData, [name]: value });
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
                    Form Tambah Artikel
                  </h6>
                </div>

                <div className="m-8">
                  <div className="my-5">
                    <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                      Judul Artikel
                    </h6>
                    <div className="relative flex items-center gap-2">
                      <input
                        type="text"
                        required
                        name="title"
                        onChange={handleChange}
                        value={formData.title}
                        placeholder="Judul Artikel"
                        className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                      />
                    </div>
                  </div>
                  <div className="my-5">
                    <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                      Slug
                    </h6>
                    <div className="relative flex items-center gap-2">
                      <input
                        type="text"
                        name="slug"
                        required
                        onChange={handleChange}
                        value={formData.slug}
                        className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                      />
                    </div>
                    <p className="lg:text-base text-xs text-neutral-60 mt-3">
                      Slug digunakan untuk akses artikel lewat url atau alamat
                      web, slug diatas tidak boleh sama dengan slug dari artikel
                      yang lain.
                    </p>
                  </div>
                  <div className="my-5">
                    <textarea
                      type="text"
                      name="content"
                      onChange={handleChange}
                      value={formData.content}
                      placeholder="Isi Artikel Wisata"
                      autoComplete="off"
                      required
                      className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                    />
                  </div>
                  <input
                    type="file"
                    className="block text-sm text-slate-500 file:mr-4 file:py-2
              file:px-4 rounded-xl file:border-0 file:text-sm file:font-semibold"
                    name="img_path"
                    multiple
                    onChange={(e) => {
                      const images = Array.from(e.target.files);
                      setImages(
                        images.reduce(
                          (acc, image) => ({ ...acc, [image.name]: image }),
                          {}
                        )
                      );
                    }}
                  />
                  <div className="my-5 flex lg:flex-row flex-col">
                    <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                      Publikasikan Artikel:
                    </h6>
                    <div className="mx-8 text-lg">
                      <div className="flex flex-row gap-3">
                        <input
                          type="checkbox"
                          onChange={handleChange}
                          disabled
                          checked={formData.is_published}
                        />
                        <label className="lg:text-lg text-sm">Simpan</label>
                      </div>
                      <div className="flex flex-row gap-3">
                        <input
                          type="checkbox"
                          onChange={handleChange}
                          disabled
                          checked={formData.is_published}
                        />
                        <label className="lg:text-lg text-sm">Publish</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex lg:flex-row flex-col justify-start m-8 gap-3">
                  <button
                    type="submit"
                    className="lg:px-4 px-2 py-2 lg:text-base text-sm rounded-lg text-center border-solid border-2 text-white bg-primary-main border-primary-main"
                  >
                    Publish
                  </button>
                  <Link
                    to="/"
                    className="lg:px-4 px-2 py-2 lg:text-base text-sm rounded-lg text-center border-solid border-2 text-primary-main bg-primary-surface border-primary-main"
                  >
                    Batal
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

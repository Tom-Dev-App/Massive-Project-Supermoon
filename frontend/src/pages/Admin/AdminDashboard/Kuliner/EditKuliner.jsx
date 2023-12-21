import React, { useState, useEffect } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import SidebarAdmin from "../../../../components/SidebarAdmin/SidebarAdmin";
import Footer from "../../../../components/Footer/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Select from "react-select";

const EditKuliner = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [id, setId] = useState("");
  const [images, setImages] = useState([]);
  const [imagesUpload, setImagesUpload] = useState({});
  const [imagesUpdate, setImagesUpdate] = useState({});
  const [facilitiesOptions, setFacilitiesOptions] = useState([]);

  const [facilities, setFacilities] = useState([]);
  const [selectedFacilityUpload, setSelectedFacilityUpload] = useState([]);
  const [selectedFacilityUpdate, setSelectedFacilityUpdate] = useState([]);

  // Fetch facilities data from the API
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/tour-packets/facilities"
        );
        const facilitiesData = response.data.data.facilities;
        const options = facilitiesData.map((facility) => ({
          value: facility.id,
          label: facility.name,
        }));
        setFacilitiesOptions(options);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };

    fetchFacilities();
  }, []);

  //   console.log(slug);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    categories: "",
    price: "",
    address: "",
    address_link: "",
    description: "",
    ticket_operasional: "",
  });

  //   GETTING DATA
  useEffect(() => {
    // Fetch existing data for the specified tour
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/culinaries/slug/${slug}`
        );
        const fetchData = response.data.data;
        console.log(fetchData);
        setId(fetchData.id);

        setImages(fetchData.images ?? []);
        setFormData({
          ...formData,
          ...fetchData,
        });
        const facilitiesArray = Array.isArray(fetchData.facilities)
          ? fetchData.facilities
          : [];
        setFacilities(facilitiesArray);
        // console.log("Facilities", facilities);
      } catch (error) {
        console.error("Error fetching tour packet data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  //   images
  const handleImageSubmitUpload = async (e) => {
    e.preventDefault();

    try {
      const formDataImage = new FormData();
      if (Object.keys(imagesUpload).length === 0) {
        return toast.error("Silahkan isi gambar");
      }

      Object.values(imagesUpload).map((image) => {
        formDataImage.append("images", image);
        return null; // Add this line to satisfy React's warning about missing return in array map
      });

      // Check if there are new images to upload
      await axios.post(
        `http://localhost:8000/api/culinaries/images/${id}`,
        formDataImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Gambar diupload!");

      console.log("Images submitted successfully");
    } catch (error) {
      console.error("Error submitting images", error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Can't connect to a server!");
      } else {
        toast.error("Error setting up the request!");
      }
    }
  };

  const handleImageSubmitUpdate = async (e) => {
    e.preventDefault();

    try {
      const formDataImage = new FormData();
      if (Object.keys(imagesUpdate).length === 0) {
        return toast.error("Silahkan isi gambar");
      }

      Object.values(imagesUpdate).map((image) => {
        formDataImage.append("images", image);
        return null; // Add this line to satisfy React's warning about missing return in array map
      });

      // Check if there are new images to upload
      await axios.put(
        `http://localhost:8000/api/culinaries/images/${id}`,
        formDataImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Gambar diupdate!");

      console.log("Images submitted successfully");
    } catch (error) {
      console.error("Error updating images", error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Can't connect to a server!");
      } else {
        toast.error("Error setting up the request!");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/api/culinaries/update/${id}`,
        formData
      );
      console.log(response?.data);
      toast.success("Diperbarui!");
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

  //   fasilitas
  const handleSubmitUploadFacility = async (e) => {
    e.preventDefault();
    const data = selectedFacilityUpload.map((option) => option.value);
    const DataFacilities = { facilities: data };
    try {
      const response = await axios.post(
        `http://localhost:8000/api/culinaries/facilities/${id}`,
        DataFacilities
      );
      console.log(response?.data);
      toast.success("Fasilitas ditambahkan!");
      // navigate("/dashboard/paket-wisata", { replace: true });
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

  const handleSubmitUpdateFacility = async (e) => {
    e.preventDefault();
    const data = selectedFacilityUpdate.map((option) => option.value);
    const DataFacilities = { facilities: data };
    try {
      const response = await axios.put(
        `http://localhost:8000/api/culinaries/facilities/${id}`,
        DataFacilities
      );
      console.log(response?.data);
      toast.success("Fasilitas diubah!");
      // navigate("/dashboard/paket-wisata", { replace: true });
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
  // console.log(images);
  return (
    <>
      <Navbar />
      <div className="font-productSans bg-[#F7F7FF] flex flex-row">
        <SidebarAdmin />
        <div className="w-full px-4 py-10 overflow-x-auto">
          <div className="w-full bg-neutral-10 rounded-lg mb-10 px-4 py-8">
            <div className="px-4 py-6">
              {/* forms */}
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="m-8">
                  <h6 className="lg:text-3xl text-xl font-bold tracking-tight text-gray-900">
                    Form Edit Penginapan
                  </h6>
                </div>

                <div className="m-8">
                  <div className="my-5">
                    <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                      Judul Penginapan
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
                    to="/dashboard/wisata"
                    className="lg:px-4 px-2 py-2 lg:text-base text-sm rounded-lg text-center border-solid border-2 text-primary-main bg-primary-surface border-primary-main"
                  >
                    Batal
                  </Link>
                </div>
              </form>
            </div>
          </div>
          {/* FORM LAIN JIKA ADA */}
          {images.length === 0 && (
            <>
              <form
                className="w-full bg-neutral-10 rounded-lg mb-10 px-4 py-8"
                onSubmit={handleImageSubmitUpload}
                encType="multipart/form-data"
              >
                <div className="m-8">
                  <h6 className="lg:text-3xl text-xl font-bold tracking-tight text-gray-900">
                    Upload Gambar
                  </h6>
                </div>
                <div className="px-4 py-6">
                  <div className="w-full">
                    <div className="m-8">
                      <input
                        type="file"
                        className="block text-sm text-slate-500 file:mr-4 file:py-2
    file:px-4 rounded-xl file:border-0 file:text-sm file:font-semibold"
                        multiple
                        onChange={(e) => {
                          const images = Array.from(e.target.files);
                          setImagesUpload(
                            images.reduce(
                              (acc, image) => ({ ...acc, [image.name]: image }),
                              {}
                            )
                          );
                        }}
                      />
                    </div>
                    <div className="flex lg:flex-row flex-col justify-start m-8 gap-3">
                      <button
                        type="submit"
                        className="lg:px-4 px-2 py-2 lg:text-base text-sm rounded-lg text-center border-solid border-2 text-white bg-primary-main border-primary-main"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}

          {images.length > 0 && (
            <>
              <form
                className="w-full bg-neutral-10 rounded-lg mb-10 px-4 py-8"
                onSubmit={handleImageSubmitUpdate}
                encType="multipart/form-data"
              >
                <div className="m-8">
                  <h6 className="lg:text-3xl text-xl font-bold tracking-tight text-gray-900">
                    Update Gambar
                  </h6>
                </div>
                <div className="px-4 py-6">
                  <div className="w-full">
                    <div className="m-8">
                      <input
                        type="file"
                        className="block text-sm text-slate-500 file:mr-4 file:py-2
    file:px-4 rounded-xl file:border-0 file:text-sm file:font-semibold"
                        multiple
                        onChange={(e) => {
                          const images = Array.from(e.target.files);
                          setImagesUpdate(
                            images.reduce(
                              (acc, image) => ({ ...acc, [image.name]: image }),
                              {}
                            )
                          );
                        }}
                      />
                    </div>
                    <div className="flex lg:flex-row flex-col justify-start m-8 gap-3">
                      <button
                        type="submit"
                        className="lg:px-4 px-2 py-2 lg:text-base text-sm rounded-lg text-center border-solid border-2 text-white bg-primary-main border-primary-main"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
          {/* FASILITAS WISATA */}
          {facilities.length === 0 && (
            <>
              <form
                className="w-full bg-neutral-10 rounded-lg mb-10 px-4 py-8"
                onSubmit={handleSubmitUploadFacility}
              >
                <div className="m-8">
                  <h6 className="lg:text-3xl text-xl font-bold tracking-tight text-gray-900">
                    Tambah Fasilitas Kuliner
                  </h6>
                </div>
                <div className="px-4 py-6">
                  <div className="w-full">
                    <div className="m-8">
                      <Select
                        className="input-cont"
                        placeholder="Pilih"
                        options={facilitiesOptions}
                        isMulti={true}
                        onChange={(selectedOptions) => {
                          // console.log("Selected Options:", selectedOptions);
                          setSelectedFacilityUpload(selectedOptions);
                        }}
                      />
                    </div>
                    <div className="flex lg:flex-row flex-col justify-start m-8 gap-3">
                      <button
                        type="submit"
                        className="lg:px-4 px-2 py-2 lg:text-base text-sm rounded-lg text-center border-solid border-2 text-white bg-primary-main border-primary-main"
                      >
                        Tambah
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
          {facilities.length > 1 && (
            <>
              <form
                className="w-full bg-neutral-10 rounded-lg mb-10 px-4 py-8"
                onSubmit={handleSubmitUpdateFacility}
              >
                <div className="m-8">
                  <h6 className="lg:text-3xl text-xl font-bold tracking-tight text-gray-900">
                    Update Fasilitas Kuliner
                  </h6>
                </div>
                <div className="px-4 py-6">
                  <div className="w-full">
                    <div className="m-8">
                      <Select
                        className="input-cont"
                        placeholder="Pilih"
                        options={facilitiesOptions}
                        isMulti={true}
                        onChange={(selectedOptions) =>
                          setSelectedFacilityUpdate(selectedOptions)
                        }
                      />
                    </div>
                    <div className="flex lg:flex-row flex-col justify-start m-8 gap-3">
                      <button
                        type="submit"
                        className="lg:px-4 px-2 py-2 lg:text-base text-sm rounded-lg text-center border-solid border-2 text-white bg-primary-main border-primary-main"
                      >
                        Tambah
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditKuliner;

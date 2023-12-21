import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../../components/Navbar/Navbar";
import SidebarAdmin from "../../../../components/SidebarAdmin/SidebarAdmin";
import Footer from "../../../../components/Footer/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Select from "react-select";

const EditPaketWisata = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [id, setId] = useState("");
  const [images, setImages] = useState([]);
  const [imagesUpload, setImagesUpload] = useState({});
  const [imagesUpdate, setImagesUpdate] = useState({});
  const [facilitiesOptions, setFacilitiesOptions] = useState([]);

  const [tourFacilities, setTourFacilities] = useState([]);
  const [culinaryFacilities, setCulinaryFacilities] = useState([]);
  const [lodgingFacilities, setLodgingFacilities] = useState([]);

  const [selectedUploadFacilitiesTour, setSelectedUploadFacilitiesTour] =
    useState([]);
  const [selectedUpdateFacilitiesTour, setSelectedUpdateFacilitiesTour] =
    useState([]);

  const [
    selectedUploadFacilitiesCulinary,
    setSelectedUploadFacilitiesCulinary,
  ] = useState([]);
  const [
    selectedUpdateFacilitiesCulinary,
    setSelectedUpdateFacilitiesCulinary,
  ] = useState([]);

  const [selectedUploadFacilitiesLodging, setSelectedUploadFacilitiesLodging] =
    useState([]);
  const [selectedUpdateFacilitiesLodging, setSelectedUpdateFacilitiesLodging] =
    useState([]);

  useEffect(() => {
    // Fetch facilities data from the API
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

  console.log(slug);
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

  useEffect(() => {
    // Fetch existing data for the specified tour packet
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/tour-packets/slug/${slug}`
        );
        const tourPacketData = response.data.data;
        console.log(tourPacketData);
        setId(tourPacketData.tour_packet.id);
        setImages(tourPacketData.tour_images ?? []);
        setFormData({
          ...formData,
          ...tourPacketData.tour_packet,
        });
        setTourFacilities(tourPacketData.tour_facilities);
        console.log("Tour Facilities", tourFacilities);
        setCulinaryFacilities(tourPacketData.culinary_facilities);
        console.log("Culinary Culinary", culinaryFacilities);
        setLodgingFacilities(tourPacketData.lodging_facilities);
        console.log("Lodging Culinary", lodgingFacilities);
      } catch (error) {
        console.error("Error fetching tour packet data:", error);
      }
    };

    fetchData();
  }, [slug]);

  console.log("ID", id);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

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
        `http://localhost:8000/api/tour-packets/image/${id}`,
        formDataImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Gambar wisata diupload!");

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
        `http://localhost:8000/api/tour-packets/image/${id}`,
        formDataImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Gambar wisata diupdate!");

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

  useEffect(() => {
    console.log("gambar di server", images);
  }, [images]);

  useEffect(() => {
    console.log("gambar di upload", imagesUpload);
  }, [imagesUpload]);

  useEffect(() => {
    console.log("gambar di update", imagesUpdate);
  }, [imagesUpdate]);

  useEffect(() => {
    console.log("wisata fasilitas upload", selectedUpdateFacilitiesTour);
  }, [selectedUpdateFacilitiesTour]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/api/tour-packets/update/${id}`,
        formData
      );
      console.log(response?.data);
      toast.success("Paket wisata diperbarui!");
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

  const handleSubmitUploadTourFacility = async (e) => {
    e.preventDefault();
    const data = selectedUploadFacilitiesTour.map((option) => option.value);
    const DataFacilities = { facilities: data };
    try {
      const response = await axios.post(
        `http://localhost:8000/api/tour-packets/tour-facilities/${id}`,
        DataFacilities
      );
      console.log(response?.data);
      toast.success("Fasilitas wisata ditambahkan!");
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

  const handleSubmitUpdateTourFacility = async (e) => {
    e.preventDefault();
    const data = selectedUpdateFacilitiesTour.map((option) => option.value);
    const DataFacilities = { facilities: data };
    try {
      const response = await axios.put(
        `http://localhost:8000/api/tour-packets/tour-facilities/${id}`,
        DataFacilities
      );
      console.log(response?.data);
      toast.success("Fasilitas wisata diubah!");
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

  const handleSubmitUploadCulinaryFacility = async (e) => {
    e.preventDefault();
    const data = selectedUploadFacilitiesCulinary.map((option) => option.value);
    const DataFacilities = { facilities: data };
    try {
      const response = await axios.post(
        `http://localhost:8000/api/tour-packets/culinary-facilities/${id}`,
        DataFacilities
      );
      console.log(response?.data);
      toast.success("Fasilitas kuliner ditambahkan!");
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

  const handleSubmitUpdateCulinaryFacility = async (e) => {
    e.preventDefault();
    const data = selectedUpdateFacilitiesCulinary.map((option) => option.value);
    const DataFacilities = { facilities: data };
    try {
      const response = await axios.put(
        `http://localhost:8000/api/tour-packets/culinary-facilities/${id}`,
        DataFacilities
      );
      console.log(response?.data);
      toast.success("Fasilitas kuliner diubah!");
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

  const handleSubmitUploadLodgingFacility = async (e) => {
    e.preventDefault();
    const data = selectedUploadFacilitiesLodging.map((option) => option.value);
    const DataFacilities = { facilities: data };
    try {
      const response = await axios.post(
        `http://localhost:8000/api/tour-packets/lodging-facilities/${id}`,
        DataFacilities
      );
      console.log(response?.data);
      toast.success("Fasilitas penginapan ditambahkan!");
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

  const handleSubmitUpdateLodgingFacility = async (e) => {
    e.preventDefault();
    const data = selectedUpdateFacilitiesLodging;
    const DataFacilities = { facilities: data };
    try {
      const response = await axios.put(
        `http://localhost:8000/api/tour-packets/lodging-facilities/${id}`,
        DataFacilities
      );
      console.log(response?.data);
      toast.success("Fasilitas penginapan diubah!");
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
                    Edit Paket Wisata
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
                          placeholder="Nama Paket"
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
                      Update
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
          {tourFacilities.length === 0 && (
            <>
              <form
                className="w-full bg-neutral-10 rounded-lg mb-10 px-4 py-8"
                onSubmit={handleSubmitUploadTourFacility}
              >
                <div className="m-8">
                  <h6 className="lg:text-3xl text-xl font-bold tracking-tight text-gray-900">
                    Tambah Fasilitas Wisata
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
                          console.log("Selected Options:", selectedOptions);
                          setSelectedUploadFacilitiesTour(selectedOptions);
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
          {tourFacilities.length > 1 && (
            <>
              <form
                className="w-full bg-neutral-10 rounded-lg mb-10 px-4 py-8"
                onSubmit={handleSubmitUpdateTourFacility}
              >
                <div className="m-8">
                  <h6 className="lg:text-3xl text-xl font-bold tracking-tight text-gray-900">
                    Update Fasilitas Wisata
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
                          setSelectedUpdateFacilitiesTour(selectedOptions)
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

          {/* FASILITAS KULINER */}
          {culinaryFacilities.length === 0 && (
            <>
              <form
                className="w-full bg-neutral-10 rounded-lg mb-10 px-4 py-8"
                onSubmit={handleSubmitUploadCulinaryFacility}
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
                        onChange={(selectedOptions) =>
                          setSelectedUploadFacilitiesCulinary(selectedOptions)
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

          {culinaryFacilities.length > 0 && (
            <>
              <form
                className="w-full bg-neutral-10 rounded-lg mb-10 px-4 py-8"
                onSubmit={handleSubmitUpdateCulinaryFacility}
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
                          setSelectedUpdateFacilitiesCulinary(selectedOptions)
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

          {/* FASILITAS PENGINAPAN */}
          {lodgingFacilities.length === 0 && (
            <>
              <form
                className="w-full bg-neutral-10 rounded-lg mb-10 px-4 py-8"
                onSubmit={handleSubmitUploadLodgingFacility}
              >
                <div className="m-8">
                  <h6 className="lg:text-3xl text-xl font-bold tracking-tight text-gray-900">
                    Tambah Fasilitas Penginapan
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
                          setSelectedUploadFacilitiesLodging(selectedOptions)
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
          {lodgingFacilities.length > 0 && (
            <>
              <form
                className="w-full bg-neutral-10 rounded-lg mb-10 px-4 py-8"
                onSubmit={handleSubmitUpdateLodgingFacility}
              >
                <div className="m-8">
                  <h6 className="lg:text-3xl text-xl font-bold tracking-tight text-gray-900">
                    Update Fasilitas Penginapan
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
                          setSelectedUpdateFacilitiesLodging(selectedOptions)
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

export default EditPaketWisata;

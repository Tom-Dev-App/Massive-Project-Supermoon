import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../../components/Navbar/Navbar";
import Footer from "../../../../components/Footer/Footer";
import Select from "react-select";
import { FaBullseye } from "react-icons/fa";
import axios from "axios";
import Sidebar from "../../../../components/Sidebar/Sidebar";

const DetilPembayaran = () => {
  const { id } = useParams();
  const [isDone, setIsDone] = useState(false);
  const [transaction, setTransaction] = useState({});

  //   GETTING DATA
  useEffect(() => {
    // Fetch existing data for the specified tour
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/lodgings/slug/${slug}`
        );
        const fetchData = response.data.data;
        console.log(fetchData);
        setId(fetchData.id);
        console.log("ID", id);

        setImages(fetchData.images ?? []);
        setFormData({
          ...formData,
          ...fetchData,
        });
        const facilitiesArray = Array.isArray(fetchData.facilities)
          ? fetchData.facilities
          : [];
        setFacilities(facilitiesArray);
        console.log("Facilities", facilities);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/api/lodgings/update/${id}`,
        formData
      );
      console.log(response?.data);
      toast.success("Diperbarui!");
      navigate("/dashboard/wisata", { replace: true });
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
      <div className="flex flex-row font-productSans bg-[#F7F7FF]">
        <div className="row-span-3">
          <Sidebar />
        </div>
        <div className="w-full px-4 py-10 bg">
          <div className="px-4 flex flex-col gap-3 bg-neutral-10 mb-10">
            <h4 className="lg:text-4xl text-xl font-bold">Detail Order</h4>
          </div>
          <div className="w-full bg-neutral-10  rounded-lg mb-10 px-4 py-8">
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs">Waktu Pemesanan</p>
              <p className="lg:text-base text-xs">13 November 2023, 11:45</p>
            </div>
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs">Booking ID</p>
              <p className="lg:text-base text-xs">KT-0001</p>
            </div>
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs">Booking Ref</p>
              <p className="lg:text-base text-xs">-</p>
            </div>
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs">Transaction ID</p>
              <p className="lg:text-base text-xs">-</p>
            </div>
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs">Metode Pembayaran</p>
              <p className="lg:text-base text-xs">BANK TRANSFER</p>
            </div>
          </div>
          <div className="w-full bg-neutral-10  rounded-lg mb-10 px-4 py-8">
            <div className="flex justify-between items-center mb-10">
              <h6 className="lg:text-xl text-base font-bold">Rincian Harga</h6>
            </div>
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs">Paket Wisata 1</p>
              <p className="lg:text-base text-xs">Rp. 1.000.000</p>
            </div>
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs">Biaya Layanan</p>
              <p className="lg:text-base text-xs">Rp. 100.000</p>
            </div>
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs font-bold">Total Pembayaran</p>
              <p className="lg:text-base text-xs font-bold">Rp. 1.100.000</p>
            </div>
          </div>
          <div className="w-full bg-neutral-10  rounded-lg mb-5 px-4 py-8">
            <div className="flex justify-between items-center mb-10">
              <h6 className="lg:text-xl text-base font-bold">Rincian Kontak</h6>
            </div>
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs">Nama Lengkap</p>
              <p className="lg:text-base text-xs">Arin</p>
            </div>
            <div className="flex justify-between items-center mb-10">
              <p className="lg:text-base text-xs">Email</p>
              <p className="lg:text-base text-xs">arin@gmail.com</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="lg:text-base text-xs">Nomor Telepon</p>
              <p className="lg:text-base text-xs">08954162748523</p>
            </div>
          </div>
          <div className="w-full bg-neutral-10  rounded-lg mb-5 px-4 py-8">
            <div className="flex justify-between items-center mb-10">
              <h6 className="lg:text-xl text-base font-bold">
                Bukti Transaksi
              </h6>
            </div>
            <div className="flex justify-between items-center mb-10">
              <img src={"/assets/images/bukti-transaksi.png"} width="300" />
            </div>
          </div>
          <div className="w-full bg-neutral-10  rounded-lg mb-5 px-4 py-8">
            <div className="flex  flex-col gap-4">
              <h6 className="lg:text-xl text-base font-bold">Status</h6>
              <span className="block text-2xl">Status</span>
            </div>
          </div>
          <Link
            to="/mydashboard/transaksi"
            className="items-center px-3 py-1 lg:px-4 lg:py-2 lg:text-base text-sm text-center text-white border-solid border-2 border-primary-main bg-primary-main rounded-lg"
          >
            Lihat Riwayat Pesanan
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetilPembayaran;

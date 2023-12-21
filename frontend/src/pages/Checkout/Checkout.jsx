import React, { useState } from "react";
import AuthNavbar from "../../components/Navbar/AuthNavbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import imgBooking from "../../assets/images/checkout/img-booking.svg";
import imgBookingPaid from "../../assets/images/checkout/img-booking-paid.svg";
import Navbar from "../../components/Navbar/Navbar";

const Steps = ({ step }) => {
  return (
    <>
      <div className="flex justify-center items-center relative">
        {step === 0 ? (
          <>
            {/* UNDONE */}
            <div className="min-w-[60px] min-h-[60px] rounded-[50%] border-neutral-40 border-[1px] p-[10px]">
              <div className="min-w-[50px] min-h-[50px] rounded-[50%] bg-neutral-50 flex justify-center items-center">
                <span className="text-center font-productSans xl:text-[20px]">
                  1
                </span>
              </div>
            </div>{" "}
          </>
        ) : (
          <>
            {/* DONE */}
            <div className="min-w-[60px] min-h-[60px] rounded-[50%] bg-primary-main border-primary-main border-[1px] p-[10px] flex justify-center items-center shrink-0">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="16"
                  viewBox="0 0 21 16"
                  fill="none"
                  className="min-w-[20px]"
                >
                  <path
                    d="M7.4375 15.5L0.3125 8.375L2.09375 6.59375L7.4375 11.9375L18.9062 0.46875L20.6875 2.25L7.4375 15.5Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </>
        )}

        <div className="h-[1px] min-w-[75px] bg-neutral-40"></div>
        {step >= 0 && step < 2 ? (
          <>
            {/* UNDONE */}
            <div className="min-w-[60px] min-h-[60px] rounded-[50%] border-neutral-40 border-[1px] p-[10px]">
              <div className="min-w-[50px] min-h-[50px] rounded-[50%] bg-neutral-50 flex justify-center items-center">
                <span className="text-center font-productSans xl:text-[20px]">
                  2
                </span>
              </div>
            </div>{" "}
          </>
        ) : (
          <>
            {/* DONE */}
            <div className="min-w-[60px] min-h-[60px] rounded-[50%] bg-primary-main border-primary-main border-[1px] p-[10px] flex justify-center items-center shrink-0">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="16"
                  viewBox="0 0 21 16"
                  fill="none"
                  className="min-w-[20px]"
                >
                  <path
                    d="M7.4375 15.5L0.3125 8.375L2.09375 6.59375L7.4375 11.9375L18.9062 0.46875L20.6875 2.25L7.4375 15.5Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </>
        )}

        <div className="h-[1px] min-w-[75px] bg-neutral-40"></div>
        {step >= 0 && step < 3 ? (
          <>
            {/* UNDONE */}
            <div className="min-w-[60px] min-h-[60px] rounded-[50%] border-neutral-40 border-[1px] p-[10px]">
              <div className="min-w-[50px] min-h-[50px] rounded-[50%] bg-neutral-50 flex justify-center items-center">
                <span className="text-center font-productSans xl:text-[20px]">
                  3
                </span>
              </div>
            </div>{" "}
          </>
        ) : (
          <>
            {/* DONE */}
            <div className="min-w-[60px] min-h-[60px] rounded-[50%] bg-primary-main border-primary-main border-[1px] p-[10px] flex justify-center items-center shrink-0">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="16"
                  viewBox="0 0 21 16"
                  fill="none"
                  className="min-w-[20px]"
                >
                  <path
                    d="M7.4375 15.5L0.3125 8.375L2.09375 6.59375L7.4375 11.9375L18.9062 0.46875L20.6875 2.25L7.4375 15.5Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const Step0 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="md:flex md:justify-center md:items-center md:gap-4">
        <div className="md:w-1/2">
          <img src={imgBooking} alt="booking-illustrations" />
        </div>
        <div className="md:w-1/2">
          <label>
            <span className="font-productSans text-[14px] mb-[10px] block">
              Nama lengkap
            </span>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Nama lengkap"
              className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed mb-[12px]"
            />
          </label>
          <label>
            <span className="font-productSans text-[14px] mb-[10px] block">
              Email
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed mb-[12px]"
            />
          </label>
          <label>
            <span className="font-productSans text-[14px] mb-[10px] block">
              Nomor telepon
            </span>
            <input
              type="tel"
              name="telepon"
              value={formData.telepon}
              onChange={handleChange}
              placeholder="Nomor telepon"
              className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed"
            />
          </label>
        </div>
      </div>
    </>
  );
};
const Step1 = ({ formData, setFormData, handleFile }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="md:flex md:justify-center md:items-center md:gap-4">
        <div className="md:w-1/2">
          <img src={imgBooking} alt="booking-illustrations" />
        </div>
        <div className="md:w-1/2">
          <label>
            <span className="font-productSans text-[14px] mb-[10px] block">
              Metode Pembayaran
            </span>
            <input
              type="text"
              name="metode_pembayaran"
              value={formData.metode_pembayaran}
              onChange={handleChange}
              placeholder="Metode Pembayaran"
              className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed mb-[12px]"
            />
          </label>
          <label>
            <span className="font-productSans text-[14px] mb-[10px] block">
              Asal Bank
            </span>
            <input
              type="email"
              name="bank_asal"
              value={formData.bank_asal}
              onChange={handleChange}
              placeholder="Asal Bank"
              className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed mb-[12px]"
            />
          </label>
          <label>
            <span className="font-productSans text-[14px] mb-[10px] block">
              Nama Rekening
            </span>
            <input
              type="text"
              name="telepon"
              value={formData.nama_rekening}
              onChange={handleChange}
              placeholder="Nama Rekening"
              className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed mb-[12px]"
            />
          </label>
          <label>
            <span className="font-productSans text-[14px] mb-[10px] block">
              Upload Bukti Pembayaran
            </span>
            <input
              type="file"
              name="file_bukti"
              value={formData.file_bukti}
              onChange={handleFile}
              placeholder="File Upload"
              className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed"
            />
          </label>
        </div>
      </div>
    </>
  );
};

const Step2 = ({ formData, setFormData, handleFile }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="md:flex md:justify-center md:items-center md:gap-4 mb-1">
        <div className="md:w-1/2 mb-5">
          <p className="text-neutral-100 md:text-[24px] font-productSans font-bold">
            Transfer Pembayaran
          </p>
          <p className="text-neutral-100 md:text-[24px] font-productSans font-bold">
            Tax 10%
          </p>
          <p className="text-neutral-100 md:text-[24px] font-productSans font-bold">
            Sub-Total: Rp.1000.000 Rupiah
          </p>
          <p className="text-neutral-100 md:text-[24px] font-productSans font-bold">
            Bank Rakyat Indonesia
          </p>
          <p className="text-neutral-100 md:text-[24px] font-productSans font-bold">
            01231-0131274-141
          </p>
          <p className="text-neutral-100 md:text-[24px] font-productSans font-bold">
            Fauzan Abdillah
          </p>
        </div>
        <div className="md:w-1/2">
          <label>
            <span className="font-productSans text-[14px] mb-[10px] block">
              Asal Bank
            </span>
            <input
              type="email"
              name="bank_asal"
              value={formData.bank_asal}
              onChange={handleChange}
              placeholder="Asal Bank"
              className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed mb-[12px]"
              disabled
            />
          </label>
          <label>
            <span className="font-productSans text-[14px] mb-[10px] block">
              Nama Pengirim
            </span>
            <input
              type="text"
              name="telepon"
              value={formData.nama_rekening}
              onChange={handleChange}
              placeholder="Nama Rekening"
              className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed mb-[12px]"
              disabled
            />
          </label>
          <label>
            <span className="font-productSans text-[14px] mb-[10px] block">
              Upload Bukti Pembayaran
            </span>
            <input
              type="file"
              name="file_bukti"
              value={formData.file_bukti}
              onChange={handleFile}
              placeholder="File Upload"
              className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed"
              disabled
            />
          </label>
        </div>
      </div>
    </>
  );
};
const Step3 = ({ formData, setFormData, handleFile }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="md:flex md:justify-center md:items-center md:gap-4">
        <img src={imgBookingPaid} alt="img-booking-paid" />
      </div>
    </>
  );
};

export default function Pembelian() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    metode_pembayaran: "",
    bank_asal: "",
    nama_rekening: "",
    file_bukti: undefined,
  });

  const handleFile = (e) => {
    const { name, files } = e.target;

    // If the input is a file input, set the file property
    const file = name === "file_bukti" ? files[0] : null;

    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  return (
    <>
      <Navbar />
      <section className="container mx-auto mt-[64px] xl:mt-[82px] px-6 mb-[72px]">
        <div>
          <h2 className="font-productSans xl:text-5xl font-bold text-primary-main leading-[117%] text-center">
            Informasi Pesanan
          </h2>
          <div className="mt-[32px]">
            <Steps step={step} />
          </div>
        </div>
        <div className="flex justify-center mt-[80px]">
          {/* MULTISTEPS FORMS */}
          {step === 0 && (
            <Step0 formData={formData} setFormData={setFormData} />
          )}
          {step === 1 && (
            <Step1
              formData={formData}
              setFormData={setFormData}
              handleFile={handleFile}
            />
          )}
          {step === 2 && (
            <Step2
              formData={formData}
              setFormData={setFormData}
              handleFile={handleFile}
            />
          )}
          {step === 3 && (
            <Step3
              formData={formData}
              setFormData={setFormData}
              handleFile={handleFile}
            />
          )}
        </div>
        <div className="flex justify-center items-center gap-6 mt-8">
          {/* CONDITIONAL BUTTON */}
          {step === 0 && (
            <Link
              to={".."}
              className="flex px-4 py-2 justify-center gap-[4px] items-center rounded-4 overflow-hidden border-primary-main border-[1px] font-productSans text-[20px] leading-[140%] text-primary-main rounded-[8px]"
            >
              Batal
            </Link>
          )}
          {step > 0 && step < 3 && (
            <button
              className="flex px-4 py-2 justify-center gap-[4px] items-center rounded-4 overflow-hidden border-primary-main border-[1px] font-productSans text-[20px] leading-[140%] text-primary-main rounded-[8px]"
              onClick={handlePrev}
            >
              Batal
            </button>
          )}
          {step < 3 && (
            <button
              className="flex px-4 py-2 justify-center gap-[4px] items-center rounded-4 overflow-hidden border-primary-main border-[1px] font-productSans text-[20px] leading-[140%] bg-primary-main  text-neutral-10 rounded-[8px]"
              onClick={handleNext}
            >
              Selanjutnya
            </button>
          )}
          {step === 3 && (
            <a
              className="flex px-4 py-2 justify-center gap-[4px] items-center rounded-4 overflow-hidden border-primary-main border-[1px] font-productSans text-[20px] leading-[140%] bg-primary-main  text-neutral-10 rounded-[8px]"
              href="/"
            >
              Kembali
            </a>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

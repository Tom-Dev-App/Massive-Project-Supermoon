import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import imgBooking from "../../../assets/images/checkout/img-booking.svg";
import imgBookingPaid from "../../../assets/images/checkout/img-booking-paid.svg";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
              name="name"
              required
              value={formData.name}
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
              required
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
              name="phone_number"
              required
              value={formData.phone_number}
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
              placeholder="Metode Pembayaran"
              className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed mb-[12px]"
              value={"BANK TRANSFER"}
              disabled
            />
          </label>
          <label>
            <span className="font-productSans text-[14px] mb-[10px] block">
              Asal Bank
            </span>
            <input
              type="text"
              name="bank_name"
              required
              value={formData.bank_name}
              onChange={handleChange}
              placeholder="Asal Bank"
              className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed mb-[12px]"
            />
          </label>
          <label>
            <span className="font-productSans text-[14px] mb-[10px] block">
              Nama Pemilik Rekening
            </span>
            <input
              type="text"
              name="cardholder_name"
              required
              value={formData.cardholder_name}
              onChange={handleChange}
              placeholder="Nama Pemilik Rekening"
              className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed mb-[12px]"
            />
          </label>
          <label>
            <span className="font-productSans text-[14px] mb-[10px] block">
              Nomor Rekening
            </span>
            <input
              type="text"
              name="account_number"
              required
              value={formData.account_number}
              onChange={handleChange}
              placeholder="Nomor Rekening"
              className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed"
            />
          </label>
        </div>
      </div>
    </>
  );
};

const Step2 = ({ formData, setFormData, handleFile, total, setImages }) => {
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
            Sub-Total: Rp.{total.toLocaleString("id-ID") ?? 0} Rupiah
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
            {/* <span className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed mb-[12px]">
              {formData.bank_name ?? "Asal Bank"}
            </span> */}
            <input
              className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed mb-[12px]"
              placeholder="Asal Bank"
              value={formData.bank_name ?? "Asal Bank"}
              onChange={handleChange}
              disabled
            />
          </label>
          <label>
            <span className="font-productSans text-[14px] mb-[10px] block">
              Nama Pengirim
            </span>
            {/* <span className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed mb-[12px]">
              {formData.cardholder_name ?? "Nama Pengirim"}
            </span> */}
            <input
              className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed mb-[12px]"
              placeholder="Nama Pengirim"
              value={formData.cardholder_name ?? "Nama Pengirim"}
              onChange={handleChange}
              disabled
            />
          </label>
          <label>
            <span className="font-productSans text-[14px] mb-[10px] block">
              Upload Bukti Pembayaran
            </span>
            <input
              type="file"
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
              placeholder="File Upload"
              className="block border border-neutral-60 rounded-lg w-full md:max-w-[600px] px-4 py-2 mt-2 font-productSans text-[14px] leading-relaxed"
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

export default function Checkout() {
  const user = localStorage.getItem("user") || "";
  let userId;
  const [images, setImages] = useState({});
  if (user) {
    // Check if user is not empty
    const parsedUser = JSON.parse(user);

    if (Array.isArray(parsedUser) && parsedUser.length > 0) {
      // Check if user is an array with at least one element
      userId = parsedUser[0].id;
      console.log("ID USER", userId);
    } else {
      console.error("Invalid user data in localStorage");
    }
  } else {
    console.error("User data not found in localStorage");
  }
  const { id } = useParams();
  const [tourPacket, setTourPacket] = useState({});
  const TAXFLOAT = 0.1;
  const [TAX, setTAX] = useState(0);
  const [step, setStep] = useState(0);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    bank_name: "",
    cardholder_name: "",
    account_number: "",
    img_path: {},
  });

  // GET PACKET DATA
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/tour-packets/id`
        );
        const data = response.data.data.tour_packet[0] ?? {};
        setTourPacket(data);
        console.log(data ?? "NO DATA");
        setTAX(() => data.price * TAXFLOAT);
        setTotal(() => data.price + TAX);
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
    fetchData();
  }, [id]);

  const handleFile = (e) => {
    const { name, files } = e.target;

    // If the input is a file input, set the file property
    const fileList = Array.from(files); // Convert FileList to array

    setFormData((prevData) => {
      const updatedImgPath = { ...prevData.img_path };

      fileList.forEach((file, index) => {
        updatedImgPath[index] = file;
      });

      return {
        ...prevData,
        img_path: updatedImgPath,
      };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (step !== 2) {
      // Handle form submission only when step is not 2
      return;
    }
    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("tour_packet_id", id);
      submitData.append("user_id", userId);
      submitData.append("email", formData.email);
      submitData.append("phone_number", formData.phone_number);
      submitData.append("bank_name", formData.bank_name);
      submitData.append("account_number", formData.account_number);
      submitData.append("cardholder_name", formData.cardholder_name);
      submitData.append("price", tourPacket.price);
      submitData.append("tax", TAX);
      submitData.append("total", total);
      submitData.append("user_id", userId);
      Object.values(images).forEach((file) => {
        submitData.append("images", file);
      });

      const response = await axios.post(
        `http:localhost:8000/api/transactions/user/${id}`,
        submitData
      );
      toast.success("Berhasil!");

      console.log("Images submitted successfully");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        // setTimeout(() => handlePrev(), 600);
      } else if (error.request) {
        toast.error("Can't connect to a server!");
        // setTimeout(() => handlePrev(), 600);
      } else {
        toast.error("Error setting up the request!");
        // setTimeout(() => handlePrev(), 600);
      }
    }
  }
  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };
  useEffect(() => {
    console.log(step);
  }, [step]);
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
        <form onSubmit={handleSubmit}>
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
                total={total}
                formData={formData}
                setFormData={setFormData}
                handleFile={handleFile}
                setImages={setImages}
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
                type="button"
                className="flex px-4 py-2 justify-center gap-[4px] items-center rounded-4 overflow-hidden border-primary-main border-[1px] font-productSans text-[20px] leading-[140%] text-primary-main rounded-[8px]"
                onClick={handlePrev}
              >
                Batal
              </button>
            )}
            {step < 2 && (
              <button
                type={"button"}
                className="flex px-4 py-2 justify-center gap-[4px] items-center rounded-4 overflow-hidden border-primary-main border-[1px] font-productSans text-[20px] leading-[140%] bg-primary-main  text-neutral-10 rounded-[8px]"
                onClick={handleNext}
              >
                Selanjutnya
              </button>
            )}
            {step === 2 && (
              <button
                type={"submit"}
                className="flex px-4 py-2 justify-center gap-[4px] items-center rounded-4 overflow-hidden border-primary-main border-[1px] font-productSans text-[20px] leading-[140%] bg-primary-main  text-neutral-10 rounded-[8px]"
              >
                Selanjutnya
              </button>
            )}

            {step === 3 && (
              <Link
                className="flex px-4 py-2 justify-center gap-[4px] items-center rounded-4 overflow-hidden border-primary-main border-[1px] font-productSans text-[20px] leading-[140%] bg-primary-main  text-neutral-10 rounded-[8px]"
                to="/"
              >
                Kembali
              </Link>
            )}
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
}

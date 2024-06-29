import React, { useEffect, useState } from "react";
import logo from "../../../assets/logo/KUNINGANTOUR_1.png";
import { BiSolidHide, BiShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import config from "../../../config";


const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    fullname: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const [genders, setGenders] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedGender, setSelectedGender] = useState();
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  useEffect(() => {
    // Fetch gender data
    axios
      .get("${SERVER_URL}auth")
      .then((response) => {
        setGenders(response.data.genders);
      })
      .catch((error) => {
        console.error("Error fetching gender data:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      fullname: event.target.fullname.value,
      gender: event.target.gender.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      password: event.target.password.value,
      confirm_password: event.target.confirm_password.value,
      // Include other form fields as needed
    };

    try {
      // Send a POST request to the backend
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL ?? 'localhost:8000/api/'}auth/`,
        formData
      );

      // Handle successful registration
      // console.log("Registration successful:", response.data);
      // Show success toast
      toast.success("Registration successful");
      navigate("/login", { replace: true });
    } catch (error) {
      // Handle registration errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.error("Server responded with an error:", error.response.data);
        // Show error toast
        toast.error(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        // console.error("No response received from the server");
        // Show error toast
        toast.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.error("Error setting up the request:", error.message);
        // Show error toast
        toast.error("Error setting up the request");
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };
  return (
    <>
      <div>
        <div className="h-screen font-productSans">
          <div className="flex justify-center mt-10">
            <img src={logo} alt="Logo" />
          </div>
          <div className="flex flex-col lg:flex-row justify-evenly">
            <div className="px-6 py-4">
              <div className="flex flex-col justify-center text-center lg:mt-5">
                <h2 className="text-5xl font-bold mb-3">Daftar Akun</h2>
                <p className="text-base mb-5">
                  Buat akun untuk mengakses semua fitur kami
                </p>
              </div>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label htmlFor="nama">Nama Lengkap</label>
                  <input
                    type="text"
                    className="block border border-neutral-60 rounded-lg w-full lg:w-[634px] px-2 py-2 mt-2"
                    placeholder="Masukkan Nama Anda"
                    name="fullname"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="gender">Jenis Kelamin</label>
                  <select
                    id="gender"
                    className="block border border-neutral-60 rounded-lg w-full lg:w-[634px] px-2 py-2 mt-2"
                    onChange={handleChange}
                    value={selectedGender}
                    name="gender"
                  >
                    <option value="" disabled>
                      Pilih
                    </option>
                    {genders.map((gender) => (
                      <option key={gender.id} value={gender.id}>
                        {gender.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="block border border-neutral-60 rounded-lg w-full lg:w-[634px] px-2 py-2 mt-2"
                    placeholder="Masukkan Email Anda"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="Nomor Telepon">Nomor Telepon</label>
                  <input
                    type="tel"
                    className="block border border-neutral-60 rounded-lg w-full lg:w-[634px] px-2 py-2 mt-2"
                    placeholder="Masukkan Nomor Anda"
                    name="phone"
                    onChange={handleChange}
                  />
                </div>
                <div className="relative mb-2">
                  <div className="flex flex-col mb-4">
                    <label htmlFor="password">Kata Sandi</label>
                    <div className="absolute py-10 end-2">
                      <label onClick={handleShowPassword}>
                        {showPassword ? (
                          <BiShow className="w-6 h-6 cursor-pointer" />
                        ) : (
                          <BiSolidHide className="w-6 h-6 cursor-pointer" />
                        )}
                      </label>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="block border border-neutral-60 rounded-lg w-full lg:w-[634px] px-2 py-2 mt-2"
                      placeholder="Masukkan Kata Sandi"
                      name="password"
                      onChange={handleChange}
                    />
                    <span className="text-xs text-neutral-100 mt-2" href="#">
                      Kata sandi harus berisi huruf kapital & angka
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="password">Konfirmasi Kata Sandi</label>
                    <div className="absolute py-10 end-2">
                      <label onClick={handleShowPasswordConfirm}>
                        {showPasswordConfirm ? (
                          <BiShow className="w-6 h-6 cursor-pointer" />
                        ) : (
                          <BiSolidHide className="w-6 h-6 cursor-pointer" />
                        )}
                      </label>
                    </div>
                    <input
                      type={showPasswordConfirm ? "text" : "password"}
                      className="block border border-neutral-60 rounded-lg w-full lg:w-[634px] px-2 py-2 mt-2"
                      placeholder="Masukkan Kata Sandi"
                      name="confirm_password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="absolute flex start-0 mt-2 mb-4">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-500 dark:text-gray-300"
                      >
                        <span className="text-sm text-neutral-100">
                          Dengan mendaftar, saya menyatakan telah membaca dan
                          menyetujui Syarat & Ketentuan serta Kebijakan Privasi
                          yang berlaku
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="py-10">
                  <button className="bg-primary-main rounded-lg w-full px-2 py-2 mt-5 text-neutral-10">
                    Daftar
                  </button>
                  <div>
                    <p className="text-center text-base">Atau</p>
                  </div>
                  {/* <div className="relative">
                    <div className="absolute py-4 start-2">
                      <FcGoogle className="w-6 h-6" />
                    </div>
                    <button className="border border-primary-main rounded-lg w-full px-2 py-2 mt-2 text-primary-main">
                      Masuk Dengan Google
                    </button>
                  </div> */}
                  <Link
                    to="/login"
                    className="text-base flex justify-center mt-2"
                  >
                    Sudah punya akun?
                    <button
                      type="button"
                      className="text-primary-main font-bold"
                    >
                      Masuk
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

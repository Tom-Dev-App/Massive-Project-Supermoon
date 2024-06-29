import React, { useState } from "react";
import logo from "../../../assets/logo/KUNINGANTOUR_1.png";
import imgKuningan from "../../../assets/images/Login/kuningan.png";
import { BiSolidHide, BiShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../hooks/useAuth";
import config from "../../../config";


const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL ?? 'localhost:8000/api/'}auth/login`,
        formData
      );

      const token = response?.data?.token;
      const access = response?.data?.access;
      const user = JSON.stringify(response?.data?.user);

      localStorage.setItem("token", token);
      localStorage.setItem("access", JSON.stringify(access)); // Store roles without extra backslashes
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!");
      setAuth({ user, token, roles: access });
      navigate(from, { replace: true });
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

  const handleShow = () => {
    setShow(!show);
  };
  return (
    <>
      <div className="font-productSans flex h-screen justify-center">
        <div className="py-10">
          <img src={logo} alt="Logo" className="mx-auto py-10" />
          <div className="flex lg:flex-row flex-col lg:gap-6">
            <div className="w-full">
              <img
                src={imgKuningan}
                alt="Kuningan"
                className="lg:block hidden"
              />
            </div>
            <div className="w-full px-6 py-6 gap-6">
              <div className="flex flex-col justify-center text-center">
                <h3 className="lg:text-5xl text-3xl font-bold mb-3">
                  Selamat Datang
                </h3>
                <p className="lg:text-base text-sm mb-3">
                  Masukkan identitas anda untuk mengakses fitur
                </p>
              </div>
              <form onSubmit={handleSubmit}>
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
                <div className="relative mb-2">
                  <div className="flex flex-col mb-4">
                    <label htmlFor="password">Kata Sandi</label>
                    <div className="absolute py-10 end-2">
                      <label onClick={handleShow}>
                        {show ? (
                          <BiShow className="w-6 h-6 cursor-pointer" />
                        ) : (
                          <BiSolidHide className="w-6 h-6 cursor-pointer" />
                        )}
                      </label>
                    </div>
                    <input
                      type={show ? "text" : "password"}
                      className="block border border-neutral-60 rounded-lg w-full lg:w-[634px] px-2 py-2 mt-2"
                      placeholder="Masukkan Kata Sandi"
                      name="password"
                      onChange={handleChange}
                    />
                    <span className="text-xs text-neutral-100 mt-2">
                      Kata sandi harus berisi huruf kapital & angka
                    </span>
                  </div>
                  <div className="absolute end-0">
                    <a href="#" className="text-base block">
                      Lupa Kata Sandi?
                    </a>
                  </div>
                </div>
                <div className="py-2">
                  <button className="bg-primary-main rounded-lg  w-full px-2 py-2 mt-4 text-neutral-10">
                    Masuk
                  </button>
                  <Link
                    to="/register"
                    className="text-base flex justify-center mt-2"
                  >
                    Belum punya akun?{" "}
                    <span className="text-primary-main font-bold">Daftar</span>
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

export default Login;

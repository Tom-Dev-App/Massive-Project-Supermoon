import React, { useState } from "react";
import AuthNavbar from "../../components/Navbar/AuthNavbar";
import Footer from "../../components/Footer/Footer";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import data from "../../utils/constants/Blog";
import Navbar from "../../components/Navbar/Navbar";

const DetailBlog = () => {
  const [blogs, setBlogs] = useState(data);
  return (
    <>
      <Navbar />
      <div className="px-28 py-9 font-productSans">
        <Link to="/blog" className="text-3xl">
          <FaArrowLeftLong />
        </Link>
        <h2 className="py-5 text-4xl font-bold">{blogs[0].title}</h2>
        <img
          className="rounded-lg items-center"
          src={blogs[0].image_thumb}
          alt="image"
        />
        <p className="py-5 text-xl tracking-tight text-gray-900">
          {blogs[0].description}
        </p>
      </div>
      <Footer />
    </>
  );
};

export default DetailBlog;

import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import data from "../../../../utils/constants/Blog";
import Navbar from "../../../../components/Navbar/Navbar";
import Footer from "../../../../components/Footer/Footer";
import axios from "axios";

const DetilBlog = () => {
  // const [posts, setPosts] = useState(data);
  const [post, setPost] = useState([]);
  const { slug } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/slug/${slug}`)
      .then((response) => {
        // Handle the successful response here
        console.log("Data from server:", response.data);
        setPost(response.data.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <Navbar />
      <div className="px-28 py-9 font-productSans">
        <Link to="/blog" className="text-3xl">
          <FaArrowLeftLong />
        </Link>
        <h2 className="py-5 text-4xl font-bold">{post?.title}</h2>
        <div className={'md:max-w-[70%] md:max-h-[40%] object-fit  mx-auto'}>
        <img
          className="rounded-lg block"
          src={`http://localhost:8000${post?.img_path}`}
          alt="image"
        />
        </div>
        <p className="py-5 text-xl tracking-tight text-gray-900">
          {post?.content}
        </p>
      </div>
      <Footer />
    </>
  );
};

export default DetilBlog;

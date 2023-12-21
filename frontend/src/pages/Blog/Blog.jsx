import React, { useEffect, useState } from "react";
import AuthNavbar from "../../components/Navbar/AuthNavbar";
import Footer from "../../components/Footer/Footer";
import Wisata from "../../assets/images/Blog/img-1.png";
import CardBlog from "../../components/CardBlog/CardBlog";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import data from "../../utils/constants/Blog";
import axios from "axios";
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [one, setOne] = useState({});
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8000/api/posts");
      setBlogs(response.data.data);
      // console.log(response);
      // setPosts(() => blogs.slice(1));
      // setOne(blogs[0]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let [firstBlog, ...restBlogs] = blogs;
    setOne(firstBlog);
    setPosts(restBlogs);
  }, [blogs]);
  return (
    <>
      <Navbar />
      <div className="px-24 font-productSans">
        <h3 className="py-9 lg:text-5xl text-xl font-bold">
          {one?.title ??
            `Gunung Ciremai: Keindahan Alam dan Peninggalan Sejarah yang
          Mengagumkan`}
        </h3>
        <img
          className="md:max-w-[60%] md:max-h-[40%] object-fit mx-auto block h-full rounded-lg items-center"
          src={`http://localhost:8000${one?.img_path}`}
          alt="image"
        />
        <p className="py-5 lg:text-xl text-base tracking-tight text-gray-900">
          {one?.content ??
            ` Kuningan, 10 November 2023 - Gunung Ciremai, dengan ketinggian 3.078
          meter di atas permukaan laut, terletak megah di perbatasan Provinsi
          Jawa Barat dan Jawa Tengah. Dikenal sebagai titik tertinggi di Jawa
          Barat, gunung ini menawarkan keindahan alam yang memesona dan
          merupakan daya tarik utama bagi para pendaki dan penggemar alam.
          Dengan puncaknya yang menghadap ke Samudera Hindia, Gunung Ciremai
          menyajikan pemandangan matahari terbit yang spektakuler.`}
        </p>
        <div className="flex justify-center p-3">
          <Link
            to={`/blog/detil/${one?.slug}`}
            className="px-4 py-2 text-[16px] font-bold text-center text-primary-main border-solid border-2 border-primary-main bg-primary-surface rounded-lg"
          >
            Detail
          </Link>
        </div>
        <h2 className="py-5 text-4xl font-bold text-primary-main">
          Blog Terkini
        </h2>
        <div className="py-6">
          <div className="grid gap-8 lg:gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <CardBlog key={post.id} blog={post} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Blog;

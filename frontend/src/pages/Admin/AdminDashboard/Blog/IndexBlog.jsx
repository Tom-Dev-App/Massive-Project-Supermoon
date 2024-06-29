import React, { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import SidebarAdmin from "../../../../components/SidebarAdmin/SidebarAdmin";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";

import { FaTrashCan } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import Footer from "../../../../components/Footer/Footer";
import config from "../../../../config";


export default function IndexBlog() {
  const [posts, setPosts] = useState([]);
  const UPDATE_URL = "${import.meta.env.VITE_APP_SERVER_URL ?? 'localhost:8000/api/'}posts";
  useEffect(() => {
    axios
      .get("${import.meta.env.VITE_APP_SERVER_URL ?? 'localhost:8000/api/'}posts")
      .then((response) => {
        // Handle the successful response here
        console.log("Data from server:", response.data);
        setPosts(response.data.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <Navbar />
      <div className="font-productSans bg-[#F7F7FF] flex flex-row">
        <SidebarAdmin />
        <div className="w-full px-6 py-10 overflow-auto">
          <div className="w-full bg-neutral-10 rounded-lg">
            <div className="px-4 py-6">
              <div className="flex lg:flex-row flex-col lg:justify-between px-6 py-10">
                <h1 className="lg:text-2xl text-base font-bold mb-3">
                  Kelola Artikel
                </h1>
                <Link
                  to="/dashboard/artikel/baru"
                  className="w-fit lg:px-4 lg:py-2 px-3 py-2 bg-primary-main rounded-lg text-white lg:text-base text-xs flex gap-3 items-center"
                >
                  <FaPlus className="lg:w-5 lg:h-5 w-3 h-3" />
                  Tambah Artikel
                </Link>
              </div>
              <div className="border border-neutral-30 px-4"></div>
              <div className="flex lg:flex-row flex-col lg:justify-between px-6 py-10">
                <div className="flex flex-row gap-3 items-center mb-3">
                  <p className="lg:text-base text-sm font-semibold">
                    Tampilkan
                  </p>
                  <form>
                    <select className="rounded-lg border block w-full bg-white border-neutral-50 py-2 px-4">
                      <option>5</option>
                      <option>10</option>
                      <option>20</option>
                    </select>
                  </form>
                  <p className="lg:text-base text-sm">Entri</p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <p className="lg:text-base text-sm">Cari</p>
                  <form>
                    <input
                      type="text"
                      placeholder="Cari"
                      className="w-full px-4 py-2 rounded-lg border border-neutral-60 "
                    />
                  </form>
                </div>
              </div>
              <div className="w-full  overflow-x-auto">
                <table className="min-w-full border-collapse border border-neutral-50  rounded-lg">
                  <thead className="bg-primary-main divide-y-1 divide-x-2">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium  tracking-wider text-center text-white uppercase border border-neutral-50">
                        No
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase border border-neutral-50">
                        Judul
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase border border-neutral-50">
                        Status
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase border border-neutral-50">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white border-collapse border border-neutral-50 rounded-lg ">
                    {/* CONTENT */}
                    {Array.isArray(posts) && posts.length > 0 ? (
                      posts.map((post, index) => (
                        <tr key={post.slug}>
                          <td className="px-6 py-4 text-sm whitespace-nowrap border border-neutral-50 text-center">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap border border-neutral-50 text-center">
                            {post?.title}
                          </td>
                          <td className="px-6 py-4 text-sm  border border-neutral-50">
                            {post?.content}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap flex lg:flex-row flex-col gap-3 items-center justify-center">
                            <Link
                              to={`${UPDATE_URL}/${post.slug}`}
                              className="px-4 py-2 bg-[#0D6EFD] rounded-lg"
                            >
                              <BiSolidPencil className="text-white" />
                            </Link>
                            <button
                              onClick={() => openDeleteModal(post?.id)}
                              className="px-4 py-2 bg-[#FD3550] rounded-lg"
                            >
                              <FaTrashCan className="text-white" />
                            </button>
                            {/* <button
                          onClick={() => handleDelete(packet.id)}
                          className="px-4 py-2 bg-[#FD3550] rounded-lg"
                        >
                          <FaTrashCan className="text-white" />
                        </button> */}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-4">
                          Tidak ada artikel.
                        </td>
                      </tr>
                    )}
                    {/* CONTENT */}
                  </tbody>
                </table>
                <nav aria-label="Page navigation example" className="mt-3">
                  <ul className="inline-flex -space-x-px text-sm gap-3">
                    <li>
                      <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-neutral-50 "
                      >
                        <IoIosArrowBack />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight border border-neutral-50"
                      >
                        1
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight border border-neutral-50"
                      >
                        2
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight border border-neutral-50"
                      >
                        3
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight border border-neutral-50"
                      >
                        <IoIosArrowForward />
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

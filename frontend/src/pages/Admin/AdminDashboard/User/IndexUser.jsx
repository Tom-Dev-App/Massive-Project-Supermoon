import React from "react";

import { Link, useParams } from "react-router-dom";
import { BiSolidPencil } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Navbar from "../../../../components/Navbar/Navbar";
import SidebarAdmin from "../../../../components/SidebarAdmin/SidebarAdmin";
import Footer from "../../../../components/Footer/Footer";

const IndexUser = () => {
  const { id } = useParams();
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
                  Kelola Pengguna
                </h1>
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
                      placeholder="Cari Pengguna"
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
                        Nama User
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase border border-neutral-50">
                        Role User
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase border border-neutral-50">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white border-collapse border border-neutral-50 rounded-lg ">
                    <tr className="text-center">
                      <td className="px-6 py-4 text-sm whitespace-nowrap border border-neutral-50">
                        1
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap border border-neutral-50">
                        Admin
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap border border-neutral-50">
                        Administrator
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap flex lg:flex-row flex-col gap-3 items-center justify-center">
                        <Link
                          to={`/dashboard/user/detil/${id}`}
                          className="px-4 py-2 bg-[#0D6EFD] rounded-lg"
                        >
                          <BiSolidPencil className="text-white" />
                        </Link>
                        <Link className="px-4 py-2 bg-[#FD3550] rounded-lg">
                          <FaTrashCan className="text-white" />
                        </Link>
                      </td>
                    </tr>
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
};

export default IndexUser;

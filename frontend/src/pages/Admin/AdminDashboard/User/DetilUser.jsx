import React from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../../components/Navbar/Navbar";
import SidebarAdmin from "../../../../components/SidebarAdmin/SidebarAdmin";
import Footer from "../../../../components/Footer/Footer";

const DetilUser = () => {
  const { id } = useParams();
  return (
    <>
      <Navbar />
      <div className="font-productSans bg-[#F7F7FF] flex flex-row">
        <SidebarAdmin />
        <div className="w-full px-4 py-10 overflow-x-auto">
          <div className="w-full bg-neutral-10 rounded-lg mb-10 px-4 py-8">
            <div className="px-4 py-6">
              <div className="w-full">
                <div className="m-8">
                  <h6 className="lg:text-3xl text-xl font-bold tracking-tight text-gray-900">
                    Form Edit User
                  </h6>
                </div>

                <div className="m-8">
                  <div className="my-5">
                    <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                      Nama
                    </h6>
                    <div className="relative flex items-center gap-2">
                      <input
                        type="text"
                        name="search"
                        placeholder="Judul Artikel"
                        className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                      />
                    </div>
                  </div>
                  <div className="my-5">
                    <h6 className="lg:text-lg text-sm tracking-tight text-gray-900">
                      Role
                    </h6>
                    <div className="relative flex items-center gap-2">
                      <input
                        type="text"
                        name="search"
                        className="w-full border border-neutral-50 rounded-lg py-2 px-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex lg:flex-row flex-col justify-start m-8 gap-3">
                <Link
                  to="/dashboard/user"
                  className="lg:px-4 px-2 py-2 lg:text-base text-sm rounded-lg text-center border-solid border-2 text-white bg-primary-main border-primary-main"
                >
                  Publish
                </Link>
                <Link
                  to="/dashboard/user"
                  className="lg:px-4 px-2 py-2 lg:text-base text-sm rounded-lg text-center border-solid border-2 text-primary-main bg-primary-surface border-primary-main"
                >
                  Batal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetilUser;

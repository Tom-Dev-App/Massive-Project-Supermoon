import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Navbar from "../../../../components/Navbar/Navbar";
import SidebarAdmin from "../../../../components/SidebarAdmin/SidebarAdmin";
import Footer from "../../../../components/Footer/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Modal from "react-modal";

const IndexPaketWisata = () => {
  const [tourPackets, setTourPackets] = useState([]);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [packetToDelete, setPacketToDelete] = useState(null);

  useEffect(() => {
    const fetchTourPackets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/tour-packets"
        );
        console.log(response?.data);
        setTourPackets(response.data.data.tour_packets);
      } catch (error) {
        console.error("Error fetching tour packets:", error);
      }
    };

    fetchTourPackets();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/tour-packets/delete/${packetToDelete}`
      );
      toast.success(response.data.message);
      // Update the state to reflect the changes
      setTourPackets(
        tourPackets.filter((packet) => packet.id !== packetToDelete)
      );
      closeDeleteModal(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting tour packet:", error);
      toast.error("Error deleting tour packet!");
    }
  };

  const openDeleteModal = (id) => {
    setPacketToDelete(id);
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setPacketToDelete(null);
    setDeleteModalIsOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Confirmation"
        className="modal"
        // overlayClassName="overlay"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 99999999999999999,
        }}
      >
        <div
          className="p-8 bg-primary-main surface rounded-lg"
          style={{
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2 className="text-white">Hapus</h2>
          <p className="text-white">Hapus Paket Wisata?</p>
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-secondary-main rounded-lg"
            >
              Ya
            </button>
            <button
              onClick={closeDeleteModal}
              className="px-4 py-2 bg-neutral-50 text-neutral-100 rounded-lg"
            >
              Tidak
            </button>
          </div>
        </div>
      </Modal>
      <Navbar />
      <div className="font-productSans bg-[#F7F7FF] flex flex-row">
        <SidebarAdmin />
        <div className="w-full px-6 py-10 overflow-auto">
          <div className="w-full bg-neutral-10 rounded-lg">
            <div className="px-4 py-6">
              <div className="flex lg:flex-row flex-col lg:justify-between px-6 py-10">
                <h1 className="lg:text-2xl text-base font-bold mb-3">
                  Kelola Paket Wisata
                </h1>
                <Link
                  to="/dashboard/paket-wisata/baru"
                  className="w-fit lg:px-4 lg:py-2 px-3 py-2 bg-primary-main rounded-lg text-white lg:text-base text-xs flex gap-3 items-center"
                >
                  <FaPlus className="lg:w-5 lg:h-5 w-3 h-3" />
                  Tambah Paket Wisata
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
                <table className="min-w-full border-collapse border border-neutral-50 rounded-lg">
                  <thead className="bg-primary-main divide-y-1 divide-x-2">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase border border-neutral-50">
                        No
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase border border-neutral-50">
                        Judul Paket
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase border border-neutral-50">
                        Isi Artikel Paket
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase border border-neutral-50">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white border-collapse border border-neutral-50 rounded-lg">
                    {Array.isArray(tourPackets) && tourPackets.length > 0 ? (
                      tourPackets.map((packet, index) => (
                        <tr key={packet.id}>
                          <td className="px-6 py-4 text-sm whitespace-nowrap border border-neutral-50 text-center">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap border border-neutral-50 text-center">
                            {packet.title}
                          </td>
                          <td className="px-6 py-4 text-sm  border border-neutral-50">
                            {packet.description}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap flex lg:flex-row flex-col gap-3 items-center justify-center">
                            <Link
                              to={`/dashboard/paket-wisata/edit/${packet.slug}`}
                              className="px-4 py-2 bg-[#0D6EFD] rounded-lg"
                            >
                              <BiSolidPencil className="text-white" />
                            </Link>
                            <button
                              onClick={() => openDeleteModal(packet.id)}
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
                          Tidak ada paket wisata.
                        </td>
                      </tr>
                    )}
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

export default IndexPaketWisata;

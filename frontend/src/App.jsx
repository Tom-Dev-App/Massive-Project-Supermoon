import { Routes, Route } from "react-router-dom";
import Login from "./pages/Authentikasi/Login/Login";
import Register from "./pages/Authentikasi/Register/Register";
import Beranda from "./pages/Beranda/Beranda";
import Kontak from "./pages/Kontak/Kontak";
import TentangKami from "./pages/TentangKami/TentangKami";
import Blog from "./pages/Blog/Blog";
import DetailBlog from "./pages/Admin/AdminDashboard/Blog/DetilBlog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import NotFound from "./pages/NotFound/NotFound";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./middleware/RequireAuth";
import PublicRoute from "./middleware/PublicRoute";
import useAuth from "./hooks/useAuth";

import IndexPaketWisata from "./pages/Admin/AdminDashboard/PaketWisata/IndexPaketWisata";
import EditPaketWisata from "./pages/Admin/AdminDashboard/PaketWisata/EditPaketWisata";
import BuatPaketWisata from "./pages/Admin/AdminDashboard/PaketWisata/BuatPaketWisata";
import DetilPaketWisata from "./pages/Admin/AdminDashboard/PaketWisata/DetilPaketWisata";

import IndexWisata from "./pages/Admin/AdminDashboard/Wisata/IndexWisata";
import BuatWisata from "./pages/Admin/AdminDashboard/Wisata/BuatWisata";
import EditWisata from "./pages/Admin/AdminDashboard/Wisata/EditWisata";
import DetilWisata from "./pages/Admin/AdminDashboard/Wisata/DetilWisata";

import IndexPenginapan from "./pages/Admin/AdminDashboard/Penginapan/IndexPenginapan";
import BuatPenginapan from "./pages/Admin/AdminDashboard/Penginapan/BuatPenginapan";
import EditPenginapan from "./pages/Admin/AdminDashboard/Penginapan/EditPenginapan";
import DetilPenginapan from "./pages/Admin/AdminDashboard/Penginapan/DetilPenginapan";

import IndexKuliner from "./pages/Admin/AdminDashboard/Kuliner/IndexKuliner";
import BuatKuliner from "./pages/Admin/AdminDashboard/Kuliner/BuatKuliner";
import EditKuliner from "./pages/Admin/AdminDashboard/Kuliner/EditKuliner";
import DetilKuliner from "./pages/Admin/AdminDashboard/Kuliner/DetilKuliner";

import IndexTransaksi from "./pages/Admin/AdminDashboard/Transaksi/IndexTransaksi";
import DetilTransaksi from "./pages/Admin/AdminDashboard/Transaksi/DetilTransaksi";

import IndexBlog from "./pages/Admin/AdminDashboard/Blog/IndexBlog";
import BuatBlog from "./pages/Admin/AdminDashboard/Blog/BuatBlog";
import EditBlog from "./pages/Admin/AdminDashboard/Blog/EditBlog";
import DetilBlog from "./pages/Admin/AdminDashboard/Blog/DetilBlog";

import PaketWisata from "./pages/Public/PaketWisata";
import Wisata from "./pages/Public/Wisata";
import Checkout from "./pages/User/Checkout/Checkout";

import DetilPembayaran from "./pages/User/UserDashboard/Pembayaran/DetilPembayaran";
import IndexPembayaran from "./pages/User/UserDashboard/Pembayaran/IndexPembayaran";
import MyDashboard from "./pages/User/UserDashboard/Mydashboard";
import Akun from "./pages/User/UserDashboard/Akun";

import DetilUser from "./pages/Admin/AdminDashboard/User/DetilUser";
import IndexUser from "./pages/Admin/AdminDashboard/User/IndexUser";

import IndexKomentar from "./pages/Admin/AdminDashboard/Komentar/IndexKomentar";

const ROLES = {
  CLIENT: "8912",
  ADMIN: "6501",
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Beranda />} />
          <Route
            path="/login"
            element={<PublicRoute element={<Login />} redirectTo="/" />}
          />
          <Route
            path="/register"
            element={<PublicRoute element={<Register />} redirectTo="/" />}
          />
          {/* STATIC */}
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/tentangkami" element={<TentangKami />} />

          {/* DYNAMIC */}
          {/* BLOG */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/detil/:slug" element={<DetailBlog />} />
          <Route
            path="/dashboard/paket-wisata/detil/:slug"
            element={<DetilPaketWisata />}
          />
          {/* PAKET WISATA */}
          <Route path="/paket-wisata" element={<PaketWisata />} />
          {/* WISATA */}
          <Route path="/wisata" element={<Wisata />} />
          <Route
            path="/dashboard/wisata/detil/:slug"
            element={<DetilWisata />}
          />
          {/* <Route path="/wisata/detail-wisata/:slug" element={<DetilWisata />} /> */}
          {/* DETIL PENGINAPAN/KULINER */}
          <Route
            path="/dashboard/penginapan/detil/:slug"
            element={<DetilPenginapan />}
          />
          {/* <Route
            path="/dashboard/penginapan/:id"
            element={<DetilPenginapan />}
          /> */}

          {/* DAHSBOARD ADMIN */}
          <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
            {/* PAKET WISATA */}
            <Route
              path="/dashboard/paket-wisata"
              element={<IndexPaketWisata />}
            />
            <Route
              path="/dashboard/paket-wisata/baru"
              element={<BuatPaketWisata />}
            />
            <Route
              path="/dashboard/paket-wisata/edit/:slug"
              element={<EditPaketWisata />}
            />

            {/* END PAKET WISATA */}
            {/* WISATA */}
            <Route path="/dashboard/wisata" element={<IndexWisata />} />
            <Route path="/dashboard/wisata/baru" element={<BuatWisata />} />
            <Route
              path="/dashboard/wisata/edit/:slug"
              element={<EditWisata />}
            />

            {/* END WISATA */}
            {/* KULINER */}
            <Route path="/dashboard/kuliner" element={<IndexKuliner />} />
            <Route path="/dashboard/kuliner/baru" element={<BuatKuliner />} />
            <Route
              path="/dashboard/kuliner/edit/:slug"
              element={<EditKuliner />}
            />
            <Route
              path="/dashboard/kuliner/detil/:slug"
              element={<DetilKuliner />}
            />
            {/* END KULINER */}
            {/* PENGINAPAN */}
            <Route path="/dashboard/penginapan" element={<IndexPenginapan />} />
            <Route
              path="/dashboard/penginapan/baru"
              element={<BuatPenginapan />}
            />
            <Route
              path="/dashboard/penginapan/edit/:slug"
              element={<EditPenginapan />}
            />
            <Route path="/dashboard/penginapan" element={<IndexPenginapan />} />
            {/* <Route path="/dashboard/penginapan/detil" element={<DetilWisataPenginapan />} /> */}
            {/* END PENGINAPAN */}
            {/* BLOG */}
            <Route path="/dashboard/artikel" element={<IndexBlog />} />
            <Route path="/dashboard/artikel/baru" element={<BuatBlog />} />
            <Route
              path="/dashboard/artikel/edit/:slug"
              element={<EditBlog />}
            />
            {/* END BLOG */}
            {/* USER */}
            <Route path="/dashboard/user" element={<IndexUser />} />
            {/* <Route path="/dashboard/user/baru" element={<BuatUser />} /> */}
            {/* <Route path="/dashboard/user/edit/:id" element={<EditUser />} /> */}
            <Route path="/dashboard/user/detil/:id" element={<DetilUser />} />
            {/* END USER */}
            {/* TRANSAKSI */}
            <Route path="/dashboard/transaksi" element={<IndexTransaksi />} />
            <Route
              path="/dashboard/transaksi/detil/:id"
              element={<DetilTransaksi />}
            />
            {/* <Route path="/dashboard/transaksi/edit" element={<EditTransaksi />} /> */}
            {/* END TRANSAKSI */}
            {/* KOMENTAR */}
            <Route path="/dashboard/komentar" element={<IndexKomentar />} />
          </Route>
          {/* END OF DASHBOARD ADMIN */}

          {/* USERS */}
          <Route element={<RequireAuth allowedRoles={[ROLES.CLIENT]} />}>
            <Route path="/mydashboard" element={<MyDashboard />} />
            <Route
              path="/mydashboard/transaksi"
              element={<IndexPembayaran />}
            />
            <Route
              path="/mydashboard/transaksi/detil/:id"
              element={<DetilPembayaran />}
            />
            <Route path="/paket-wisata/beli/:id" element={<Checkout />} />
            <Route path="/mydashboard/akun" element={<Akun />} />
          </Route>
          {/* END OF USERS */}

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

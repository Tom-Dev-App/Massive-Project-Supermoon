import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Beranda from "./pages/Beranda/Beranda";
import Blog from "./pages/Blog/Blog";
import Wisata from "./pages/Wisata/Wisata";
import Kontak from "./pages/Kontak/Kontak";
import TentangKami from "./pages/TentangKami/TentangKami";
import Login from "./pages/Autentikasi/Login/Login";
import Register from "./pages/Autentikasi/Register/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/wisata" element={<Wisata />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/tentangkami" element={<TentangKami />} />
        <Route path="/tentangkami" element={<TentangKami />} />
        <Route path="/masuk" element={<Login />} />
        <Route path="/daftar" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

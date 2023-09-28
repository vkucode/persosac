import { Routes, Route } from "react-router-dom";
import Accueil from "./components/Accueil";
import Contact from "./components/Contact";
// import Info from "./components/Info";
// import Legales from "./components/Legales";
import Navbar from "./components/elements/Navbar";
import Footer from "./components/elements/Footer";
import Boutique from "./components/Boutique";
// import Success from "./components/statusPy/Success";
// import Cancel from "./components/statusPy/Cancel";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/" element={<Accueil />} />
        <Route path="/accueil" element={<Accueil />} />
        {/* <Route path="/info" element={<Info />} />
        <Route path="/legales" element={<Legales />} /> */}
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

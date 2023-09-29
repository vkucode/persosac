import { Routes, Route } from "react-router-dom";
import Accueil from "./components/Accueil";
import Contact from "./components/Contact";
import Navbar from "./components/elements/Navbar";
import Footer from "./components/elements/Footer";
import Boutique from "./components/Boutique";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

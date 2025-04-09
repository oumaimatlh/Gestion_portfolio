import { Routes, Route } from "react-router-dom";
import FormulaireProfil from "./Portfolio/Prof/FormulaireProfil";
import LoginProfesseur from "./Portfolio/Prof/LoginProfesseur";
import PortfolioProf from "./Portfolio/Prof/PortfolioProf";
import Search from "./Home/Search";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Search />} />

      <Route path="/login" element={<LoginProfesseur />} />
      <Route path="/profil" element={<FormulaireProfil />} />
      <Route path="/portfolio" element={<PortfolioProf />} />
    </Routes>
  );
}

export default App;

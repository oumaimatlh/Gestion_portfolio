import { Routes, Route } from "react-router-dom";
import FormulaireProfil from "./Portfolio/Prof/FormulaireProfil";
import LoginProfesseur from "./Portfolio/Prof/LoginProfesseur";
import PortfolioProf from "./Portfolio/Prof/PortfolioProf";
import Accueil from "./Portfolio/Admin/Accueil"
import Login from "./Portfolio/Admin/Login"

import Search from "./Home/Search";
import Grade from "./Portfolio/Admin/Dashboard/Grade";
import Departement from "./Portfolio/Admin/Dashboard/Departement";
import Laboratoire from "./Portfolio/Admin/Dashboard/Laboratoire";
import Equipe from "./Portfolio/Admin/Dashboard/Equipe";

function App() {
  return (
    <Routes>
      <Route path="/Portfolio/Admin/Login" element={<Login />} />

      <Route path='/' element={<Search />} />
      <Route path="/Accueil" element={<Accueil />} />
      <Route path="/admin/Dashboard/Grade" element={<Grade />} />
      <Route path="/admin/Dashboard/Laboratoire" element={<Laboratoire />} />
      <Route path="/admin/Dashboard/Equipe" element={<Equipe />} />
      <Route path="/admin/Dashboard/Departement" element={<Departement />} />

      <Route path="/login" element={<LoginProfesseur />} />
      <Route path="/profil" element={<FormulaireProfil />} />
      <Route path="/portfolio" element={<PortfolioProf />} />
    </Routes>
  );
}

export default App;

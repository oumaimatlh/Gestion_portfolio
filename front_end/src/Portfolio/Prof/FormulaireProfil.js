// src/Portfolio/FormulaireProfil.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const FormulaireProfil = () => {
  const professeur = useSelector((state) => state.auth.professeur);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    grade: "",
    telephone: "",
    departement_id: "",
    laboratoire_id: "",
    equipe_id: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/professeurs/${professeur.id}`, formData);
      alert("Profil mis à jour !");
    } catch (err) {
      alert("Erreur lors de la mise à jour.");
    }
  };

  return (
    <div className="profil-form">
      <h2>Compléter votre profil</h2>
      <form onSubmit={handleSubmit}>
        <input name="nom" placeholder="Nom" onChange={handleChange} />
        <input name="prenom" placeholder="Prénom" onChange={handleChange} />
        <input name="grade" placeholder="Grade" onChange={handleChange} />
        <input name="telephone" placeholder="Téléphone" onChange={handleChange} />
        <input name="departement_id" placeholder="Département ID" onChange={handleChange} />
        <input name="laboratoire_id" placeholder="Laboratoire ID" onChange={handleChange} />
        <input name="equipe_id" placeholder="Équipe ID" onChange={handleChange} />
        <button type="submit">Sauvegarder</button>
      </form>
    </div>
  );
};

export default FormulaireProfil;

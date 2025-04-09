// src/Portfolio/PortfolioProf.js
import React from "react";
import { useSelector } from "react-redux";

const PortfolioProf = () => {
  const professeur = useSelector((state) => state.auth.professeur);

  if (!professeur) return <p>Veuillez vous connecter pour voir votre portfolio.</p>;

  return (
    <div className="portfolio">
      <h2>Bienvenue {professeur.nom} {professeur.prenom}</h2>
      <p><strong>Grade :</strong> {professeur.grade}</p>
      <p><strong>Téléphone :</strong> {professeur.telephone}</p>
      <p><strong>Email :</strong> {professeur.email}</p>
      <p><strong>Département :</strong> {professeur.departement?.nom}</p>
      <p><strong>Laboratoire :</strong> {professeur.laboratoire?.nom}</p>
      <p><strong>Équipe :</strong> {professeur.equipe?.nom}</p>
    </div>
  );
};

export default PortfolioProf;

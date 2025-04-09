// src/Portfolio/LoginProfesseur.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const LoginProfesseur = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login", { email, password });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.professeur });
    } catch (err) {
      alert("Erreur de connexion !");
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion Professeur</h2>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginProfesseur;

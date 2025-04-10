import React, { useState } from 'react';
import axios from 'axios';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/admin/login', {
        email,
        mot_de_passe: motDePasse
      }, {
        withCredentials: true // pour activer les cookies de session
      });

      if (response.data.success) {
        alert('Connexion réussie');
        // rediriger vers le dashboard
        window.location.href = '/admin/dashboard';
      } else {
        setError(response.data.message || 'Échec de connexion');
      }
    } catch (err) {
      setError('Erreur lors de la connexion');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Connexion Administrateur</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </div>

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default AdminLogin;

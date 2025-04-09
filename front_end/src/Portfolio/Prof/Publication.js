import React, { useState } from 'react';
import axios from 'axios';

const PublicationForm = ({ onSave }) => {
  const [contenu, setContenu] = useState('');
  const [datePublication, setDatePublication] = useState('');
  const [professeurId, setProfesseurId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation simple
    if (!contenu || !datePublication || !professeurId) {
      setError('Tous les champs sont requis.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/publications', {
        contenu,
        date_publication: datePublication,
        professeur_id: professeurId,
      });
      
      onSave(response.data); // Appel de la fonction onSave avec les données de la publication
      setContenu('');
      setDatePublication('');
      setProfesseurId('');
    } catch (err) {
      // Afficher l'erreur détaillée venant du backend
      console.error(err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || 'Erreur lors de la soumission de la publication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      
      <input 
        type="text" 
        value={contenu} 
        onChange={(e) => setContenu(e.target.value)} 
        placeholder="Contenu de la publication" 
        required 
      />

      <input 
        type="date" 
        value={datePublication} 
        onChange={(e) => setDatePublication(e.target.value)} 
        required 
      />

      <input 
        type="number" 
        value={professeurId} 
        onChange={(e) => setProfesseurId(e.target.value)} 
        placeholder="ID du professeur" 
        required 
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Envoi...' : 'Soumettre'}
      </button>
    </form>
  );
};

export default PublicationForm;

import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PublicationForm = () => {
  const [form, setForm] = useState({
    titre: '',
    contenu: '',
    date_publication: '',
    professeur_id: '',
  });

  const [professeurs, setProfesseurs] = useState([]);

  useEffect(() => {
    // Récupération de la liste des professeurs depuis l'API
    fetch('http://localhost:8000/api/professeurs')
      .then((res) => res.json())
      .then((data) => setProfesseurs(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (value) => {
    setForm({ ...form, contenu: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/publications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Publication ajoutée avec succès !');
      console.log(result);
    } else {
      alert('Erreur lors de l’enregistrement.');
      console.error(result);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <input
        type="text"
        name="titre"
        placeholder="Titre de la publication"
        value={form.titre}
        onChange={handleChange}
        required
      />

      <ReactQuill
        theme="snow"
        value={form.contenu}
        onChange={handleQuillChange}
        placeholder="Contenu de la publication (comme Word)"
      />

      <input
        type="date"
        name="date_publication"
        value={form.date_publication}
        onChange={handleChange}
        required
      />

      <select
        name="professeur_id"
        value={form.professeur_id}
        onChange={handleChange}
        required
      >
        <option value="">-- Sélectionner un professeur --</option>
        {professeurs.map((prof) => (
          <option key={prof.id} value={prof.id}>
            {prof.nom} {prof.prenom}
          </option>
        ))}
      </select>

      <button type="submit">Créer la publication</button>
    </form>
  );
};

export default PublicationForm;

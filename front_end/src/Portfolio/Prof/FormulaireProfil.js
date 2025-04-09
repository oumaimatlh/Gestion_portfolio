import React, { useState, useEffect } from 'react';

const ProfesseurForm = () => {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    code_authentification: '',
    mot_de_passe: '',
    scopus: '',
    orcid: '',
    scholar: '',
    photo: null,
    id_administrateur: '',
    id_equipe: '',
    id_grade: '',
  });

  const [admins, setAdmins] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/administrateurs').then(res => res.json()).then(setAdmins);
    fetch('http://localhost:8000/api/equipes').then(res => res.json()).then(setEquipes);
    fetch('http://localhost:8000/api/grades').then(res => res.json()).then(setGrades);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });

    const response = await fetch('http://localhost:8000/api/professeurs', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) alert('Professeur ajouté avec succès !');
    else alert('Erreur lors de l’ajout.');
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4 p-4 bg-white rounded shadow">
      <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required />
      <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="telephone" placeholder="Téléphone" onChange={handleChange} required />
      <input type="text" name="code_authentification" placeholder="Code d'authentification" onChange={handleChange} required />
      <input type="password" name="mot_de_passe" placeholder="Mot de passe" onChange={handleChange} required />
      <input type="text" name="scopus" placeholder="Scopus" onChange={handleChange} />
      <input type="text" name="orcid" placeholder="ORCID" onChange={handleChange} />
      <input type="text" name="scholar" placeholder="Google Scholar" onChange={handleChange} />
      <input type="file" name="photo" onChange={handleChange} />

      <select name="id_administrateur" onChange={handleChange} required>
        <option value="">-- Choisir un administrateur --</option>
        {admins.map(admin => (
          <option key={admin.id} value={admin.id}>{admin.nom}</option>
        ))}
      </select>

      <select name="id_equipe" onChange={handleChange} required>
        <option value="">-- Choisir une équipe --</option>
        {equipes.map(equipe => (
          <option key={equipe.id} value={equipe.id}>{equipe.nom}</option>
        ))}
      </select>

      <select name="id_grade" onChange={handleChange} required>
        <option value="">-- Choisir un grade --</option>
        {grades.map(grade => (
          <option key={grade.id} value={grade.id}>{grade.nom}</option>
        ))}
      </select>

      <button type="submit">Ajouter Professeur</button>
    </form>
  );
};

export default ProfesseurForm;

import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Personnalisation de la barre d'outils de React Quill
const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ 'align': [] }],
    ['link', 'image'],
    [{ 'color': [] }, { 'background': [] }], // Ajout des outils de couleur
    ['clean'] // Bouton pour nettoyer la mise en forme
  ],
};

const PublicationForm = ({ publication = null, onSave }) => {
  const [content, setContent] = useState(publication ? publication.content : '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      setError('Le contenu est requis');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = publication ? `/api/publications/${publication.id}` : '/api/publications';
      const method = publication ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: { content },
      });

      onSave(response.data);
      setContent('');
    } catch (err) {
      setError('Erreur lors de la soumission');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <ReactQuill
        value={content}
        onChange={setContent}
        theme="snow"
        modules={modules} // Application des modules
        placeholder="Écrire votre publication ici"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'En cours...' : 'Soumettre'}
      </button>
    </form>
  );
};

export default PublicationForm;

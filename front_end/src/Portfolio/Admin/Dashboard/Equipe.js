import { useState, useEffect } from 'react';
import { fetchEquipes, createEquipe, updateEquipe, deleteEquipe, fetchLaboratoires } from '../../../store/Data';

function Equipe() {
  const [equipes, setEquipes] = useState([]);
  const [nom, setNom] = useState('');
  const [idLaboratoire, setIdLaboratoire] = useState('');
  const [laboratoires, setLaboratoires] = useState([]); // Liste des laboratoires
  const [editingEquipe, setEditingEquipe] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); // Pour afficher les erreurs

  useEffect(() => {
    loadEquipes();
    loadLaboratoires(); // Charger les laboratoires au chargement du composant
  }, []);

  const loadEquipes = async () => {
    try {
      const data = await fetchEquipes();
      setEquipes(data);
    } catch (error) {
      setErrorMessage('Erreur lors du chargement des équipes');
      console.error('Erreur lors du chargement des équipes', error);
    }
  };

  const loadLaboratoires = async () => {
    try {
      const data = await fetchLaboratoires();
      setLaboratoires(data);
    } catch (error) {
      setErrorMessage('Erreur lors du chargement des laboratoires');
      console.error('Erreur lors du chargement des laboratoires', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation simple
    if (!nom || !idLaboratoire) {
      setErrorMessage('Tous les champs doivent être remplis');
      return;
    }
    setErrorMessage('');

    try {
      if (editingEquipe) {
        await updateEquipe(editingEquipe.id, { nom, id_laboratoire: idLaboratoire });
        setNom('');
        setIdLaboratoire('');
        setEditingEquipe(null);
      } else {
        await createEquipe({ nom, id_laboratoire: idLaboratoire });
        setNom('');
        setIdLaboratoire('');
      }
      loadEquipes(); // Recharger la liste des équipes
    } catch (error) {
      setErrorMessage('Erreur lors de la création ou mise à jour de l\'équipe');
      console.error('Erreur lors de la création ou mise à jour de l\'équipe', error);
    }
  };

  const handleEdit = (equipe) => {
    setNom(equipe.nom);
    setIdLaboratoire(equipe.id_laboratoire);
    setEditingEquipe(equipe);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEquipe(id);
      loadEquipes(); // Recharger la liste après suppression
    } catch (error) {
      setErrorMessage('Erreur lors de la suppression de l\'équipe');
      console.error('Erreur lors de la suppression de l\'équipe', error);
    }
  };

  return (
    <div>
      <h2>{editingEquipe ? 'Modifier une équipe' : 'Ajouter une équipe'}</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Affichage de l'erreur */}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom de l'équipe"
        />
        <select
          value={idLaboratoire}
          onChange={(e) => setIdLaboratoire(e.target.value)}
        >
          <option value="">Sélectionner un laboratoire</option>
          {laboratoires.map((laboratoire) => (
            <option key={laboratoire.id} value={laboratoire.id}>
              {laboratoire.nom}
            </option>
          ))}
        </select>
        <button type="submit">{editingEquipe ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>

      <h3>Liste des équipes</h3>
      <ul>
        {equipes.map((e) => (
          <li key={e.id}>
            {e.nom} (Laboratoire: {e.id_laboratoire}) {/* Affichage du laboratoire */}
            <button onClick={() => handleEdit(e)}>Modifier</button>
            <button onClick={() => handleDelete(e.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Equipe;

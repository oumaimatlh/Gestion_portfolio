import { useState, useEffect } from 'react';
import { fetchEquipes, createEquipe, updateEquipe, deleteEquipe, fetchLaboratoires } from '../../../store/Data';

function Equipe() {
  const [equipes, setEquipes] = useState([]);
  const [nom, setNom] = useState('');
  const [idLaboratoire, setIdLaboratoire] = useState('');
  const [laboratoires, setLaboratoires] = useState([]); // Liste des laboratoires
  const [editingEquipe, setEditingEquipe] = useState(null);

  useEffect(() => {
    loadEquipes();
    loadLaboratoires(); // Charger les laboratoires au chargement du composant
  }, []);

  const loadEquipes = async () => {
    try {
      const data = await fetchEquipes();
      setEquipes(data);
    } catch (error) {
      console.error('Erreur lors du chargement des équipes', error);
    }
  };

  const loadLaboratoires = async () => {
    try {
      const data = await fetchLaboratoires();
      setLaboratoires(data);
    } catch (error) {
      console.error('Erreur lors du chargement des laboratoires', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingEquipe) {
      try {
        await updateEquipe(editingEquipe.id, { nom, id_laboratoire: idLaboratoire });
        setNom('');
        setIdLaboratoire('');
        setEditingEquipe(null);
        loadEquipes();
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'équipe', error);
      }
    } else {
      try {
        await createEquipe({ nom, id_laboratoire: idLaboratoire });
        setNom('');
        setIdLaboratoire('');
        loadEquipes();
      } catch (error) {
        console.error('Erreur lors de la création de l\'équipe', error);
      }
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
      loadEquipes();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'équipe', error);
    }
  };

  return (
    <div>
      <h2>{editingEquipe ? 'Modifier une équipe' : 'Ajouter une équipe'}</h2>
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
            {e.nom} (Laboratoire ID: {e.id_laboratoire})
            <button onClick={() => handleEdit(e)}>Modifier</button>
            <button onClick={() => handleDelete(e.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Equipe;

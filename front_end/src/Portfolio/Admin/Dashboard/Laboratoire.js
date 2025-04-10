import { useEffect, useState } from 'react';
import { fetchLaboratoires, createLaboratoire, updateLaboratoire, deleteLaboratoire } from '../../../store/Data'; // Assure-toi d'ajouter les fonctions correspondantes dans `Data.js`
import { fetchDepartements } from '../../../store/Data';

function Laboratoire() {
  const [laboratoires, setLaboratoires] = useState([]);
  const [nom, setNom] = useState('');
  const [departements, setDepartements] = useState([]);
  const [idDepartement, setIdDepartement] = useState('');
  const [editingLaboratoire, setEditingLaboratoire] = useState(null);

  // Charger la liste des laboratoires et départements
  useEffect(() => {
    loadLaboratoires();
    loadDepartements();
  }, []);

  const loadLaboratoires = async () => {
    try {
      const data = await fetchLaboratoires();
      setLaboratoires(data);
    } catch (error) {
      console.error('Erreur lors du chargement des laboratoires', error);
    }
  };

  const loadDepartements = async () => {
    try {
      const data = await fetchDepartements();
      setDepartements(data);
    } catch (error) {
      console.error('Erreur lors du chargement des départements', error);
    }
  };

  // Gérer la soumission pour créer ou mettre à jour un laboratoire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingLaboratoire) {
      // Si un laboratoire est en édition, on met à jour
      try {
        await updateLaboratoire(editingLaboratoire.id, { nom, id_departement: idDepartement });
        setNom('');
        setIdDepartement('');
        setEditingLaboratoire(null); // Réinitialiser l'édition
        loadLaboratoires(); // Recharger les laboratoires
      } catch (error) {
        console.error('Erreur lors de la mise à jour du laboratoire', error);
      }
    } else {
      // Sinon, on crée un nouveau laboratoire
      try {
        await createLaboratoire({ nom, id_departement: idDepartement });
        setNom('');
        setIdDepartement('');
        loadLaboratoires(); // Recharger les laboratoires
      } catch (error) {
        console.error('Erreur lors de la création du laboratoire', error);
      }
    }
  };

  // Gérer la modification d'un laboratoire
  const handleEdit = (laboratoire) => {
    setNom(laboratoire.nom);
    setIdDepartement(laboratoire.id_departement);
    setEditingLaboratoire(laboratoire); // Définir le laboratoire à modifier
  };

  // Gérer la suppression d'un laboratoire
  const handleDelete = async (id) => {
    try {
      await deleteLaboratoire(id);
      loadLaboratoires(); // Recharger les laboratoires
    } catch (error) {
      console.error('Erreur lors de la suppression du laboratoire', error);
    }
  };

  return (
    <div>
      <h2>{editingLaboratoire ? 'Modifier un laboratoire' : 'Ajouter un laboratoire'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom du laboratoire"
        />
        <select
          value={idDepartement}
          onChange={(e) => setIdDepartement(e.target.value)}
        >
          <option value="">Sélectionnez un département</option>
          {departements.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nom}
            </option>
          ))}
        </select>
        <button type="submit">{editingLaboratoire ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>

      <h3>Liste des laboratoires</h3>
      <ul>
        {laboratoires.map((l) => (
          <li key={l.id}>
            {l.nom} (Département: {l.departement.nom})
            <button onClick={() => handleEdit(l)}>Modifier</button>
            <button onClick={() => handleDelete(l.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Laboratoire;

import { useEffect, useState } from 'react';
import { fetchDepartements, createDepartement, updateDepartement, deleteDepartement } from '../../../store/Data';

function Departement() {
  const [departements, setDepartements] = useState([]);
  const [nom, setNom] = useState('');
  const [editingDepartement, setEditingDepartement] = useState(null);

  // Charger la liste des départements
  useEffect(() => {
    loadDepartements();
  }, []);

  const loadDepartements = async () => {
    try {
      const data = await fetchDepartements();
      setDepartements(data);
    } catch (error) {
      console.error('Erreur lors du chargement des départements', error);
    }
  };

  // Gérer la soumission pour créer ou mettre à jour un département
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingDepartement) {
      // Si un département est en édition, on met à jour
      try {
        await updateDepartement(editingDepartement.id, { nom });
        setNom('');
        setEditingDepartement(null); // Réinitialiser l'édition
        loadDepartements(); // Recharger les départements
      } catch (error) {
        console.error('Erreur lors de la mise à jour du département', error);
      }
    } else {
      // Sinon, on crée un nouveau département
      try {
        await createDepartement({ nom });
        setNom('');
        loadDepartements(); // Recharger les départements
      } catch (error) {
        console.error('Erreur lors de la création du département', error);
      }
    }
  };

  // Gérer la modification d'un département
  const handleEdit = (departement) => {
    setNom(departement.nom);
    setEditingDepartement(departement); // Définir le département à modifier
  };

  // Gérer la suppression d'un département
  const handleDelete = async (id) => {
    try {
      await deleteDepartement(id);
      loadDepartements(); // Recharger les départements
    } catch (error) {
      console.error('Erreur lors de la suppression du département', error);
    }
  };

  return (
    <div>
      <h2>{editingDepartement ? 'Modifier un département' : 'Ajouter un département'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom du département"
        />
        <button type="submit">{editingDepartement ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>

      <h3>Liste des départements</h3>
      <ul>
        {departements.map((d) => (
          <li key={d.id}>
            {d.nom}
            <button onClick={() => handleEdit(d)}>Modifier</button>
            <button onClick={() => handleDelete(d.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Departement;

import { useEffect, useState } from 'react';
import { fetchDepartements, createDepartement, updateDepartement, deleteDepartement } from '../../../store/Data';

function Departement() {
  const [departements, setDepartements] = useState([]);
  const [nom, setNom] = useState('');
  const [editingDepartement, setEditingDepartement] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); // Ajout de l'état pour afficher les erreurs

  // Charger la liste des départements
  useEffect(() => {
    loadDepartements();
  }, []);

  const loadDepartements = async () => {
    try {
      const data = await fetchDepartements();
      setDepartements(data);
    } catch (error) {
      setErrorMessage('Erreur lors du chargement des départements');
      console.error('Erreur lors du chargement des départements', error);
    }
  };

  // Gérer la soumission pour créer ou mettre à jour un département
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation simple
    if (!nom) {
      setErrorMessage('Le nom du département est requis.');
      return;
    }
    setErrorMessage(''); // Réinitialiser le message d'erreur

    try {
      if (editingDepartement) {
        // Si un département est en édition, on met à jour
        await updateDepartement(editingDepartement.id, { nom });
        setNom('');
        setEditingDepartement(null); // Réinitialiser l'édition
        loadDepartements(); // Recharger les départements
      } else {
        // Sinon, on crée un nouveau département
        await createDepartement({ nom });
        setNom('');
        loadDepartements(); // Recharger les départements
      }
    } catch (error) {
      setErrorMessage('Erreur lors de la création ou mise à jour du département');
      console.error('Erreur lors de la création ou mise à jour du département', error);
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
      loadDepartements(); // Recharger les départements après la suppression
    } catch (error) {
      setErrorMessage('Erreur lors de la suppression du département');
      console.error('Erreur lors de la suppression du département', error);
    }
  };

  return (
    <div>
      <h2>{editingDepartement ? 'Modifier un département' : 'Ajouter un département'}</h2>
      
      {/* Affichage du message d'erreur s'il y en a */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

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

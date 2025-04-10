import { useEffect, useState } from 'react';
import { fetchGrades, createGrade, updateGrade, deleteGrade } from '../../../store/Data';

function Grade() {
  const [grades, setGrades] = useState([]);
  const [nom, setNom] = useState('');
  const [editingGrade, setEditingGrade] = useState(null);

  // Charger la liste des grades
  useEffect(() => {
    loadGrades();
  }, []);

  const loadGrades = async () => {
    try {
      const data = await fetchGrades();
      setGrades(data);
    } catch (error) {
      console.error('Erreur lors du chargement des grades', error);
    }
  };

  // Gérer la soumission pour créer ou mettre à jour un grade
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingGrade) {
      // Si un grade est en édition, on met à jour
      try {
        await updateGrade(editingGrade.id, { nom });
        setNom('');
        setEditingGrade(null); // Réinitialiser l'édition
        loadGrades(); // Recharger les grades
      } catch (error) {
        console.error('Erreur lors de la mise à jour du grade', error);
      }
    } else {
      // Sinon, on crée un nouveau grade
      try {
        await createGrade({ nom });
        setNom('');
        loadGrades(); // Recharger les grades
      } catch (error) {
        console.error('Erreur lors de la création du grade', error);
      }
    }
  };

  // Gérer la modification d'un grade
  const handleEdit = (grade) => {
    setNom(grade.nom);
    setEditingGrade(grade); // Définir le grade à modifier
  };

  // Gérer la suppression d'un grade
  const handleDelete = async (id) => {
    try {
      await deleteGrade(id);
      loadGrades(); // Recharger les grades
    } catch (error) {
      console.error('Erreur lors de la suppression du grade', error);
    }
  };

  return (
    <div>
      <h2>{editingGrade ? 'Modifier un grade' : 'Ajouter un grade'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom du grade"
        />
        <button type="submit">{editingGrade ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>

      <h3>Liste des grades</h3>
      <ul>
        {grades.map((g) => (
          <li key={g.id}>
            {g.nom}
            <button onClick={() => handleEdit(g)}>Modifier</button>
            <button onClick={() => handleDelete(g.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Grade;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGradesAction,
  updateGrade,
  createGrade,
  deleteGrade
} from '../../../store/Data';


function Grade() {
  const dispatch = useDispatch();
  const grades = useSelector((state) => state.grades.list);
  const [nom, setNom] = useState('');
  const [editingGrade, setEditingGrade] = useState(null);

  useEffect(() => {
    dispatch(fetchGradesAction());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingGrade) {
      await updateGrade(editingGrade.id, { nom });
    } else {
      await createGrade({ nom });
    }
    setNom('');
    setEditingGrade(null);
    dispatch(fetchGradesAction());
  };

  const handleEdit = (grade) => {
    setNom(grade.nom);
    setEditingGrade(grade);
  };

  const handleDelete = async (id) => {
    await deleteGrade(id);
    dispatch(fetchGradesAction());
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

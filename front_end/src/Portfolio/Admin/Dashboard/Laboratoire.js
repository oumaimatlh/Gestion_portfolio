import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLaboratoiresAction,
  createLaboratoireAction,
  updateLaboratoireAction,
  deleteLaboratoireAction,
} from '../../../store/Data';
import { fetchDepartements } from '../../../store/Data';

function Laboratoire() {
  const dispatch = useDispatch();
  const { list: laboratoires, loading, error } = useSelector(state => state.laboratoires);
  const departements = useSelector(state => state.departements.list);
  const [nom, setNom] = useState('');
  const [idDepartement, setIdDepartement] = useState('');
  const [editingLaboratoire, setEditingLaboratoire] = useState(null);

  // Charger les laboratoires et départements
  useEffect(() => {
    dispatch(fetchLaboratoiresAction());
    dispatch(fetchDepartements());
  }, [dispatch]);

  // Gérer la soumission pour créer ou mettre à jour un laboratoire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingLaboratoire) {
      // Si un laboratoire est en édition, on met à jour
      dispatch(updateLaboratoireAction(editingLaboratoire.id, { nom, id_departement: idDepartement }));
      setNom('');
      setIdDepartement('');
      setEditingLaboratoire(null);
    } else {
      // Sinon, on crée un nouveau laboratoire
      dispatch(createLaboratoireAction({ nom, id_departement: idDepartement }));
      setNom('');
      setIdDepartement('');
    }
  };

  // Gérer la modification d'un laboratoire
  const handleEdit = (laboratoire) => {
    setNom(laboratoire.nom);
    setIdDepartement(laboratoire.id_departement);
    setEditingLaboratoire(laboratoire);
  };

  // Gérer la suppression d'un laboratoire
  const handleDelete = (id) => {
    dispatch(deleteLaboratoireAction(id));
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

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

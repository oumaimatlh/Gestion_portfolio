import axios from 'axios';

// ----------------- API Grades -----------------
const API_GRADES = 'http://localhost:8000/api/grades';

// Fonctions pour les grades
 const fetchGrades = async () => {
  try {
    const res = await axios.get(API_GRADES);
    return res.data;
  } catch (err) {
    console.error('Erreur fetchGrades:', err);
    throw err;
  }
};

 const createGrade = async (grade) => {
  try {
    const res = await axios.post(API_GRADES, grade);
    return res.data;
  } catch (err) {
    console.error('Erreur createGrade:', err);
    throw err;
  }
};

 const updateGrade = async (id, grade) => {
  try {
    const res = await axios.put(`${API_GRADES}/${id}`, grade);
    return res.data;
  } catch (err) {
    console.error('Erreur updateGrade:', err);
    throw err;
  }
};

 const deleteGrade = async (id) => {
  try {
    const res = await axios.delete(`${API_GRADES}/${id}`);
    return res.data;
  } catch (err) {
    console.error('Erreur deleteGrade:', err);
    throw err;
  }
};

// Action Redux pour récupérer les grades avec Thunk
 const fetchGradesAction = () => async (dispatch) => {
  dispatch({ type: "FETCH_GRADES_REQUEST" });
  try {
    const data = await fetchGrades(); // appel API
    dispatch({ type: "FETCH_GRADES_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_GRADES_FAILURE", error });
  }
};

// ----------------- API Départements -----------------
const API_DEPA = 'http://localhost:8000/api/departements';

 const fetchDepartements = async () => {
  try {
    const res = await axios.get(API_DEPA);
    return res.data;
  } catch (err) {
    console.error('Erreur fetchDepartements:', err);
    throw err;
  }
};

 const createDepartement = async (departement) => {
  try {
    const res = await axios.post(API_DEPA, departement);
    return res.data;
  } catch (err) {
    console.error('Erreur createDepartement:', err);
    throw err;
  }
};

 const updateDepartement = async (id, departement) => {
  try {
    const res = await axios.put(`${API_DEPA}/${id}`, departement);
    return res.data;
  } catch (err) {
    console.error('Erreur updateDepartement:', err);
    throw err;
  }
};

 const deleteDepartement = async (id) => {
  try {
    const res = await axios.delete(`${API_DEPA}/${id}`);
    return res.data;
  } catch (err) {
    console.error('Erreur deleteDepartement:', err);
    throw err;
  }
};

// ----------------- API Laboratoires -----------------
const API_LAB = 'http://localhost:8000/api/laboratoires';

 const fetchLaboratoires = async () => {
  try {
    const res = await axios.get(API_LAB);
    return res.data;
  } catch (err) {
    console.error('Erreur fetchLaboratoires:', err);
    throw err;
  }
};

 const createLaboratoire = async (laboratoire) => {
  try {
    const res = await axios.post(API_LAB, laboratoire);
    return res.data;
  } catch (err) {
    console.error('Erreur createLaboratoire:', err);
    throw err;
  }
};

 const updateLaboratoire = async (id, laboratoire) => {
  try {
    const res = await axios.put(`${API_LAB}/${id}`, laboratoire);
    return res.data;
  } catch (err) {
    console.error('Erreur updateLaboratoire:', err);
    throw err;
  }
};

 const deleteLaboratoire = async (id) => {
  try {
    const res = await axios.delete(`${API_LAB}/${id}`);
    return res.data;
  } catch (err) {
    console.error('Erreur deleteLaboratoire:', err);
    throw err;
  }
};

// ----------------- API Equipes -----------------
const API_EQUIPE = 'http://localhost:8000/api/equipes';

// Fonction pour supprimer une équipe
 const deleteEquipe = async (id) => {
  try {
    const res = await axios.delete(`${API_EQUIPE}/${id}`);
    return res.data;
  } catch (err) {
    console.error('Erreur deleteEquipe:', err);
    throw err;
  }
};

// ----------------- Actions Redux pour les Equipes -----------------
 const fetchEquipesAction = () => async (dispatch) => {
  dispatch({ type: 'FETCH_EQUIPE_REQUEST' });
  try {
    const data = await fetchEquipes(); // Appel API pour récupérer les équipes
    dispatch({ type: 'FETCH_EQUIPE_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_EQUIPE_FAILURE', error });
  }
};

 const createEquipeAction = (equipe) => async (dispatch) => {
  try {
    await createEquipe(equipe); // Appel API pour créer une équipe
    dispatch(fetchEquipesAction()); // Recharger la liste après création
  } catch (error) {
    console.error('Erreur lors de la création de l\'équipe:', error);
  }
};

 const updateEquipeAction = (id, equipe) => async (dispatch) => {
  try {
    await updateEquipe(id, equipe); // Appel API pour mettre à jour une équipe
    dispatch(fetchEquipesAction()); // Recharger la liste après mise à jour
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'équipe:', error);
  }
};

 const deleteEquipeAction = (id) => async (dispatch) => {
  try {
    await deleteEquipe(id); // Appel API pour supprimer une équipe
    dispatch(fetchEquipesAction()); // Recharger la liste après suppression
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'équipe:', error);
  }
};

// ----------------- er toutes les fonctions -----------------
export {
  deleteEquipe,
  fetchGrades,
  createGrade,
  updateGrade,
  deleteGrade,
  fetchGradesAction,
  fetchDepartements,
  createDepartement,
  updateDepartement,
  deleteDepartement,
  fetchLaboratoires,
  createLaboratoire,
  updateLaboratoire,
  deleteLaboratoire,
  fetchLaboratoiresAction,
  createLaboratoireAction,
  updateLaboratoireAction,
  deleteLaboratoireAction,
};

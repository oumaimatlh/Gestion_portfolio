import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api/grades';

 const fetchGrades = async () => {
  try {
    const res = await axios.get(API_BASE);
    return res.data;
  } catch (err) {
    console.error('Erreur fetchGrades:', err);
    throw err;
  }
};

 const createGrade = async (grade) => {
  try {
    const res = await axios.post(API_BASE, grade);
    return res.data;
  } catch (err) {
    console.error('Erreur createGrade:', err);
    throw err;
  }
};

 const updateGrade = async (id, grade) => {
  try {
    const res = await axios.put(`${API_BASE}/${id}`, grade);
    return res.data;
  } catch (err) {
    console.error('Erreur updateGrade:', err);
    throw err;
  }
};

 const deleteGrade = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error('Erreur deleteGrade:', err);
    throw err;
  }
};

export {fetchGrades, createGrade ,deleteGrade,updateGrade};


// API de départements
const API_DEPA = 'http://localhost:8000/api/departements';

// Fonction pour récupérer tous les départements
 const fetchDepartements = async () => {
  try {
    const res = await axios.get(API_DEPA);
    return res.data;
  } catch (err) {
    console.error('Erreur fetchDepartements:', err);
    throw err;
  }
};

// Fonction pour créer un département
 const createDepartement = async (departement) => {
  try {
    const res = await axios.post(API_DEPA, departement);
    return res.data;
  } catch (err) {
    console.error('Erreur createDepartement:', err);
    throw err;
  }
};

// Fonction pour mettre à jour un département
 const updateDepartement = async (id, departement) => {
  try {
    const res = await axios.put(`${API_DEPA}/${id}`, departement);
    return res.data;
  } catch (err) {
    console.error('Erreur updateDepartement:', err);
    throw err;
  }
};

// Fonction pour supprimer un département
 const deleteDepartement = async (id) => {
  try {
    const res = await axios.delete(`${API_DEPA}/${id}`);
    return res.data;
  } catch (err) {
    console.error('Erreur deleteDepartement:', err);
    throw err;
  }
};
export {deleteDepartement, updateDepartement ,createDepartement,fetchDepartements};

//laboratoire 
const API_LAB = 'http://localhost:8000/api/laboratoires';

export const fetchLaboratoires = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/laboratoires');
      return res.data;
    } catch (err) {
      console.error('Erreur fetchLaboratoires:', err);
      throw err;
    }
  }

export const createLaboratoire = async (laboratoire) => {
  try {
    const res = await axios.post(API_LAB, laboratoire);
    return res.data;
  } catch (err) {
    console.error('Erreur createLaboratoire:', err);
    throw err;
  }
};

export const updateLaboratoire = async (id, laboratoire) => {
  try {
    const res = await axios.put(`${API_LAB}/${id}`, laboratoire);
    return res.data;
  } catch (err) {
    console.error('Erreur updateLaboratoire:', err);
    throw err;
  }
};

export const deleteLaboratoire = async (id) => {
  try {
    const res = await axios.delete(`${API_LAB}/${id}`);
    return res.data;
  } catch (err) {
    console.error('Erreur deleteLaboratoire:', err);
    throw err;
  }
};
//Equipe 

const API_EQUIPES = 'http://localhost:8000/api/equipes';

export const fetchEquipes = async () => {
  try {
    const res = await axios.get(API_EQUIPES);
    return res.data;
  } catch (err) {
    console.error('Erreur fetchEquipes:', err);
    throw err;
  }
};

export const createEquipe = async (equipe) => {
  try {
    const res = await axios.post(API_EQUIPES, equipe);
    return res.data;
  } catch (err) {
    console.error('Erreur createEquipe:', err);
    throw err;
  }
};

export const updateEquipe = async (id, equipe) => {
  try {
    const res = await axios.put(`${API_EQUIPES}/${id}`, equipe);
    return res.data;
  } catch (err) {
    console.error('Erreur updateEquipe:', err);
    throw err;
  }
};

export const deleteEquipe = async (id) => {
  try {
    const res = await axios.delete(`${API_EQUIPES}/${id}`);
    return res.data;
  } catch (err) {
    console.error('Erreur deleteEquipe:', err);
    throw err;
  }
};

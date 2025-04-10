import { combineReducers, createStore, applyMiddleware } from "redux";
import {thunk} from 'redux-thunk';

// Reducer d'authentification
const authInitialState = {
  isAuthenticated: false,
  professeur: null,
};

function authReducer(state = authInitialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        professeur: action.payload,
      };
    case 'LOGOUT':
      return authInitialState;
    default:
      return state;
  }
}

// Reducer pour les grades
const gradesInitialState = {
  list: [],
  loading: false,
  error: null,
};

function gradesReducer(state = gradesInitialState, action) {
  switch (action.type) {
    case 'FETCH_GRADES_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_GRADES_SUCCESS':
      return { ...state, loading: false, list: action.payload };
    case 'FETCH_GRADES_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

// Reducer pour les laboratoires
const laboInitialState = {
  list: [],
  loading: false,
  error: null,
};

function laboReducer(state = laboInitialState, action) {
  switch (action.type) {
    case 'FETCH_LABORATOIRES_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_LABORATOIRES_SUCCESS':
      return { ...state, loading: false, list: action.payload };
    case 'FETCH_LABORATOIRES_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

// Reducer pour les départements
const departementInitialState = {
  list: [],
  loading: false,
  error: null,
};

function departementReducer(state = departementInitialState, action) {
  switch (action.type) {
    case 'FETCH_DEPARTEMENTS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_DEPARTEMENTS_SUCCESS':
      return { ...state, loading: false, list: action.payload };
    case 'FETCH_DEPARTEMENTS_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

// Reducer pour les équipes
const equipeInitialState = {
  list: [],
  loading: false,
  error: null,
};

function equipeReducer(state = equipeInitialState, action) {
  switch (action.type) {
    case 'FETCH_EQUIPE_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_EQUIPE_SUCCESS':
      return { ...state, loading: false, list: action.payload };
    case 'FETCH_EQUIPE_FAILURE':
      return { ...state, loading: false, error: action.error };
    case 'CREATE_EQUIPE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_EQUIPE_SUCCESS':
      return { ...state, loading: false, list: [...state.list, action.payload] };
    case 'CREATE_EQUIPE_FAILURE':
      return { ...state, loading: false, error: action.error };
    case 'DELETE_EQUIPE_REQUEST':
      return { ...state, loading: true };
    case 'DELETE_EQUIPE_SUCCESS':
      return { ...state, loading: false, list: state.list.filter((equipe) => equipe.id !== action.payload) };
    case 'DELETE_EQUIPE_FAILURE':
      return { ...state, loading: false, error: action.error };
    case 'UPDATE_EQUIPE_REQUEST':
      return { ...state, loading: true };
    case 'UPDATE_EQUIPE_SUCCESS':
      return {
        ...state,
        loading: false,
        list: state.list.map((equipe) =>
          equipe.id === action.payload.id ? { ...equipe, ...action.payload } : equipe
        ),
      };
    case 'UPDATE_EQUIPE_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  grades: gradesReducer,
  departements: departementReducer,
  laboratoires: laboReducer,
  equipes: equipeReducer, // Ajouter le reducer pour les équipes
});

// Créer le store avec Redux Thunk
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

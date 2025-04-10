// src/Portfolio/store.js
import { createStore, combineReducers } from "redux";

// State initial pour l'authentification
const authInitialState = {
  isAuthenticated: false,
  professeur: null,
};

// Reducer pour gérer l'authentification
function authReducer(state = authInitialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        professeur: action.payload,
      };
    case "LOGOUT":
      return authInitialState;
    default:
      return state;
  }
}

// Combine reducers (au cas où tu ajoutes d’autres features plus tard)
const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;

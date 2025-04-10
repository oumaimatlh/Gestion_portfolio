import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgb(41, 31, 22); }
  70% { box-shadow: 0 0 0 10px rgba(184, 136, 89, 0); }
  100% { box-shadow: 0 0 0 0 rgba(184, 136, 89, 0); }
`;

// Couleurs basées sur le thème beige, marron et blanc
const colors = {
  primary: '#b88c4a', // Marron clair
  secondary: '#c9b99b', // Beige doux
  lightBg: '#f9f7f1', // Fond beige clair
  textDark: '#2c3e50', // Gris foncé pour le texte
  textLight: '#7d7d7d', // Gris clair pour le texte
  accent: '#d0a14f', // Accent beige foncé
  border: '#e2d5b7', // Bordure marron clair
};

// Composants stylisés
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 2rem;
  background: ${colors.lightBg};
`;

const SearchForm = styled.form`
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid ${colors.border};

  &:hover {
    box-shadow: 0 15px 35px ${colors.primary}50;
  }
`;

const Title = styled.h1`
  color: ${colors.primary};
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: ${colors.secondary};
    margin: 0.5rem auto 0;
  }
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 90%;
  padding: 1rem;
  font-size: 1rem;
  border: 2px solid ${colors.border};
  border-radius: 8px;
  transition: all 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: ${colors.lightBg};

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary}30;
  }

  &::placeholder {
    color: ${colors.textLight};
    font-style: italic;
  }
`;

const SuggestionsList = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background: white;
  border: 1px solid ${colors.primary}30;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 0.5rem;
  padding: 0;
  list-style: none;
  animation: ${fadeIn} 0.2s ease-out;
`;

const SuggestionItem = styled.li`
  padding: 1rem 1.5rem;
  cursor: pointer;
  border-bottom: 1px solid ${colors.border};
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: ${colors.secondary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ProfessorName = styled.span`
  font-weight: 600;
  color: ${colors.primary};
`;

const ProfessorFirstName = styled.span`
  color: ${colors.textLight};
  margin-left: 0.5rem;
`;

const DepartmentBadge = styled.span`
  font-size: 0.75rem;
  color: ${colors.secondary};
  background-color: #f5f0e6;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-weight: 500;
`;

const SearchButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px ${colors.primary}30;
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    animation: ${pulse} 1s;
  }


`;

export default function Search() {
  const [inputValue, setInputValue] = useState('');
  const [professeurs, setProfesseurs] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/professeurs')
      .then((response) => {
        setProfesseurs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching professeurs:', error);
      });
  }, []);

  useEffect(() => {
    if (inputValue.length > 0) {
      const filtered = professeurs.filter(prof =>
        `${prof.nom} ${prof.prenom}`.toLowerCase().includes(inputValue.toLowerCase()) ||
        prof.nom.toLowerCase().includes(inputValue.toLowerCase())
      ).sort((a, b) => {
        const nomCompare = a.nom.localeCompare(b.nom);
        if (nomCompare !== 0) return nomCompare;
        return a.prenom.localeCompare(b.prenom);
      });

      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, professeurs]);

  const handleSelectSuggestion = (professeur) => {
    setInputValue(`${professeur.nom} ${professeur.prenom}`);
    setShowSuggestions(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const matchingProfesseurs = professeurs.filter(p =>
      `${p.nom} ${p.prenom}`.toLowerCase() === inputValue.toLowerCase() ||
      p.nom.toLowerCase() === inputValue.toLowerCase()
    );

    if (matchingProfesseurs.length === 1) {
      dispatch({ type: 'Search', payload: matchingProfesseurs[0] });
      navigate(`/professeur/${matchingProfesseurs[0].nom}`);
    } else if (matchingProfesseurs.length > 1) {
      setSuggestions(matchingProfesseurs);
      setShowSuggestions(true);
    } else {
      alert('Aucun professeur trouvé avec ce nom');
    }
  };

  return (
    <Container>
      <SearchForm onSubmit={handleSearch}>
        <Title>Recherche de Professeurs</Title>
        
        <InputContainer>
          <SearchInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Entrez un nom ou un prénom...'
            onFocus={() => inputValue.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <SuggestionsList>
              {suggestions.map((professeur) => (
                <SuggestionItem
                  key={professeur._id}
                  onMouseDown={() => handleSelectSuggestion(professeur)}
                >
                  <div>
                    <ProfessorName>{professeur.nom}</ProfessorName>
                    <ProfessorFirstName>{professeur.prenom}</ProfessorFirstName>
                  </div>
                  {professeur.departement && (
                    <DepartmentBadge>{professeur.domaine}</DepartmentBadge>
                  )}
                </SuggestionItem>
              ))}
            </SuggestionsList>
          )}
        </InputContainer>
        
        <SearchButton type="submit">
          Rechercher
        </SearchButton>
      </SearchForm>
      <button><a href='./Portfolio/Admin/Login'>Admin Login</a></button>
    </Container>
  );
}

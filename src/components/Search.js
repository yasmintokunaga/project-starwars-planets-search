import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Search() {
  const planets = useContext(PlanetContext);
  const { allPlanets, setListPlanets } = planets;

  function handleChange({ target }) {
    const { value } = target;

    if (value.length === 0) {
      setListPlanets(allPlanets);
    } else {
      setListPlanets(
        allPlanets
          .filter(({ name }) => name.toLowerCase().includes(value.toLowerCase())),
      );
    }
  }

  return (
    <header>
      <label htmlFor="name-filter">Pesquisar planeta</label>
      <input
        type="text"
        id="name-filter"
        name="name"
        data-testid="name-filter"
        onChange={ handleChange }
      />
    </header>
  );
}

export default Search;

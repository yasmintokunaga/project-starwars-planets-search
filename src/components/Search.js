import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

function Search() {
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const planets = useContext(PlanetContext);
  const {
    allPlanets,
    listPlanets,
    setListPlanets,
    numberFilter,
    setNumberFilter,
  } = planets;

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

  function handleForm({ target }) {
    const { value, name } = target;
    switch (name) {
    case 'columnFilter':
      return setColumnFilter(value);
    case 'comparisonFilter':
      return setComparisonFilter(value);
    case 'valueFilter':
      return setValueFilter(value);
    default:
      break;
    }
  }

  function handleClick(event) {
    event.preventDefault();
    setNumberFilter(numberFilter.filter((filter) => filter !== columnFilter));
    switch (comparisonFilter) {
    case 'maior que':
      return setListPlanets(
        listPlanets.filter((planet) => parseInt(planet[columnFilter], 10) > valueFilter),
      );
    case 'menor que':
      return setListPlanets(
        listPlanets.filter((planet) => parseInt(planet[columnFilter], 10) < valueFilter),
      );
    case 'igual a':
      return setListPlanets(
        listPlanets.filter((planet) => planet[columnFilter] === valueFilter),
      );
    default:
      break;
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

      <form>
        <select
          name="columnFilter"
          data-testid="column-filter"
          onChange={ handleForm }
        >
          { numberFilter.map((filter) => (
            <option
              value={ filter }
              key={ filter }
            >
              { filter }
            </option>
          ))}
        </select>

        <select
          name="comparisonFilter"
          data-testid="comparison-filter"
          onChange={ handleForm }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="number"
          id="value-filter"
          name="valueFilter"
          data-testid="value-filter"
          onChange={ handleForm }
          value={ valueFilter }
        />

        <button
          data-testid="button-filter"
          onClick={ handleClick }
        >
          FILTRAR
        </button>
      </form>
    </header>
  );
}

export default Search;

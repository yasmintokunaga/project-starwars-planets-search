import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

function Search() {
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);

  const [columnSort, setColumnSort] = useState('population');
  const [columnSortInput, setColumnSortInput] = useState('ASC');

  const planets = useContext(PlanetContext);
  const {
    allPlanets,
    listPlanets,
    setListPlanets,
    numberFilter,
    setNumberFilter,
    usedFilter,
    setUsedFilter,
    allNumberFilter,
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
    case 'columnSort':
      return setColumnSort(value);
    case 'columnSortInput':
      return setColumnSortInput(value);
    default:
      break;
    }
  }

  function filterList(list, comparison, column, value) {
    switch (comparison) {
    case 'maior que':
      return list.filter((planet) => parseInt(planet[column], 10) > value);
    case 'menor que':
      return list.filter((planet) => parseInt(planet[column], 10) < value);
    case 'igual a':
      return list.filter((planet) => planet[column] === value);
    default:
      return list;
    }
  }

  function handleClick(event) {
    event.preventDefault();
    setNumberFilter(numberFilter.filter((filter) => filter !== columnFilter));
    setColumnFilter(numberFilter.filter((filter) => filter !== columnFilter)[0]);
    setUsedFilter([...usedFilter, `${columnFilter}-${comparisonFilter}-${valueFilter}`]);
    setListPlanets(filterList(listPlanets, comparisonFilter, columnFilter, valueFilter));
  }

  function handleRemoveFilter(removeFilter) {
    const updateListUsedFilter = usedFilter.filter((filter) => filter !== removeFilter);
    setUsedFilter(updateListUsedFilter);
    setNumberFilter([...numberFilter, removeFilter.split('-')[0]]);
    let updateListPlanet = allPlanets;

    updateListUsedFilter.forEach((filter) => {
      const filters = filter.split('-');
      updateListPlanet = filterList(updateListPlanet, filters[1], filters[0], filters[2]);
      console.log(updateListPlanet);
    });

    setListPlanets(updateListPlanet);
  }

  function sortList(list, column, order) {
    const numberItens = list.filter((planet) => planet[column] !== 'unknown');
    const unknownItens = list.filter((planet) => planet[column] === 'unknown');
    if (order === 'ASC') {
      return [...numberItens.sort((a, b) => a[column] - b[column]), ...unknownItens];
    }
    return [...numberItens.sort((a, b) => b[column] - a[column]), ...unknownItens];
  }

  function handleSort(event) {
    event.preventDefault();
    const updateList = sortList(listPlanets, columnSort, columnSortInput);
    setListPlanets([...updateList]);
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
      <button
        data-testid="button-remove-filters"
        onClick={ () => {
          setListPlanets(allPlanets);
          setNumberFilter(allNumberFilter);
          setUsedFilter([]);
        } }
      >
        Remover filtros
      </button>
      { usedFilter.map((filter) => (
        <p key={ filter } data-testid="filter">
          { filter }
          <button
            onClick={ () => handleRemoveFilter(filter) }
          >
            Remover
          </button>
        </p>
      ))}

      <form>
        <select
          name="columnSort"
          data-testid="column-sort"
          onChange={ handleForm }
        >
          { allNumberFilter.map((filter) => (
            <option
              value={ filter }
              key={ filter }
            >
              { filter }
            </option>
          ))}
        </select>

        <input
          data-testid="column-sort-input-asc"
          type="radio"
          name="columnSortInput"
          id="column-sort-input-asc"
          value="ASC"
          onChange={ handleForm }
        />
        <label htmlFor="column-sort-input-asc">Ascendente</label>
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          name="columnSortInput"
          id="column-sort-input-desc"
          value="DESC"
          onChange={ handleForm }
        />
        <label htmlFor="column-sort-input-desc">Descendente</label>

        <button
          data-testid="column-sort-button"
          onClick={ handleSort }
        >
          ORDENAR
        </button>
      </form>
    </header>
  );
}

export default Search;

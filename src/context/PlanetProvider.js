import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

export default function PlanetProvider({ children }) {
  const [listPlanets, setListPlanets] = useState([]);
  const [allPlanets, setAllPlanets] = useState([]);
  const [headerTable, setHeaderTable] = useState([]);
  const [numberFilter, setNumberFilter] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  useEffect(() => {
    async function fetchPlanets() {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setListPlanets(data.results);
      setAllPlanets(data.results);
      setHeaderTable(
        Object.keys(data.results[0]).filter((element) => element !== 'residents'),
      );
    }
    fetchPlanets();
  }, []);

  const values = useMemo(() => ({
    listPlanets,
    allPlanets,
    headerTable,
    numberFilter,
    setListPlanets,
    setNumberFilter,
  }), [listPlanets, allPlanets, headerTable, numberFilter]);

  return (
    <PlanetContext.Provider value={ values }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

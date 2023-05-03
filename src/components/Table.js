import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const planets = useContext(PlanetContext);
  const { listPlanets, headerTable } = planets;

  return (
    <table>
      <tr>
        { headerTable.map((titleHeader) => (
          <th key={ titleHeader }>{ titleHeader }</th>
        ))}
      </tr>
      { listPlanets.map((planet) => (
        <tr key={ planet.name }>
          { headerTable.map((titleHeader) => (
            <td key={ planet[titleHeader] }>{ planet[titleHeader] }</td>
          ))}
        </tr>
      ))}
    </table>
  );
}

export default Table;

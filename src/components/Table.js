import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const planets = useContext(PlanetContext);
  const { listPlanets, headerTable } = planets;

  return (
    <table>
      <thead>
        <tr>
          { headerTable.map((titleHeader) => (
            <th key={ titleHeader }>{ titleHeader }</th>
          ))}
        </tr>
      </thead>
      <tbody>
        { listPlanets.map((planet) => (
          <tr key={ planet.name }>
            { headerTable.map((titleHeader) => (
              <td key={ planet[titleHeader] }>{ planet[titleHeader] }</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

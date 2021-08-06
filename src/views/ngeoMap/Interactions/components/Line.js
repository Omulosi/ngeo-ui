import React, { useContext } from 'react';
import './styles.css';
import MapContext from '../../Map/MapContext';

/* eslint-disable */

const Line = () => {
  const { map } = useContext(MapContext);

  return (
    <div className="edit-container">
      <div className="fullExtentButton">
        <div className="fullExtentContent" />
      </div>
    </div>
  );
};

export default Line;

/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';
import MapContext from '../Map/MapContext';

import './controls.css';

const MousePositionControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position'
      // target: document.getElementById('mouse-position'),
      // undefinedHTML: '&nbsp;',
    });

    map.controls.push(mousePositionControl);

    return () => map.controls.remove(mousePositionControl);
  }, [map]);

  return null;
};

export default MousePositionControl;

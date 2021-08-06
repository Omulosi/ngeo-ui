/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import { ScaleLine } from 'ol/control';
import MapContext from '../Map/MapContext';

const ScaleLineControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const scaleLineControl = new ScaleLine({
      minWidth: 80
    });

    map.controls.push(scaleLineControl);

    return () => map.controls.remove(scaleLineControl);
  }, [map]);

  return null;
};

export default ScaleLineControl;

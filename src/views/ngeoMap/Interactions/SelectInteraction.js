/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import { Select } from 'ol/interaction';
import { shiftKeyOnly, singleClick, doubleClick } from 'ol/events/condition';
import MapContext from '../Map/MapContext';
import styles from '../geoStyles';

const SelectInteraction = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const selectInteraction = new Select({
      condition: doubleClick,
      toggleCondition: shiftKeyOnly,
      layers: (layer) => {
        return true;
      },
      style: styles.select
    });

    map.addInteraction(selectInteraction);

    return () => map.removeInteraction(selectInteraction);
  }, [map]);

  return null;
};

export default SelectInteraction;

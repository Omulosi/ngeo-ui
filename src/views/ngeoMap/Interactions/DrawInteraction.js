/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import MapContext from '../Map/MapContext';
import styles from '../geoStyles';
import { Draw, Modify, Snap } from 'ol/interaction';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import * as helpers from 'src/utils/helpers';

const DrawInteraction = ({ type, setType }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    var source = new VectorSource();

    let style = styles.generalStyle;
    if (type === 'Arrow') {
      style = styles.arrowStyleFunction;
    }

    let vector = new VectorLayer({
      source: source,
      zIndex: 99999, // set a high value
      style
    });

    map.addLayer(vector);

    let modify = new Modify({ source: source });
    map.addInteraction(modify);

    let draw, snap; // global so we can remove them later
    // var typeSelect = document.getElementById('type');

    if (type && type !== 'None') {
      if (type === 'Arrow') {
        type = 'LineString';
      }
      window.isDrawingOrEditing = true;
      draw = new Draw({
        source: source,
        // type: typeSelect.value
        type
        // condition: doubleClick
      });

      map.addInteraction(draw);
      snap = new Snap({ source: source });
      map.addInteraction(snap);

      draw.on('drawend', (evt) => {
        let feature = evt.feature;
        let coordinates;
        let newFeature = null;

        // Re-enable popups
        setTimeout(() => {
          window.isDrawingOrEditing = false;
          map.removeInteraction(draw);
          map.removeInteraction(snap);
          setType('None');

          // Add feature
          coordinates = feature.getGeometry().getCoordinates();
          let coordinatesArray = coordinates;
          newFeature = feature;

          if (type === 'Point') {
            // eslint-disable-next-line no-debugger
            coordinatesArray = helpers.toLatLongFromWebMercator(coordinates);
            // coordinatesText = `${lon},${lat}`;
            newFeature = new Feature(new Point(coordinates));
          }

          if (type === 'LineString') {
            coordinatesArray = coordinates.map((lonLat) =>
              helpers.toLatLongFromWebMercator(lonLat)
            );
          }

          // Open dialog for adding extra details to the point marker
          // Dialog listener: src/views/ngeoMap/index.js
          window.emitter.emit('addMarker', newFeature, coordinatesArray, type);
        }, 1000);
      });

      // Modify feature
      // modify.on('modifyend', (evt) => {
      //   debugger;
      //   let feature = evt.features.getArray()[0];
      //   let coordinates;

      //   // Re-enable popups
      //   setTimeout(() => {
      //     window.isDrawingOrEditing = false;
      //     map.removeInteraction(draw);
      //     map.removeInteraction(snap);
      //     setType('None');

      //     // Add feature
      //     coordinates = feature.getGeometry().getCoordinates();
      //     const modifiedFeature = new Feature(new Point(coordinates));

      //     // eslint-disable-next-line no-debugger
      //     const [lon, lat] = helpers.toLatLongFromWebMercator(coordinates);

      //     // Open dialog for adding extra details to the point marker
      //     // Dialog listener: src/views/ngeoMap/index.js
      //     window.emitter.emit(
      //       'addMarker',
      //       modifiedFeature,
      //       `${lon},${lat}`,
      //       type
      //     );
      //   }, 500);
      // });
    }

    return () => {
      map.removeInteraction(draw);
      map.removeInteraction(snap);
      // map.removeLayer(vector);
    };
  }, [map, type]);

  return null;
};

export default DrawInteraction;

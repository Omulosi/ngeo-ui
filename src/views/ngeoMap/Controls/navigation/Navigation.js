import React, { useState, useContext } from 'react';
import './styles.css';
import { fromLonLat } from 'ol/proj';
import * as helpers from 'src/utils/helpers';
import MapContext from '../../Map/MapContext';

/* eslint-disable */

const Navigation = () => {
  const [state, setState] = useState({
    showCurrentLocation: true,
    showZoomExtent: true
  });
  const { map } = useContext(MapContext);

  // ZOOM TO FULL EXTENT
  const zoomFullExtent = () => {
    // window.map.getView().animate({ center: centerCoords, zoom: defaultZoom });
    if (window.userAreaExtent) {
      map.getView().fit(window.userAreaExtent, {
        size: map.getSize(),
        duration: 1000,
        padding: [10, 10, 10, 10]
      });
    } else if (window.areaExtent) {
      map.getView().fit(window.areaExtent, {
        size: map.getSize(),
        duration: 1000,
        padding: [100, 100, 100, 100] // update to prop variable
      });
    } else if (window.boundaryExtent) {
      map.getView().fit(window.boundaryExtent, {
        size: map.getSize(),
        duration: 1000,
        padding: [25, 25, 25, 25] // update to prop variable
      });
    }
  };

  // ZOOM TO CURRENT LOCATION
  const zoomToCurrentLocation = () => {
    const options = { timeout: 5000 };
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = fromLonLat([pos.coords.longitude, pos.coords.latitude]);
        helpers.flashPoint(coords);
      },
      (err) => {
        helpers.showMessage(
          'Location',
          `Getting your location failed: ${err.message}`
        );
      },
      options
    );
  };

  const controlStateChange = (control, val) => {
    switch (control) {
      case 'fullExtent':
        setState({ ...state, showZoomExtent: val });
        break;
      case 'zoomToCurrentLocation':
        setState({ ...state, showCurrentLocation: val });
        break;
      default:
        break;
    }
  };

  // LISTEN FOR CONTROL VISIBILITY CHANGES
  window.emitter.addListener('mapControlsChanged', (control, visible) => {
    controlStateChange(control, visible);
  });

  return (
    <div className="nav-container">
      <div
        className="zoomButton"
        onClick={() => {
          const zoom = map.getView().getZoom();
          map.getView().setZoom(zoom + 1);
        }}
      >
        +
      </div>
      <div
        className="zoomButton"
        onClick={() => {
          const zoom = map.getView().getZoom();
          map.getView().setZoom(zoom - 1);
        }}
      >
        -
      </div>
      <div className="fullExtentButton" onClick={zoomFullExtent}>
        <div className="fullExtentContent" />
      </div>
      {/*   

        <div
        className="zoomToCurrentLocationButton"
        onClick={zoomToCurrentLocation}
      >
        <div className="zoomToCurrentLocationContent" />
      </div>


        */}
    </div>
  );
};

export default Navigation;

/* eslint-disable */
/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as ol from 'ol';
import sync from 'ol-hashed';
import Popup from 'src/utils/helpers/Popup';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { XYZ } from 'ol/source';
import Feature from 'ol/Feature';
import { fromLonLat } from 'ol/proj';
import Point from 'ol/geom/Point';
import * as helpers from 'src/utils/helpers';
import FloatingMenu, { FloatingMenuItem } from 'src/utils/helpers/FloatingMenu';
import { Item as MenuItem } from 'rc-menu';
import Portal from 'src/utils/helpers/Portal';
import { ENVIRONMENT, BACKEND_HOST } from 'src/config';
import mainConfig from 'src/config/config.json';
import MapContext from './MapContext';
import './Map.css';
// Css overrides for default open layer styles
import './olOverrides.css';

const MapProvider = ({ children }) => {
  const mapRef = useRef();
  const [mapObject, setMap] = useState(null);
  const { centerCoords, defaultZoom: zoom, maxZoom, mapserverUrl } = mainConfig;
  // Covert to web mercator dimensions fro  degrees
  const center = fromLonLat(centerCoords);

  // let initialLoad = false;
  // coordinate for currently clicked element
  let contextCoords = null;

  // on component mount
  useEffect(() => {
    // let extent;

    const source = {
      dev: new OSM(),
      prod: new XYZ({
        url: `${mapserverUrl}styles/osm-bright/{z}/{x}/{y}.png`
      })
    };

    const options = {
      view: new ol.View({
        zoom,
        center,
        maxZoom
        // projection: 'EPSG:3857'
      }),
      layers: [
        new TileLayer({
          source: source[ENVIRONMENT]
        })
      ],
      controls: [],
      overlays: []
      // interactions: []
    };

    // Create map and update variables that pass it on, using context api
    const map = new ol.Map(options);
    map.setTarget(mapRef.current);
    setMap(map);

    // Add popup overaly to the map.
    const popup = new Popup();
    map.addOverlay(popup);

    // set global objects to be accessed outside of react component tree e.g. in helpers module
    window.map = map;
    window.popup = popup;

    /**
     * Call backs for handling context menu click events
     */
    const addMyMaps = () => {
      const marker = new Feature(new Point(contextCoords));

      // eslint-disable-next-line no-debugger
      const [lon, lat] = helpers.toLatLongFromWebMercator(contextCoords);

      window.emitter.emit('addMarker', marker, [lon, lat], 'Point');
    };

    /* close right hand menu side bar */
    const basicMode = () => {
      window.emitter.emit('setSidebarVisiblity', 'CLOSE');
    };

    const onMenuItemClick = (key) => {
      switch (key) {
        case 'sc-floating-menu-add-mymaps':
          addMyMaps();
          break;
        case 'sc-floating-menu-basic-mode':
          basicMode();
          break;
        default:
          break;
      }
    };
    /* End of call backs */

    /**
     * Custom right click context menu: provides a way to dynamically add markers to map.
     * Listens for contextmenu event that's emitted on right click.
     *  */
    map.getViewport().addEventListener('contextmenu', (evt) => {
      evt.preventDefault();
      contextCoords = map.getEventCoordinate(evt);

      const menu = (
        <Portal>
          <FloatingMenu
            key={helpers.getUID()}
            buttonEvent={evt}
            onMenuItemClick={onMenuItemClick}
            autoY
            autoX
          >
            {/** Close right side bar menu to make map occupy max space */}
            <MenuItem
              className="sc-floating-menu-toolbox-menu-item"
              key="sc-floating-menu-basic-mode"
            >
              <FloatingMenuItem
                imageName="collased.png"
                label="Switch To Basic"
              />
            </MenuItem>
            <MenuItem
              className={
                mainConfig.rightClickMenuVisibility[
                  'sc-floating-menu-add-mymaps'
                ]
                  ? 'sc-floating-menu-toolbox-menu-item'
                  : 'sc-hidden'
              }
              key="sc-floating-menu-add-mymaps"
            >
              <FloatingMenuItem imageName="point.png" label="Add Marker" />
            </MenuItem>

            <MenuItem
              className={
                mainConfig.rightClickMenuVisibility[
                  'sc-floating-menu-save-map-extent'
                ]
                  ? 'sc-floating-menu-toolbox-menu-item'
                  : 'sc-hidden'
              }
              key="sc-floating-menu-save-map-extent"
            >
              <FloatingMenuItem
                imageName="globe-icon.png"
                label="Save as Default Extent"
              />
            </MenuItem>
            {/** Show details of a particular feature on layers side bar */}
            <MenuItem
              className={
                mainConfig.rightClickMenuVisibility['sc-floating-menu-identify']
                  ? 'sc-floating-menu-toolbox-menu-item'
                  : 'sc-hidden'
              }
              key="sc-floating-menu-identify"
            >
              <FloatingMenuItem imageName="identify.png" label="Identify" />
            </MenuItem>
          </FloatingMenu>
        </Portal>
      );
      ReactDOM.render(menu, document.getElementById('portal-root'));
    });

    map.once('rendercomplete', () => {
      window.emitter.emit('mapLoaded', map);
    });

    // Make map stay where it was left before, on reloads
    // Page reloads keep the map stable
    // const unregister = sync(map);

    return () => {
      map.setTarget(undefined);
      // unregister();
    };
  }, []);

  return (
    <MapContext.Provider value={{ map: mapObject }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default MapProvider;

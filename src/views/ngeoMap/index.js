import React from 'react';
/* eslint-disable */
import axios from 'axios';
import * as helpers from 'src/utils/helpers';
import NgeoMap from './NgeoMap';
import mainConfig from 'src/config/config.json';
import AddMarkerDialog from 'src/components/AddMarkerDialog';
import { WMSCapabilities } from 'ol/format';
import styles from './geoStyles';
import capitalize from 'src/utils/capitalize';
import geoserverConfig from 'src/config/geoserver';
import { useNavigate } from 'react-router';
import Page from 'src/components/Page';

const Map = () => {
  const navigate = useNavigate();

  const {
    geoserverCapabilitiesUrl,
    geoserverRestUrl,
    geoserverWorkspace
  } = mainConfig;

  const allLayerGroupsURL = `${geoserverRestUrl}/workspaces/${geoserverWorkspace}/layergroups`;

  const [open, setOpen] = React.useState(false);
  const [coordinates, setCoordinates] = React.useState('');
  const [layerGroupsArray, setLayerGroupsArray] = React.useState([]);
  const [layers, setLayers] = React.useState([]);
  const [capabilities, setCapabilities] = React.useState([]);
  const [type, setMarkerType] = React.useState('');

  const parser = new WMSCapabilities();

  React.useEffect(() => {
    fetch(`${geoserverCapabilitiesUrl}`)
      .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        let result = parser.read(text);
        let capabilities = result.Capability.Layer.Layer;
        capabilities = capabilities.map((layer) => ({
          name: layer.Name,
          title: layer.Title,
          extentCRS: layer.BoundingBox[0].extent,
          extentEPSG: layer.BoundingBox[1].extent,
          extent4326: layer.EX_GeographicBoundingBox,
          abstract: layer.Abstract
        }));
        setCapabilities(capabilities);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(allLayerGroupsURL, geoserverConfig('GET'))
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let layerGroupsArray = data && data.layerGroups.layerGroup;
        setLayerGroupsArray(layerGroupsArray);
      })
      .catch((err) => {
        setLayerGroupsArray([]);
        console.log(err);
      });
  }, []);

  React.useEffect(async () => {
    if (layerGroupsArray && layerGroupsArray.length > 0) {
      let promises = [];
      promises = layerGroupsArray.map((layerGroup) => {
        let url = layerGroup.href;
        return fetch(url, geoserverConfig('GET'))
          .then(function (response) {
            return response.json();
          })
          .catch((err) => {
            console.log('layer group fetch error: ' + err);
          });
      });

      Promise.all(promises).then((resolvedArray) => {
        setLayers([...layers, ...resolvedArray]);
      });
    }
  }, [layerGroupsArray]);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  /**
   * Listens for add marker event.
   *
   * Takes coordinates of clicked point on map, passes it to local state,
   * which is then passed along to a form dialog that allows addition of more
   * details to the added marker.
   *
   */
  window.emitter.addListener(
    'addMarker',
    (feature, coordinatesArray, markerType) => {
      setCoordinates(coordinatesArray);
      setMarkerType(markerType);
      handleOpenDialog();
    }
  );

  // Popup info
  window.emitter.addListener('mapLoaded', (map) => {
    // use get capabilities to get all layers from ngeo workspace
    // loop through them and add popup to features contained in each one
    map.on('singleclick', (evt) => {
      if (!window.isDrawingOrEditing) {
        const features = evt.map.getFeaturesAtPixel(evt.pixel);
        if (features.length > 0) {
          features.forEach((feature) => {
            if (feature) {
              // show popup just for point features && lines, ignore for polygon
              let featureType = feature.getGeometry().getType();
              if (featureType === 'Point' || featureType === 'LineString') {
                helpers.showFeaturePopup(evt.coordinate, feature, navigate);
              }
            }
          });
        }
      }
    });
  });

  // Hover interaction
  window.emitter.addListener('mapLoaded', (map) => {
    // Add Hover interaction
    let selected = null;
    let status = document.getElementById('identify-map-layer');
    map.on('pointermove', function (e) {
      if (selected !== null) {
        selected.setStyle(undefined);
        selected = null;
      }

      map.forEachFeatureAtPixel(e.pixel, function (f) {
        selected = f;
        const properties = f.getProperties();

        // Dont highlght forests or lines or points
        if (
          f &&
          !f.getGeometry().getType() === 'Point' && // exclude points
          // !f.id_.includes('Forest') && // exlude forests
          f.getGeometry().getType() === 'MultiPolygon'
        ) {
          f.setStyle(styles.HighlightStyle);
          // console.log(f.getGeometry().getType());
        }

        return true;
      });

      if (selected) {
        let region = selected.get('REGION');
        let county = selected.get('COUNTY');
        let constituency = selected.get('CONSTITUEN');
        let division = selected.get('DIVISION');
        let location = selected.get('LOCATION');
        let subLocation = selected.get('SUB_LOCATI');
        //
        let dispArray = [
          { name: 'region', value: region },
          { name: 'county', value: county },
          { name: 'sub county', value: constituency },
          { name: 'division', value: division },
          { name: 'location', value: location },
          { name: 'subLocation', value: subLocation }
        ];
        dispArray = dispArray.filter((v) => Boolean(v.value));
        dispArray = dispArray
          .map((v) => `${capitalize(v.name)}: ${capitalize(v.value)}`)
          .join(', ');
        status.innerHTML = dispArray;
      } else {
        status.innerHTML = '';
      }
    });
  });

  return (
    <Page title="Map">
      <div id="identify-map-layer" />
      <NgeoMap layers={layers} capabilities={capabilities} />
      <AddMarkerDialog
        coordinates={coordinates}
        open={open}
        handleClose={handleCloseDialog}
        type={type}
      />
    </Page>
  );
};

export default Map;

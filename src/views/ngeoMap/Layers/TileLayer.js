import { useContext, useEffect } from 'react';
import OLTileLayer from 'ol/layer/Tile';
import MapContext from '../Map/MapContext';
/* eslint-disable */
import { transformExtent } from 'ol/proj';

const TileLayer = ({
  source,
  zIndex = 0,
  style,
  isUserArea = false,
  maxZoom,
  minZoom,
  visible = true,
  opacity,
  extent,
  nationalBoundaryExtent,
  padding = [20, 20, 20, 20],
  isVisible = false
}) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const tileLayer = new OLTileLayer({
      source,
      zIndex,
      visible
    });

    if (opacity) {
      tileLayer.setOpacity(opacity);
    }

    if (minZoom) {
      tileLayer.setMinZoom(minZoom);
      tileLayer.setMaxZoom(Infinity);
    }

    // Set properties
    if (maxZoom) {
      tileLayer.setMaxZoom(maxZoom);
    }

    if (isVisible) {
      tileLayer.setVisible(true);
    }

    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);

    if (!window.userAreaExtent) {
      if (nationalBoundaryExtent) {
        extent = transformExtent(extent, 'EPSG:4326', 'EPSG:3857');
        window.boundaryExtent = extent;
        map.getView().fit(extent, {
          size: map.getSize(),
          padding
        });
      }
    }

    // Add zoom to extent functionality

    /* eslint-disable */
    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map]);

  return null;
};

export default TileLayer;

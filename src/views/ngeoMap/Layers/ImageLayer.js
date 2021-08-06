import { useContext, useEffect } from 'react';
import { Image as OLImageLayer } from 'ol/layer';
import MapContext from '../Map/MapContext';
/* eslint-disable */
import { transformExtent } from 'ol/proj';

const ImageLayer = ({
  source,
  zIndex = 0,
  isUserArea = false,
  maxZoom,
  minZoom,
  visible = true,
  opacity,
  extent,
  nationalBoundaryExtent = null,
  padding = [20, 20, 20, 20],
  isVisible = false
}) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const imageLayer = new OLImageLayer({
      source,
      zIndex,
      visible,
      opacity
    });

    if (minZoom) {
      imageLayer.setMinZoom(minZoom);
      imageLayer.setMaxZoom(Infinity);
    }

    if (maxZoom) {
      imageLayer.setMaxZoom(maxZoom);
    }

    if (isVisible) {
      imageLayer.setVisible(true);
    }

    map.addLayer(imageLayer);
    imageLayer.setZIndex(zIndex);

    // Fit map to national boundary if area not user area
    if (!window.userAreaExtent) {
      if (nationalBoundaryExtent) {
        // OL map uses EPSG:3857 projection by default,
        // transform extent to this since it's in 4326.
        extent = transformExtent(extent, 'EPSG:4326', 'EPSG:3857');
        window.boundaryExtent = extent;
        map.getView().fit(extent, {
          size: map.getSize(),
          duration: 1000,
          padding
        });
      }
    }

    /* eslint-disable */
    return () => {
      if (map) {
        map.removeLayer(imageLayer);
      }
    };
  }, [map]);

  return null;
};

export default ImageLayer;

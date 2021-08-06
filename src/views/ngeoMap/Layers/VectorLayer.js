import { useContext, useEffect } from 'react';
import OLVectorLayer from 'ol/layer/Vector';
/* eslint-disable */
import MapContext from '../Map/MapContext';

const VectorLayer = ({
  source,
  style,
  zIndex = 0,
  type,
  isUserArea = false,
  maxZoom,
  minZoom,
  minResolution,
  maxResolution,
  visible = false,
  opacity,
  name,
  isVisible = false,
  areaType
}) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    // Create layer
    const vectorLayer = new OLVectorLayer({
      source,
      visible,
      declutter: true
    });

    if (opacity) {
      vectorLayer.setOpacity(opacity);
    }

    // Set layer properties
    if (style) {
      vectorLayer.setStyle(style);
    }

    if (minZoom) {
      vectorLayer.setMinZoom(minZoom);
      vectorLayer.setMaxZoom(Infinity);
    }

    if (maxZoom) {
      vectorLayer.setMaxZoom(maxZoom);
    }

    if (minResolution) {
      // viewable above this resolution only
      vectorLayer.setMinResolution(minResolution);
      vectorLayer.setMaxResolution(Infinity);
    }

    if (maxResolution) {
      vectorLayer.setMaxResolution(maxResolution);
    }

    if (name) {
      vectorLayer.set('name', name);
    }

    if (areaType) {
      vectorLayer.set('areaType', areaType);
    }

    if (isVisible) {
      vectorLayer.setVisible(true);
    }

    vectorLayer.setZIndex(zIndex);

    /**
     * Add 'zoom to extent' functionality
     * for layer with user area.
     */
    if (type === 'area') {
      const vectorSource = vectorLayer.getSource();
      vectorSource.once('change', function (e) {
        if (vectorSource.getState() === 'ready') {
          let extent = vectorSource.getExtent();
          extent = extent.filter(
            (ext) => ext !== Infinity && ext !== -Infinity
          );
          if (extent.length > 0) {
            // set user area extent and fit map to extent
            if (isUserArea) {
              window.userAreaExtent = extent;
              // Only fit is layer is user area
              map.getView().fit(extent, {
                size: map.getSize(),
                duration: 1000,
                padding: [10, 10, 10, 10]
              });
            }
          }
        }
      });
    }

    // Add layer to map and have the map manage it.
    map.addLayer(vectorLayer);

    /* eslint-disable */
    // remove layer on un-mount
    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map]);

  return null;
};

export default VectorLayer;

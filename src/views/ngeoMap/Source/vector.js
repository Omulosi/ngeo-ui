import { Vector as VectorSource, TileWMS, ImageWMS } from 'ol/source';
import { GeoJSON } from 'ol/format';
import mainConfig from 'src/config/config.json';

const { geoserverUrl } = mainConfig;

const BASE_WMS_URL = `${geoserverUrl}ngeo/wms`;

// Vector source provides a source of features for vector layers
const vectorFeatures = ({ features }) => {
  return new VectorSource({
    features
  });
};

export const vectorGeoJson = ({ url }) => {
  return new VectorSource({
    format: new GeoJSON(),
    url
  });
};

/**
 *
 * params: LAYERS (required).
 * Rest of params have the following default
 * values:
 *  - STYLES=''
 *  - VERSION=1.3.0
 *  - WIDTH,HEIGHT,BBOX,CRS(SRS for WMS , 1.3.0) are set dynamically.
 *
 */
export const vectorSourceWMS = ({ url = BASE_WMS_URL, params }) => {
  return new TileWMS({
    url,
    serverType: 'geoserver',
    params
  });
};

export const vectorSourceImageWMS = ({ url = BASE_WMS_URL, params }) => {
  return new ImageWMS({
    url,
    serverType: 'geoserver',
    params
  });
};

export default vectorFeatures;

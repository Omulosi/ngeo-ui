/* eslint-disable */
import mainConfig from 'src/config/config.json';

const { geoserverUrl } = mainConfig;

const BASE_FEATURE_URL = `${geoserverUrl}ngeo/wfs?service=wfs&version=2.0.0&request=getfeature&`;

const BASE_OL_URL = `${geoserverUrl}ngeo/wfs?service=wms&version=1.1.0&request=getmap&`;

const createGetFeatureQuery = (feature) => {
  return `${BASE_FEATURE_URL}typename=${feature}&outputFormat=json`;
};

export const createGetOpenLayersQuery = (layer) => {
  return `${BASE_OL_URL}layers=ngeo:${layer}&format=application/openlayers`;
};

export const createFilterFeatureQuery = (feature, filterString) => {
  return `${BASE_FEATURE_URL}typename=${feature}&outputFormat=json&cql_filter=${filterString}`;
};

export default createGetFeatureQuery;

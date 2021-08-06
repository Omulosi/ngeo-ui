import { useQuery } from 'react-query';
import createGetFeatureQuery from 'src/utils/queries';
import fetchResource, { generalFetcher } from '../fetchers';

const getGeoserverCounties = async () => {
  const url = createGetFeatureQuery('ke_counties');
  const data = await generalFetcher(url);
  return data;
};

const getCounties = async () => {
  const { data } = await fetchResource('/counties');
  return data;
};

const getCounty = async (countyName) => {
  const { data } = await fetchResource(`/counties?counties=${countyName}`);
  return data;
};

export function useCounties() {
  return useQuery('counties', getCounties);
}

export function useGeoserverCounties() {
  return useQuery('counties-geoserver', getGeoserverCounties);
}

export function useCounty(countyName) {
  return useQuery(['counties', countyName], () => {
    return getCounty(countyName);
  });
}

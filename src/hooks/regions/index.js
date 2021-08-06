import { useQuery } from 'react-query';
import fetchResource from '../fetchers';

const getRegions = async () => {
  const { data } = await fetchResource('/regions');
  return data;
};

const getRegion = async (regionName) => {
  const { data } = await fetchResource(`/regions?search=${regionName}`);
  return data;
};

export function useRegions() {
  return useQuery('regions', getRegions);
}

export function useRegion(regionName) {
  return useQuery(['regions', regionName], () => {
    return getRegion(regionName);
  });
}

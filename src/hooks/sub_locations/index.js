import { useQuery } from 'react-query';
import fetchResource from '../fetchers';

const getSublocations = async () => {
  const { data } = await fetchResource('/sublocations');
  return data;
};

const filterSublocations = async (filterString) => {
  const { data } = await fetchResource(`/sublocations?${filterString}`);
  return data;
};

export function useSublocations() {
  return useQuery('sublocations', getSublocations);
}

export function useSublocation(filterString) {
  return useQuery(['sublocations', filterString], () => {
    return filterSublocations(filterString);
  });
}

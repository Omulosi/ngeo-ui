import { useQuery } from 'react-query';
import fetchResource from '../fetchers';

const getRegionalManager = async () => {
  const { data } = await fetchResource('/regional_managers/me/');
  return data;
};

const getRegionalManagerList = async () => {
  const { data } = await fetchResource('/regional_managers');
  return data;
};

const getRegionalManagerById = async (id) => {
  const { data } = await fetchResource(`/regional_managers/${id}`);
  return data;
};

export default function useRegionalManager() {
  return useQuery('regionalManager', () => getRegionalManager());
}

export function useRegionalManagerList() {
  return useQuery('regionalManager-all', () => getRegionalManagerList());
}

/* eslint-disable */
export function useRegionalManagerById(rmId) {
  return useQuery(['regionalManager', rmId], () =>
    getRegionalManagerById(rmId)
  );
}

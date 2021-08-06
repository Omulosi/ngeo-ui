import { useQuery } from 'react-query';
import fetchResource from '../fetchers';

const getReturns = async () => {
  const { data } = await fetchResource('/returns');
  return data;
};

const getReturnById = async (returnId) => {
  const { data } = await fetchResource(`/returns/${returnId}`);
  return data;
};

export function useReturns() {
  return useQuery('returns', getReturns);
}

export function useReturn(returnId) {
  return useQuery(['return', returnId], () => getReturnById(returnId));
}

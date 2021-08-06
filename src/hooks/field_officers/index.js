import { useQuery } from 'react-query';
import fetchResource from '../fetchers';

const getFieldOfficer = async () => {
  const { data } = await fetchResource('/field_officers/me/');
  return data;
};

const getFieldOfficerById = async (id) => {
  const { data } = await fetchResource(`/field_officers/${id}`);
  return data;
};

const getFieldOfficerList = async () => {
  const { data } = await fetchResource('/field_officers');
  return data;
};

export default function useFieldOfficer() {
  return useQuery('fieldOfficer', () => getFieldOfficer());
}

export function useFieldOfficerById(fooId) {
  return useQuery('fieldOfficer-detail', () => getFieldOfficerById(fooId));
}

export function useFieldOfficerList() {
  return useQuery('fieldOfficer-list', () => getFieldOfficerList());
}

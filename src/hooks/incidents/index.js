import { useQuery } from 'react-query';
import fetchResource from '../fetchers';

const getIncidents = async () => {
  const { data } = await fetchResource('/incidents');
  return data;
};

const getIncidentById = async (id) => {
  const { data } = await fetchResource(`/incidents/${id}`);
  return data;
};

export function useIncidents() {
  return useQuery('incidents', getIncidents);
}

export function useIncident(incidentId) {
  return useQuery(['incident', incidentId], () => getIncidentById(incidentId));
}

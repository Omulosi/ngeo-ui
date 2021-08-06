import { useQuery } from 'react-query';
import fetchResource from '../fetchers';

const getNotifications = async () => {
  const { data } = await fetchResource('/user/notifications/');
  return data;
};

export default function useNotifications() {
  return useQuery('notifications', () => getNotifications(), {
    refetchInterval: 1000
  });
}

// export function useFieldOfficerById(fooId) {
//   return useQuery(['fieldOfficer', fooId], () => getFieldOfficerById(fooId));
// }

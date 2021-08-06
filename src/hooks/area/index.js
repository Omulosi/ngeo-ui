import { useSnackbar } from 'notistack';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import fetchResource, {
  // addResource,
  updateResource
  // deleteResource
} from '../fetchers';

const getAreas = async () => {
  const { data } = await fetchResource('/areas');
  return data;
};

const getAreaById = async (id) => {
  const { data } = await fetchResource(`/areas/${id}`);
  return data;
};

const assignArea = async (area) => {
  const { data } = await updateResource('/areas/assign', {
    region: area.region,
    county: area.county,
    constituency: [...area.constituency],
    sub_county: [...area.sub_county],
    division: [...area.division],
    location: [...area.location],
    sub_location: [...area.sub_location],
    user_id: area.user_id,
    project_id: area.project_id,
    user_role: area.role
  });
  return data;
};

export function useAreas() {
  return useQuery('areas', getAreas);
}

export function useArea(areaId) {
  return useQuery(['areaId', areaId], () => getAreaById(areaId));
}

export function useAssignArea() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const mutation = useMutation(assignArea, {
    onSuccess: () => {
      queryClient.invalidateQueries('user-id'); // Reload user details
      queryClient.invalidateQueries('project'); // Reload project details
      queryClient.invalidateQueries('agent-id'); // Reload agent details
      queryClient.invalidateQueries('fieldOfficer-detail'); // Reload foo details
      enqueueSnackbar('Area assigned to user successfully!', {
        variant: 'success'
      });
    },
    onError: () => {
      enqueueSnackbar('Error assigning area', {
        variant: 'error'
      });
    }
  });
  return mutation;
}

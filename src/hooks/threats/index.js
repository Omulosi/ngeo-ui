import { useSnackbar } from 'notistack';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import fetchResource, {
  // addResource,
  updateResource
  // deleteResource,
} from '../fetchers';

const getThreats = async () => {
  const { data } = await fetchResource('/threats');
  return data;
};

const getThreatById = async (id) => {
  const { data } = await fetchResource(`/threats/${id}`);
  return data;
};

// eslint-disable-next-line camelcase
const activateThreat = async ({ url, is_active }) => {
  const { data } = await updateResource(`${url}`, {
    is_active
  });
  return data;
};

const deleteThreat = async ({ url, deleteReason }) => {
  const { data } = await updateResource(`${url}/delete`, { deleteReason });
  return data;
};

export function useThreats() {
  return useQuery('threats', getThreats);
}

export function useThreat(threatId) {
  return useQuery('threat-detail', () => getThreatById(threatId));
}

export function useActivateThreat() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const mutation = useMutation(activateThreat, {
    onSuccess: () => {
      queryClient.invalidateQueries('threat-detail');
      enqueueSnackbar('Threat successfully activated!', {
        variant: 'success'
      });
    },
    onError: () => {
      enqueueSnackbar('Error activating threat', {
        variant: 'error'
      });
    }
  });
  return mutation;
}

export function useDeleteThreat() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteThreat, {
    onSuccess: () => {
      queryClient.invalidateQueries('threat-detail'); // Reload foo details
      enqueueSnackbar('Threat deactivated successfully!', {
        variant: 'success'
      });
    },
    onError: () => {
      enqueueSnackbar('Error deactivating threat', {
        variant: 'error'
      });
    }
  });
  return mutation;
}

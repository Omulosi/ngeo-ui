import { useSnackbar } from 'notistack';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import fetchResource, {
  // addResource,
  updateResource
  // deleteResource
} from '../fetchers';

const getUser = async () => {
  const { data } = await fetchResource('/auth/users/me');
  if (data) {
    data.isAuthenticated = true;
  }
  return data;
};

const getUserById = async (id) => {
  const { data } = await fetchResource(`/users/${id}`);
  return data;
};

const getUserList = async () => {
  const { data } = await fetchResource('/users');
  return data;
};

const assignRole = async ({ resourceId, data: user }) => {
  const { data } = await updateResource(`/users/${user.id}`, {
    role: resourceId
  });
  return data;
};

// eslint-disable-next-line camelcase
const activateUser = async ({ url, is_active }) => {
  const { data } = await updateResource(`${url}`, {
    is_active
  });
  return data;
};

export default function useUser() {
  return useQuery('user', () => getUser());
}

export function useUserList() {
  return useQuery('user-list', () => getUserList());
}

export function useUserById(id) {
  return useQuery('user-id', () => getUserById(id));
}

export function useAssignRole() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const mutation = useMutation(assignRole, {
    onSuccess: () => {
      queryClient.invalidateQueries('user-id');
      enqueueSnackbar('User role updated successfully!', {
        variant: 'success'
      });
    },
    onError: () => {
      enqueueSnackbar('Error assigning user role', {
        variant: 'error'
      });
    }
  });
  return mutation;
}

export function useActivateUser() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const mutation = useMutation(activateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('user-id');
      enqueueSnackbar('User successfully activated!', {
        variant: 'success'
      });
    },
    onError: () => {
      enqueueSnackbar('Error activating user', {
        variant: 'error'
      });
    }
  });
  return mutation;
}

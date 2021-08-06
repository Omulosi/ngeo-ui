import { useSnackbar } from 'notistack';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import fetchResource, {
  addResource,
  updateResource,
  deleteResource
} from '../fetchers';

const getThemes = async () => {
  const { data } = await fetchResource('/themes');
  return data;
};

const getThemeById = async (themeId) => {
  const { data } = await fetchResource(`/themes/${themeId}`);
  return data;
};

const addTheme = async (theme) => {
  const { data } = await addResource('/themes', {
    name: theme.name,
    color: theme.color
  });
  return data;
};

const editTheme = async (theme) => {
  const { data } = await updateResource(`/themes/${theme.id}`, {
    name: theme.name
  });
  return data;
};

const deleteTheme = async (theme) => {
  const { data } = await deleteResource(`/themes/${theme.id}`);
  return data;
};

export function useThemes() {
  return useQuery('themes', getThemes);
}

export function useTheme(themeId) {
  return useQuery(['theme', themeId], () => getThemeById(themeId));
}

export function useAddTheme() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const mutation = useMutation(addTheme, {
    onSuccess: () => {
      queryClient.invalidateQueries('themes');
      enqueueSnackbar('Theme successfully added!', {
        variant: 'success'
      });
    },
    onError: () => {
      enqueueSnackbar('Error adding theme', {
        variant: 'error'
      });
    }
  });
  return mutation;
}

export function useEditTheme() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const mutation = useMutation(editTheme, {
    onSuccess: () => {
      queryClient.invalidateQueries('themes');
      enqueueSnackbar('Theme successfully updated!', {
        variant: 'success'
      });
    },
    onError: () => {
      enqueueSnackbar('Error updating theme', {
        variant: 'error'
      });
    }
  });
  return mutation;
}

export function useDeleteTheme() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteTheme, {
    onSuccess: () => {
      queryClient.invalidateQueries('themes');
      enqueueSnackbar('Theme successfully deleted!', {
        variant: 'success'
      });
    },
    onError: () => {
      enqueueSnackbar('Error deleting theme', {
        variant: 'error'
      });
    }
  });
  return mutation;
}

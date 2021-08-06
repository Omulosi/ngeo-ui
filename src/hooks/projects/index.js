import { useSnackbar } from 'notistack';
import { useQuery, useMutation, useQueryClient } from 'react-query';
// import { useNavigate } from 'react-router';
import fetchResource, {
  // addResource,
  updateResource,
  // deleteResource,
  uploadFileResource
} from '../fetchers';

const getProjects = async () => {
  const { data } = await fetchResource('/projects');
  return data;
};

const getProjectById = async (projectId) => {
  const { data } = await fetchResource(`/projects/${projectId}`);
  return data;
};

const uploadFile = async (file) => {
  const { data } = await uploadFileResource('/projects/upload', file);
  return data;
};

const assignProject = async ({ resourceId, data: assignee }) => {
  const { data } = await updateResource(`projects/${resourceId}`, assignee);
  return data;
};

const deleteProject = async ({ url, deleteReason }) => {
  const { data } = await updateResource(`${url}/delete`, { deleteReason });
  return data;
};

// eslint-disable-next-line camelcase
const activateProject = async ({ url, is_active }) => {
  const { data } = await updateResource(`${url}`, {
    is_active
  });
  return data;
};

export function useProjects() {
  return useQuery('projects', getProjects);
}

export function useProject(projectId) {
  return useQuery('project-detail', () => getProjectById(projectId));
}

export function useUploadFileResource() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const mutation = useMutation(uploadFile, {
    onSuccess: () => {
      queryClient.invalidateQueries('projects');
      enqueueSnackbar('Projects from Excel file successfully added!', {
        variant: 'success'
      });
    },
    onError: () => {
      enqueueSnackbar('Error uploading file', {
        variant: 'error'
      });
    }
  });
  return mutation;
}

export function useAssignProject() {
  const { enqueueSnackbar } = useSnackbar();
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(assignProject, {
    onSuccess: () => {
      queryClient.invalidateQueries('agent-id'); // Reload agent details
      queryClient.invalidateQueries('fieldOfficer-detail'); // Reload foo details
      enqueueSnackbar('Project assigned successfully!', {
        variant: 'success'
      });
      // navigate('/app/projects', { replace: true });
    },
    onError: () => {
      enqueueSnackbar('Error assigning project', {
        variant: 'error'
      });
    }
  });
  return mutation;
}

export function useDeleteProject() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteProject, {
    onSuccess: () => {
      queryClient.invalidateQueries('project-detail'); // Reload foo details
      enqueueSnackbar('Project deactivated successfully!', {
        variant: 'success'
      });
    },
    onError: () => {
      enqueueSnackbar('Error deactivating project', {
        variant: 'error'
      });
    }
  });
  return mutation;
}

export function useActivateProject() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const mutation = useMutation(activateProject, {
    onSuccess: () => {
      queryClient.invalidateQueries('project-detail');
      enqueueSnackbar('Project successfully activated!', {
        variant: 'success'
      });
    },
    onError: () => {
      enqueueSnackbar('Error activating project', {
        variant: 'error'
      });
    }
  });
  return mutation;
}

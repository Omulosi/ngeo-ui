// import axios from 'axios';
import { axiosWithAuth } from 'src/utils/axios';
import BASE_URL from 'src/config';
/* eslint-disable */
import { SET_ERRORS } from '../types';

/* eslint-ignore */
// export const assignProject = ({ resourceId, data }, enqueueSnackbar) => (
//   dispatch
// ) => {
//   axiosWithAuth()
//     .patch(`${BASE_URL}/projects/${resourceId}`, data)
//     .then(() => {
//       enqueueSnackbar('Project assigned to successfully!', {
//         variant: 'success'
//       });
//     })
//     .catch((err) => {
//       let errorMsg = 'Error assigning project';

//       errorMsg = errorMsg.toLocaleLowerCase();

//       enqueueSnackbar('Error assigning project', {
//         variant: 'error'
//       });

//       dispatch({ type: SET_ERRORS, payload: errorMsg });
//       console.log(err);
//     });
// };

export const UnAssignProject = (data, enqueueSnackbar) => (dispatch) => {
  // debugger;
  axiosWithAuth()
    .patch(`${BASE_URL}/projects/${data.project_id}/unassign`, data)
    .then(() => {
      enqueueSnackbar('Project un-assigned to successfully!', {
        variant: 'success'
      });
    })
    .catch((err) => {
      let errorMsg = 'Error un-assigning project';

      errorMsg = errorMsg.toLocaleLowerCase();

      enqueueSnackbar('Error un-assigning project', {
        variant: 'error'
      });

      dispatch({ type: SET_ERRORS, payload: errorMsg });
      console.log(err);
    });
};

export const addProject = (data, navigate, enqueueSnackbar, setSubmitting) => (
  dispatch
) => {
  axiosWithAuth()
    .post(`${BASE_URL}/projects`, {
      date_added: data.date_submitted,
      name: data.name,
      description: data.description,
      theme: data.theme.id,
      initiated_by: data.initiated_by,
      longitude: data.longitude,
      latitude: data.latitude
    })
    .then(() => {
      enqueueSnackbar('Project successfully added!', {
        variant: 'success'
      });
      setSubmitting(false);
      navigate(`/app/projects`, { replace: true });
    })
    .catch((err) => {
      let errorMsg = 'Error creating project';
      //   errorMsg = errorMsg.toLocaleLowerCase();
      dispatch({ type: SET_ERRORS, payload: errorMsg });
      console.log(err);
      enqueueSnackbar('Error adding project!', {
        variant: 'error'
      });
    });
};

export const editProject = (data, navigate, enqueueSnackbar, setSubmitting) => (
  dispatch
) => {
  axiosWithAuth()
    .patch(`${BASE_URL}/projects/${data.projectID}`, {
      ...data.updatedData,
      theme: data.updatedData.theme.id
    })
    .then(() => {
      enqueueSnackbar('Project successfully editted!', {
        variant: 'success'
      });
      setSubmitting(false);
      navigate(`/app/projects/${data.projectID}`);
    })
    .catch((err) => {
      let errorMsg = 'Error creating project';
      //   errorMsg = errorMsg.toLocaleLowerCase();
      dispatch({ type: SET_ERRORS, payload: errorMsg });
      setSubmitting(false);
      enqueueSnackbar('Error editting project!', {
        variant: 'error'
      });
    });
};

export const deleteProject = ({ url }, navigate, enqueueSnackbar) => (
  dispatch
) => {
  axiosWithAuth()
    .delete(`${BASE_URL}${url}`)
    .then(() => {
      enqueueSnackbar('Project successfully deleted!', {
        variant: 'success'
      });

      navigate(`/app/projects`, { replace: true });
    })
    .catch((err) => {
      let errorMsg = 'Error deleting project';

      //   errorMsg = errorMsg.toLocaleLowerCase();
      dispatch({ type: SET_ERRORS, payload: errorMsg });
      console.log(err);
      enqueueSnackbar(errorMsg, {
        variant: 'error'
      });
    });
};

// import axios from 'axios';
import { axiosWithAuth } from 'src/utils/axios';
import BASE_URL from 'src/config';
/* eslint-disable */
import { SET_ERRORS } from '../types';

/* eslint-ignore */
export const addTheme = (data, navigate, enqueueSnackbar) => (dispatch) => {
  axiosWithAuth()
    .post(`${BASE_URL}/themes`, {
      name: data.name,
      color: data.color
    })
    .then(() => {
      enqueueSnackbar('New theme successfully added!', {
        variant: 'success'
      });
      navigate(`/app/themes`, { replace: true });
    })
    .catch((err) => {
      let errorMsg = 'Error adding theme!';
      dispatch({ type: SET_ERRORS, payload: errorMsg });
      enqueueSnackbar(errorMsg, {
        variant: 'error'
      });
    });
};

export const editTheme = (data, navigate, enqueueSnackbar) => (dispatch) => {
  axiosWithAuth()
    .patch(`${BASE_URL}/themes/${data.id}`, { name: data.name })
    .then(() => {
      enqueueSnackbar('Theme successfully updated!', {
        variant: 'success'
      });
      navigate(`/app/themes`);
    })
    .catch((err) => {
      let errorMsg = 'Error updating theme!';
      dispatch({ type: SET_ERRORS, payload: errorMsg });
      enqueueSnackbar(errorMsg, {
        variant: 'error'
      });
    });
};

export const deleteTheme = (data, navigate, enqueueSnackbar) => (dispatch) => {
  axiosWithAuth()
    .delete(`${BASE_URL}/themes/${data.id}`)
    .then(() => {
      enqueueSnackbar('Theme successfully deleted!', {
        variant: 'success'
      });

      navigate(`/app/themes`, { replace: true });
    })
    .catch((err) => {
      let errorMsg = 'Error deleting theme';
      dispatch({ type: SET_ERRORS, payload: errorMsg });
      enqueueSnackbar(errorMsg, {
        variant: 'error'
      });
    });
};

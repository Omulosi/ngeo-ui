// import axios from 'axios';
import { axiosWithAuth } from 'src/utils/axios';
import BASE_URL from 'src/config';
/* eslint-disable */
import { SET_ERRORS } from '../types';

/* eslint-ignore */
export const addIncident = (data, navigate, enqueueSnackbar, setSubmitting) => (
  dispatch
) => {
  axiosWithAuth()
    .post(`${BASE_URL}/incidents`, {
      name: data.name,
      description: data.description,
      date_reported: data.date_submitted,
      longitude: data.longitude,
      latitude: data.latitude
    })
    .then(() => {
      enqueueSnackbar('Incident successfully added!', {
        variant: 'success'
      });
      setSubmitting(false);
      navigate(`/app/incidents`, { replace: true });
    })
    .catch((err) => {
      let errorMsg = 'Error adding incident!';

      //   errorMsg = errorMsg.toLocaleLowerCase();
      dispatch({ type: SET_ERRORS, payload: errorMsg });
      setSubmitting(false);
      console.log(err);
      enqueueSnackbar(errorMsg, {
        variant: 'error'
      });
    });
};

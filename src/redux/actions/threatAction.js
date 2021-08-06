// import axios from 'axios';
import { axiosWithAuth } from 'src/utils/axios';
import BASE_URL from 'src/config';
/* eslint-disable */
import { SET_ERRORS } from '../types';

/* eslint-ignore */
export const addThreat = (data, navigate, enqueueSnackbar, setSubmitting) => (
  dispatch
) => {
  axiosWithAuth()
    .post(`${BASE_URL}/threats`, {
      name: data.name,
      description: data.description,
      date_reported: data.date_submitted,
      origin: data.from,
      destination: data.to,
      location: data.coordinates,
      color: data.color,
      from_region: data.fromRegion,
      to_region: data.toRegion,
      threat_type: data.threatType
    })
    .then(() => {
      enqueueSnackbar('Threat successfully added!', {
        variant: 'success'
      });
      setSubmitting(false);
      navigate(`/app/threats`, { replace: true });
    })
    .catch((err) => {
      let errorMsg = 'Error adding threat!';
      dispatch({ type: SET_ERRORS, payload: errorMsg });
      setSubmitting(false);
      console.log(err);
      enqueueSnackbar(errorMsg, {
        variant: 'error'
      });
    });
};

export const editThreat = (data, navigate, enqueueSnackbar, setSubmitting) => (
  dispatch
) => {
  axiosWithAuth()
    .patch(`${BASE_URL}/threats/${data.id}`, { ...data })
    .then(() => {
      enqueueSnackbar('Threat successfully updated!', {
        variant: 'success'
      });
      setSubmitting(false);
      navigate(`/app/threats/${data.id}`, { replace: true });
    })
    .catch((err) => {
      let errorMsg = 'Error updating threat!';
      dispatch({ type: SET_ERRORS, payload: errorMsg });
      setSubmitting(false);
      console.log(err);
      enqueueSnackbar(errorMsg, {
        variant: 'error'
      });
    });
};

export const deleteThreat = ({ url }, navigate, enqueueSnackbar) => (
  dispatch
) => {
  axiosWithAuth()
    .delete(`${BASE_URL}${url}`)
    .then(() => {
      enqueueSnackbar('Threat successfully deleted!', {
        variant: 'success'
      });

      navigate(`/app/threats`, { replace: true });
    })
    .catch((err) => {
      let errorMsg = 'Error deleting threat';
      //   errorMsg = errorMsg.toLocaleLowerCase();
      dispatch({ type: SET_ERRORS, payload: errorMsg });
      console.log(err);
      enqueueSnackbar(errorMsg, {
        variant: 'error'
      });
    });
};

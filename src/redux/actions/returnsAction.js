// import axios from 'axios';
import { axiosWithAuth } from 'src/utils/axios';
import BASE_URL from 'src/config';
/* eslint-disable */
import { SET_ERRORS } from '../types';

/* eslint-ignore */
export const createReturn = (
  data,
  navigate,
  enqueueSnackbar,
  setSubmitting
) => (dispatch) => {
  axiosWithAuth()
    .post(`${BASE_URL}/returns`, data)
    .then(() => {
      enqueueSnackbar('Return successfully added!', { variant: 'success' });
      setSubmitting(false);
      navigate('/app/returns', { replace: true });
    })
    .catch((err) => {
      let errorMsg = 'Error adding return';

      // Get the first error message
      /* eslint-ignore */
      if (
        err.response &&
        err.response.status !== 404 &&
        err.response &&
        err.response.data
      ) {
        for (let k in err.response.data) {
          errorMsg = err.response.data[k];
          break;
        }
      }
      dispatch({ type: SET_ERRORS, payload: errorMsg });
      console.log(`${err} => ${errorMsg}`);
      setSubmitting(false);
      enqueueSnackbar('Error adding return!', { variant: 'error' });
    });
};

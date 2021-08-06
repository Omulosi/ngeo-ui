// import axios from 'axios';
import { axiosWithAuth } from 'src/utils/axios';
import BASE_URL from 'src/config';
/* eslint-disable */
import { SET_ERRORS } from '../types';

/* eslint-ignore */
// Change user's password
export const updatePassword = (data, enqueueSnackbar, setSubmitting) => (
  dispatch
) => {
  axiosWithAuth()
    .post(`${BASE_URL}/auth/users/set_password/`, {
      current_password: data.old,
      new_password: data.password
    })
    .then(() => {
      enqueueSnackbar('Password successfully updated!', {
        variant: 'success'
      });
      setSubmitting(false);
    })
    .catch((err) => {
      let errorMsg = 'Error updating password!';

      try {
        errorMsg = err.response.data.errors[0].detail;
      } catch (err) {
        errorMsg = 'Error updating password!';
      }

      dispatch({ type: SET_ERRORS, payload: errorMsg });
      setSubmitting(false);
      console.log(err);
      enqueueSnackbar(errorMsg, {
        variant: 'error'
      });
    });
};

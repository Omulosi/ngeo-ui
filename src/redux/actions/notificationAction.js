import { axiosWithAuth } from 'src/utils/axios';
import BASE_URL from 'src/config';
/* eslint-disable */
import { SET_ERRORS } from '../types';

export const markNotificationRead = (data, setSubmitting) => (dispatch) => {
  axiosWithAuth()
    .patch(`${BASE_URL}/user/notifications/${data.notification}`, {})
    .then(() => {
      // navigate('/app/agents', { replace: true });
      // enqueueSnackbar('Approval request sent successfully!', {
      //   variant: 'success'
      // });
      console.log('Notification read');
    })
    .catch((err) => {
      let errorMsg = '';

      // Get the first error message
      /* eslint-ignore */
      //   if (
      //     err.response &&
      //     err.response.status !== 404 &&
      //     err.response &&
      //     err.response.data
      //   ) {
      //     for (let k in err.response.data) {
      //       errorMsg = err.response.data[k];
      //       break;
      //     }
      //   }
      //   dispatch({ type: SET_ERRORS, payload: errorMsg });
      console.log(`${err} => ${errorMsg}`);
      //   enqueueSnackbar('Error sending approval request', {
      //     variant: 'error'
      //   });
    });
};

// import axios from 'axios';
import { axiosWithAuth } from 'src/utils/axios';
import BASE_URL from 'src/config';
/* eslint-disable */
import { SET_AREA_ERRORS } from '../types';

/* eslint-ignore */
export const assignArea = (data, enqueueSnackbar, resetForm) => (dispatch) => {
  axiosWithAuth()
    .patch(`${BASE_URL}/areas/assign`, {
      region: data.region,
      county: data.county,
      constituency: [...data.constituency],
      sub_county: [...data.sub_county],
      division: [...data.division],
      location: [...data.location],
      sub_location: [...data.sub_location],
      user_id: data.user_id,
      project_id: data.project_id,
      user_role: data.role
    })
    .then(() => {
      enqueueSnackbar('Area assigned to user successfully!', {
        variant: 'success'
      });
      dispatch({ type: 'CLEAR_ERRORS' });
      resetForm();
    })
    .catch((err) => {
      let errorMsg = 'Error assigning area to user';
      dispatch({ type: SET_AREA_ERRORS, payload: errorMsg });
      enqueueSnackbar(errorMsg, {
        variant: 'error'
      });
      console.log(err);
    });
};

export const assigncountyArea = (
  data,
  navigate,
  enqueueSnackbar,
  setSubmitting
) => (dispatch) => {
  axiosWithAuth()
    .post(`${BASE_URL}/areas/assign`, {
      county: data.county,
      sub_county: [...data.sub_county],
      ward: [...data.ward]
    })
    .then(() => {
      enqueueSnackbar('Area assigned to user successfully!', {
        variant: 'success'
      });
      setSubmitting(false);
      //   navigate(`/app/agents/${agentId}`, { replace: true });
    })
    .catch((err) => {
      let errorMsg = 'Error assigning area to user';

      // Get the first error message
      if (err.response.status !== 404 && err.response && err.response.data) {
        for (let k in err.response.data) {
          errorMsg = err.response.data[k];
          break;
        }
        errorMsg = errorMsg[0].detail;
      }

      errorMsg = errorMsg.toLocaleLowerCase();
      dispatch({ type: SET_AREA_ERRORS, payload: errorMsg });
      enqueueSnackbar(errorMsg, {
        variant: 'error'
      });
      console.log(err);
    });
};

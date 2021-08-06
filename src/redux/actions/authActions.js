import axios from 'axios';
/* eslint-disable */
import { axiosWithAuth } from 'src/utils/axios';
import BASE_URL from 'src/config';
import { SIGNIN, LOGOUT, SET_ERRORS } from '../types';
import { roles } from 'src/config';
import { capitalizeFirstLetter } from 'src/utils/capitalize';

export const signUp = (
  { firstName, lastName, email, password, staffNumber },
  navigate,
  enqueueSnackbar,
  setSubmitting
) => (dispatch) => {
  axios
    .post(`${BASE_URL}/auth/users/`, {
      first_name: firstName,
      last_name: lastName,
      staff_number: staffNumber,
      email,
      password
    })
    .then(() => {
      navigate('/login', { replace: true });
      enqueueSnackbar('Successfully signed up!', { variant: 'success' });
      setSubmitting(false);
    })
    .catch((err) => {
      let errorMsg = 'Error signing up';
      // Get the first error message
      /* eslint-ignore */
      if (
        err.response &&
        err.response.status !== 404 &&
        err.response.status !== 500 &&
        err.response &&
        err.response.data
      ) {
        Object.values(err.response.data).forEach((val) => {
          errorMsg = val[0].detail;
          return null;
        });
      }
      dispatch({ type: SET_ERRORS, payload: errorMsg });
      console.log(`${err} => ${errorMsg}`);
      setSubmitting(false);
    });
};

export const login = (
  { email, password },
  navigate,
  enqueueSnackbar,
  setSubmitting
) => (dispatch) => {
  axios
    .post(`${BASE_URL}/auth/token/login/`, {
      email,
      password
    })
    .then(({ data }) => {
      const { auth_token: token } = data.data.attributes;
      localStorage.setItem('token', `${token}`);
      setSubmitting(false);
      dispatch({ type: SIGNIN, payload: token });
      axiosWithAuth()
        .get('/auth/users/me/')
        .then(({ data }) => {
          if (
            [roles.RM, roles.CM, roles.FOO, roles.CEO, roles.Finance].includes(
              data.data.attributes.role
            )
          ) {
            navigate('/c/map', { replace: true });
          } else {
            navigate('/app/activity', { replace: true });
          }
          enqueueSnackbar('Successfuly logged in!', { variant: 'success' });
        })
        .catch((err) => {
          enqueueSnackbar('Error navigating to home page after login', {
            variant: 'error'
          });
        });
    })
    .catch((err) => {
      let errorMsg = 'Error logging in';
      // Get the first error message
      /* eslint-ignore */
      if (
        err.response &&
        err.response.status !== 404 &&
        err.response.status !== 500 &&
        err.response &&
        err.response.data
      ) {
        Object.values(err.response.data).forEach((val) => {
          errorMsg = val[0].detail;
          return null;
        });
      }
      dispatch({ type: SET_ERRORS, payload: capitalizeFirstLetter(errorMsg) });
      console.log(`${err} => ${errorMsg}`);
      setSubmitting(false);
    });
};

export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem('token');
  window.userAreaExtent = null;
  axiosWithAuth()
    .post(`${BASE_URL}/auth/token/logout/`)
    .then(() => {
      console.log('Logged out');
    })
    .catch((err) => {
      console.log(err);
    });
  dispatch({ type: LOGOUT });
  navigate('/login');
};

/// Roles
// export const assignRole = (
//   { firstName, lastName, email, password, role },
//   navigate,
//   enqueueSnackbar,
//   setSubmitting
// ) => (dispatch) => {
//   axios
//     .post(`${BASE_URL}/auth/users/`, {
//       first_name: firstName,
//       last_name: lastName,
//       email,
//       password,
//       role
//     })
//     .then(() => {
//       navigate('/login', { replace: true });
//       enqueueSnackbar('Successfully signed up!', { variant: 'success' });
//       setSubmitting(false);
//     })
//     .catch((err) => {
//       let errorMsg = 'Error signing up';
//       // Get the first error message
//       /* eslint-ignore */
//       if (
//         err.response &&
//         err.response.status !== 404 &&
//         err.response &&
//         err.response.data
//       ) {
//         Object.values(err.response.data).forEach((val) => {
//           errorMsg = val[0].detail;
//           return null;
//         });
//       }
//       dispatch({ type: SET_ERRORS, payload: errorMsg });
//       console.log(`${err} => ${errorMsg}`);
//       setSubmitting(false);
//     });
// };

// export const updateUserActiveStatus = (
//   { url, is_active },
//   navigate,
//   enqueueSnackbar,
//   setSubmitting
// ) => (dispatch) => {
//   let action = is_active ? 'activated' : !is_active ? 'deactivated' : 'unknown';
//   axiosWithAuth()
//     .patch(`${BASE_URL}${url}`, { is_active })
//     .then(() => {
//       // navigate('/app/users', { replace: true });

//       enqueueSnackbar(`User successfully ${action}`, { variant: 'success' });
//       setSubmitting(false);
//     })
//     .catch((err) => {
//       let errorMsg = `Error perfoming ${action} action on  user!`;
//       dispatch({ type: SET_ERRORS, payload: errorMsg });
//       console.log(`${err} => ${errorMsg}`);
//       enqueueSnackbar(errorMsg, { variant: 'error' });
//       setSubmitting(false);
//     });
// };

// export const deactivateUser = (
//   resourceUrl,
//   navigate,
//   enqueueSnackbar,
//   setSubmitting
// ) => (dispatch) => {
//   axiosWithAuth()
//     .patch(`${BASE_URL}${resourceUrl}`, {})
//     .then(() => {
//       enqueueSnackbar('User successfully deactivated!', { variant: 'success' });
//       setSubmitting(false);
//     })
//     .catch((err) => {
//       let errorMsg = 'Error deaactivating user!';
//       dispatch({ type: SET_ERRORS, payload: errorMsg });
//       console.log(`${err} => ${errorMsg}`);
//       enqueueSnackbar(errorMsg, { variant: 'error' });
//       setSubmitting(false);
//     });
// };

export const deleteUser = (data, navigate, enqueueSnackbar) => (dispatch) => {
  axiosWithAuth()
    .delete(`${BASE_URL}/users/${data.user_id}`, {})
    .then(() => {
      navigate('/app/users', { replace: true });
      enqueueSnackbar('User successfully deleted!', { variant: 'success' });
    })
    .catch((err) => {
      let errorMsg = 'Error deleting user!';

      dispatch({ type: SET_ERRORS, payload: errorMsg });
      console.log(`${err} => ${errorMsg}`);
      enqueueSnackbar(errorMsg, { variant: 'error' });
    });
};

// export const assignRole = ({ resourceId, data }, enqueueSnackbar, setValue) => (
//   dispatch
// ) => {
//   axiosWithAuth()
//     .patch(`${BASE_URL}/users/${data.id}`, { role: resourceId })
//     .then(() => {
//       enqueueSnackbar('User role updated successfully!', {
//         variant: 'success'
//       });
//       // reset form
//       setValue(null);
//     })
//     .catch((err) => {
//       let errorMsg = 'Error assigning user role';
//       enqueueSnackbar(errorMsg, {
//         variant: 'error'
//       });
//       dispatch({ type: SET_ERRORS, payload: errorMsg });
//       console.log(err);
//     });
// };

// Send reset password link to user's email address
export const forgotPassword = (
  { email },
  navigate,
  enqueueSnackbar,
  setSubmitting
) => (dispatch) => {
  axios
    .post(`${BASE_URL}/auth/users/reset_password/`, {
      email
    })
    .then(({ data }) => {
      setSubmitting(false);
      enqueueSnackbar('Reset link sent to your email!', { variant: 'success' });
      // navigate('/login');
    })
    .catch((err) => {
      let errorMsg = 'Error resetting your password';
      /* eslint-ignore */
      if (
        err.response &&
        err.response.status !== 404 &&
        err.response &&
        err.response.data
      ) {
        Object.values(err.response.data).forEach((val) => {
          errorMsg = val[0].detail;
          return null;
        });
      }
      dispatch({ type: SET_ERRORS, payload: errorMsg });
      console.log(`${err} => ${errorMsg}`);
      setSubmitting(false);
    });
};

// Finish reset user password process
export const resetPassword = (
  { uid, token, password },
  navigate,
  enqueueSnackbar,
  setSubmitting
) => (dispatch) => {
  axios
    .post(`${BASE_URL}/auth/users/reset_password_confirm/`, {
      uid,
      token,
      new_password: password
    })
    .then(({}) => {
      setSubmitting(false);
      enqueueSnackbar('You have successfully reset your password!', {
        variant: 'success'
      });
      navigate('/login');
    })
    .catch((err) => {
      let errorMsg = 'Error resetting your password';
      // Get the first error message
      /* eslint-ignore */
      if (
        err.response &&
        err.response.status !== 404 &&
        err.response &&
        err.response.data
      ) {
        Object.values(err.response.data).forEach((val) => {
          errorMsg = val[0].detail;
          return null;
        });
      }
      dispatch({ type: SET_ERRORS, payload: errorMsg });
      console.log(`${err} => ${errorMsg}`);
      setSubmitting(false);
    });
};

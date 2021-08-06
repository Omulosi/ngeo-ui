import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
  FormHelperText
} from '@material-ui/core';
import { updatePassword } from 'src/redux/actions/userActions';

const useStyles = makeStyles({
  root: {},
  error: {
    textAlign: 'center',
    paddingBottom: '1em'
  }
});

/* eslint-disable */
const UpdatePassword = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch({ type: 'CLEAR_ERRORS' });
  }, [dispatch]);

  let error = useSelector((state) => state.user.errors);

  if (error && Object.entries(error).length === 0) {
    error = null;
  }

  const formik = useFormik({
    initialValues: {
      old: '',
      password: '',
      confirm: ''
    },
    validationSchema: Yup.object({
      old: Yup.string().required('Please provide a password'),
      password: Yup.string()
        .required('Please provide a password')
        .min(8, 'Password too short'),
      confirm: Yup.string()
        .required("Passwords don't match")
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
    }),
    onSubmit: (values, { setSubmitting, setValues }) => {
      dispatch(
        updatePassword(
          values,
          enqueueSnackbar,
          setSubmitting,
          setValues,
          formik
        )
      );
    }
  });

  return (
    <>
      <form
        className={clsx(classes.root, className)}
        {...rest}
        onSubmit={formik.handleSubmit}
      >
        <Card>
          <CardHeader subheader="Update password" title="Password" />
          <Divider />
          <CardContent>
            <TextField
              error={Boolean(formik.touched.old && formik.errors.old)}
              fullWidth
              label="Old Password"
              margin="normal"
              name="old"
              onChange={formik.handleChange}
              helperText={formik.touched.old && formik.errors.old}
              type="password"
              value={formik.values.old}
              variant="outlined"
            />

            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              label="New Password"
              margin="normal"
              name="password"
              onChange={formik.handleChange}
              helperText={formik.touched.password && formik.errors.password}
              type="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.confirm && formik.errors.confirm)}
              fullWidth
              label="Confirm new password"
              margin="normal"
              name="confirm"
              onChange={formik.handleChange}
              helperText={formik.touched.confirm && formik.errors.confirm}
              type="password"
              value={formik.values.confirm}
              onBlur={formik.handleBlur}
              variant="outlined"
            />
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button color="primary" variant="contained" type="submit">
              Update
            </Button>
          </Box>
          <FormHelperText className={classes.error} error>
            {' '}
            {error && error}
          </FormHelperText>
        </Card>
      </form>
    </>
  );
};

UpdatePassword.propTypes = {
  className: PropTypes.string
};

export default UpdatePassword;

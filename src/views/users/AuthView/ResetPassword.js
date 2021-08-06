/* eslint-disable */
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
  FormHelperText
} from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useSnackbar } from 'notistack';
import { resetPassword } from 'src/redux/actions/authActions';
import Page from 'src/components/Page';
import RFTextField from 'src/components/TextField';
import FormWrapper from 'src/components/FormWrapper';
import CircularProgress from '@material-ui/core/CircularProgress';
import mainConfig from 'src/config/config.json';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(4, 3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 6)
    }
  },
  header: {
    textTransform: 'uppercase',
    marginBottom: '0.2em',
    lineHeight: '1.7',
    fontWeight: '700',
    fontFamily: 'Roboto Condensed, sans-serif',
    fontSize: '42px',
    color: 'rgba(0,0,0,0.87)'
  },
  tagline: {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.4'
  },
  form: {
    marginTop: '3em'
  },
  field: {
    borderRadius: '0 !important'
  },
  btn: {
    padding: '16px 40px',
    boxShadow: 'none',
    borderRadius: '0',
    background: 'rgb(0,115,230)'
  },
  link: {
    color: '#0073e6'
  },
  error: {
    textAlign: 'center'
  },
  title: {
    marginBottom: '0.2em',
    fontWeight: '800',
    fontFamily: 'Roboto Condensed, sans-serif',
    fontSize: '3.5rem',
    color: ' rgb(24, 83, 219);',
    cursor: 'pointer'
  }
}));

const ResetPasswordView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { uid, token } = useParams();

  const { globalData } = mainConfig;

  // useEffect(() => {
  //   dispatch({ type: 'CLEAR_ERRORS' });
  // }, [dispatch]);

  const error = useSelector((state) => state.auth.authError, shallowEqual);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm: '',
      uid,
      token,
      errors: ''
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Please provide a password')
        .min(6, 'Password too short'),
      confirm: Yup.string()
        .required("Passwords don't match")
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
    }),
    onSubmit: (values, { setSubmitting }) => {
      dispatch(resetPassword(values, navigate, enqueueSnackbar, setSubmitting));
    }
  });

  return (
    <Page className={classes.root} title="Reset Password">
      <Typography
        variant="h5"
        gutterBottom
        marked="center"
        align="center"
        className={classes.title}
        onClick={() => navigate('/')}
      >
        {globalData.appName}
      </Typography>
      <FormWrapper>
        <Container maxWidth="sm">
          <>
            <Typography
              variant="h2"
              gutterBottom
              marked="center"
              align="center"
              className={classes.header}
            >
              Reset Password
            </Typography>
          </>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <RFTextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="New Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              className={classes.field}
              size="large"
              required
            />
            <RFTextField
              error={Boolean(formik.touched.confirm && formik.errors.confirm)}
              fullWidth
              helperText={formik.touched.confirm && formik.errors.confirm}
              label="Confirm password"
              margin="normal"
              name="confirm"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.confirm}
              className={classes.field}
              size="large"
              required
            />
            <Box my={2}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                className={classes.btn}
              >
                {formik.isSubmitting && <CircularProgress size={14} />}
                {!formik.isSubmitting && 'Submit'}
              </Button>
            </Box>
          </form>
          <FormHelperText className={classes.error} error>
            {' '}
            {error && error}
          </FormHelperText>
        </Container>
      </FormWrapper>
    </Page>
  );
};

export default ResetPasswordView;

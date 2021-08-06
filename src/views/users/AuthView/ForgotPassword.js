import React, { useEffect } from 'react';
/* eslint-disable */
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  Typography,
  makeStyles,
  FormHelperText
} from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useSnackbar } from 'notistack';
import { forgotPassword } from 'src/redux/actions/authActions';
import Page from 'src/components/Page';
import RFTextField from 'src/components/TextField';
import FormWrapper from 'src/components/FormWrapper';
import Copyright from 'src/components/Copyright';
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

const ForgotPasswordView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { globalData } = mainConfig;

  useEffect(() => {
    dispatch({ type: 'CLEAR_ERRORS' });
  }, [dispatch]);

  const error = useSelector((state) => state.auth.authError, shallowEqual);

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Please provide an email')
    }),
    onSubmit: (values, { setSubmitting }) => {
      dispatch(
        forgotPassword(values, navigate, enqueueSnackbar, setSubmitting)
      );
    }
  });

  return (
    <Page className={classes.root} title="Forgot Password">
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
              RESET PASSWORD
            </Typography>
            <Typography variant="body2" align="center">
              Enter your email below and we'll send you a link to reset your
              password.
            </Typography>
          </>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <RFTextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
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
                {!formik.isSubmitting && 'Reset Password'}
              </Button>
            </Box>
          </form>

          <FormHelperText className={classes.error} error>
            {' '}
            {error && error}
          </FormHelperText>
        </Container>
      </FormWrapper>

      <Copyright />
    </Page>
  );
};

export default ForgotPasswordView;

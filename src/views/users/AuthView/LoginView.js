import React, { useEffect } from 'react';
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
import { login } from 'src/redux/actions/authActions';
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

/* eslint-disable */
const LoginView = () => {
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
      email: '',
      password: '',
      errors: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Please provide an email'),
      password: Yup.string()
        .required('Please provide a password')
        .min(6, 'Password too short')
    }),
    onSubmit: (values, { setSubmitting }) => {
      dispatch(login(values, navigate, enqueueSnackbar, setSubmitting));
    }
  });

  return (
    <Page className={classes.root} title="Login">
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
              Sign In
            </Typography>
            <Typography variant="body2" align="center">
              {'Not a member yet? '}
              <Link
                component={RouterLink}
                to="/register"
                variant="h6"
                underline="always"
                className={classes.link}
              >
                {'Sign Up here'}
              </Link>
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
            <RFTextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
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
                {!formik.isSubmitting && 'Sign in'}
              </Button>
            </Box>
          </form>
          <Typography align="center">
            <Link
              underline="always"
              to="/forgot-password/"
              component={RouterLink}
              className={classes.link}
            >
              Forgot password?
            </Link>
          </Typography>
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

export default LoginView;

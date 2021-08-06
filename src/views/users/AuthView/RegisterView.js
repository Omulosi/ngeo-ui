import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Link,
  Typography,
  makeStyles,
  Grid
} from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useSnackbar } from 'notistack';
import { signUp } from 'src/redux/actions/authActions';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
import Page from 'src/components/Page';
import TextField from 'src/components/TextField';
import FormWrapper from 'src/components/FormWrapper';
import Copyright from 'src/components/Copyright';
import CircularProgress from '@material-ui/core/CircularProgress';
import mainConfig from 'src/config/config.json';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
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
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 120,
    background: '#fff',
    color: 'inherit'
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
const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { globalData } = mainConfig;

  useEffect(() => {
    dispatch({ type: 'CLEAR_ERRORS' });
  }, [dispatch]);

  const error = useSelector((state) => state.auth.authError, shallowEqual);

  // const [role, setRole] = React.useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirm: '',
      staffNumber: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      firstName: Yup.string().max(255).required('First name is required'),
      lastName: Yup.string().max(255).required('Last name is required'),
      password: Yup.string().max(255).required('Password is required'),
      confirm: Yup.string()
        .required("Passwords don't match")
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      staffNumber: Yup.string().required('Staff number is required')
    }),
    onSubmit: (values, { setSubmitting }) => {
      delete values.confirm;
      dispatch(signUp(values, navigate, enqueueSnackbar, setSubmitting));
    }
  });

  return (
    <Page className={classes.root} title="Register">
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
              variant="h3"
              gutterBottom
              marked="center"
              align="center"
              className={classes.header}
            >
              Sign Up
            </Typography>
            <Typography variant="body2" align="center">
              <Link
                component={RouterLink}
                to="/login"
                variant="h6"
                underline="always"
                className={classes.link}
              >
                Already have an account?
              </Link>
            </Typography>
          </>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  error={Boolean(
                    formik.touched.firstName && formik.errors.firstName
                  )}
                  fullWidth
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  label="First name"
                  margin="normal"
                  name="firstName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  error={Boolean(
                    formik.touched.lastName && formik.errors.lastName
                  )}
                  fullWidth
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  label="Last name"
                  margin="normal"
                  name="lastName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
              </Grid>
            </Grid>

            <TextField
              required
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
            />
            <TextField
              required
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Staff Number"
              margin="normal"
              name="staffNumber"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.staffNumber}
            />
            <TextField
              required
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
            />

            <TextField
              required
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
            />

            {/**
            
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={2}>CEO</MenuItem>
                <MenuItem value={3}>Audit</MenuItem>
                <MenuItem value={4}>Finance</MenuItem>
                <MenuItem value={5}>Regional Manager</MenuItem>
                <MenuItem value={6}>County Manager</MenuItem>
                <MenuItem value={7}>Field Outreach Officer</MenuItem>
                <MenuItem value={9}>Human Resource</MenuItem>
              </Select>
            </FormControl>
            
            */}

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
                {!formik.isSubmitting && 'Sign Up'}
              </Button>
            </Box>
            <FormHelperText className={classes.error} error>
              {' '}
              {error && error}
            </FormHelperText>
          </form>
        </Container>
      </FormWrapper>
      <Copyright />
    </Page>
  );
};

export default RegisterView;

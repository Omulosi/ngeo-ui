import React, { useEffect } from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Container,
  Typography,
  FormHelperText
} from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { terms as termsDict } from 'src/config';
import Page from 'src/components/Page';
import { createAgent } from 'src/redux/actions/agentActions';
import useUser from 'src/data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  content: {
    marginTop: theme.spacing(2)
  },
  header: {
    color: '#263228',
    fontSize: '1.5rem'
  },
  error: {
    textAlign: 'center'
  }
}));

const AddFieldOfficer = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch({ type: 'CLEAR_ERRORS' });
  }, [dispatch]);

  // get currently logged in user pk
  const { data: user, error: userError } = useUser();

  if (userError) {
    console.log(userError);
  }

  let userPk = null;
  if (user) {
    userPk = user.attributes.pk;
  }

  const error = useSelector((state) => state.agent.agentError, shallowEqual);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      idNumber: '',
      phoneNumber: '',
      terms: '',
      email: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Must be a valid email').max(255),
      firstName: Yup.string().max(255).required('First name is required'),
      lastName: Yup.string().max(255).required('Last name is required'),
      terms: Yup.string().required('Select employment terms'),
      phoneNumber: Yup.string(),
      idNumber: Yup.string()
    }),
    onSubmit: (values, { setSubmitting }) => {
      dispatch(
        createAgent(
          { ...values, userPk },
          navigate,
          enqueueSnackbar,
          setSubmitting
        )
      );
    }
  });

  return (
    <Page className={classes.root} title="Add new Agent">
      <Container maxWidth="lg">
        <Typography variant="h1" component="h1" className={classes.header}>
          Add new agent
        </Typography>
        <Box className={classes.content}>
          <form
            autoComplete="off"
            noValidate
            className={clsx(classes.content)}
            onSubmit={formik.handleSubmit}
          >
            <Card>
              <CardHeader title="Add a new Agent" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="First name"
                      name="firstName"
                      required
                      variant="outlined"
                      value={formik.values.firstName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Last name"
                      name="lastName"
                      required
                      variant="outlined"
                      value={formik.values.lastName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phoneNumber"
                      variant="outlined"
                      value={formik.values.phoneNumber}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="ID Number"
                      name="idNumber"
                      variant="outlined"
                      value={formik.values.idNumber}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      variant="outlined"
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Terms"
                      name="terms"
                      required
                      select
                      SelectProps={{ native: true }}
                      variant="outlined"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.terms}
                    >
                      {Object.entries(termsDict).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Button
                  color="primary"
                  variant="outlined"
                  style={{ marginRight: '0.5em' }}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button color="primary" variant="contained" type="submit">
                  Add Agent
                </Button>
              </Box>
              <FormHelperText className={classes.error} error>
                {' '}
                {error && error}
              </FormHelperText>
            </Card>
          </form>
        </Box>
      </Container>
    </Page>
  );
};

export default AddFieldOfficer;

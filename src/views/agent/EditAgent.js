import React, { useEffect } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
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
  FormHelperText,
  Container
} from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { agentTerms as termsDict } from 'src/config';
import { editAgent } from 'src/redux/actions/agentActions';
import Page from 'src/components/Page';
import DataGridToolbar from 'src/components/DataGridToolbar';
import { useAgentById } from 'src/hooks/agents';
import capitalize from 'src/utils/capitalize';

/* eslint-disable */
const useStyles = makeStyles((theme) => ({
  root: {},
  root: {
    marginTop: theme.spacing(4)
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

const EditAgent = () => {
  const { id } = useParams();
  const classes = useStyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error } = useAgentById(id);

  if (error) {
    enqueueSnackbar('Error loading agent info', { variant: 'error' });
  }

  let agentDetails = {};
  if (data) {
    agentDetails = data.attributes;
  }

  const {
    first_name,
    last_name,
    id_number,
    phone_number,
    terms,
    email
  } = agentDetails;

  const defaultTerm = termsDict[terms];

  const updateError = useSelector(
    (state) => state.agent.agentError,
    shallowEqual
  );

  const formik = useFormik({
    initialValues: {
      firstName: (first_name && capitalize(first_name)) || '',
      lastName: (last_name && capitalize(last_name)) || '',
      idNumber: id_number || '',
      phoneNumber: phone_number || ''
      // terms: defaultTerm || '',
      // email: email || ''
    },
    validationSchema: Yup.object().shape({
      // email: Yup.string().email('Must be a valid email').max(255),
      firstName: Yup.string().max(255),
      lastName: Yup.string().max(255),
      // terms: Yup.string(),
      phoneNumber: Yup.string(),
      idNumber: Yup.string()
    }),
    onSubmit: (values, { setSubmitting }) => {
      let { initialValues } = formik;

      const temp = Object.entries(values).map(([key, value]) => {
        if (initialValues[key] == values[key]) {
          return [];
        }
        return [key, value];
      });

      const valuesToUpdate = Object.fromEntries(temp);

      dispatch(
        editAgent(
          { id, ...valuesToUpdate },
          navigate,
          enqueueSnackbar,
          setSubmitting
        )
      );
    }
  });

  useEffect(() => {
    dispatch({ type: 'CLEAR_ERRORS' });
  }, [dispatch]);

  return (
    <Page className={classes.root} title="Edit Agent">
      <Container maxWidth={false}>
        <DataGridToolbar pageTitle="Edit Agent" />
        <Box>
          <form
            autoComplete="off"
            noValidate
            className={clsx(classes.root)}
            onSubmit={formik.handleSubmit}
          >
            <Card>
              <CardHeader title="Edit agent info" />
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
                  {/**
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
                  */}

                  {/**

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
                      <option key="#default" value={terms}>
                        {defaultTerm}
                      </option>
                      {Object.entries(termsDict).map(([key, value]) => {
                        return value !== 'Casual' ? (
                          <option key={key} value={key}>
                            {value}
                          </option>
                        ) : null;
                      })}
                    </TextField>
                  </Grid>
                  
                  */}
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
                  Save details
                </Button>
              </Box>

              <FormHelperText className={classes.error} error>
                {' '}
                {updateError && updateError}
              </FormHelperText>
            </Card>
          </form>
        </Box>
      </Container>
    </Page>
  );
};

EditAgent.propTypes = {
  agentDetails: PropTypes.object
};

export default EditAgent;

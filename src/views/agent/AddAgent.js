import React, { useEffect } from 'react';
/* eslint-disable */
import clsx from 'clsx';
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
  FormHelperText,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { agentTerms as terms } from 'src/config';
import Page from 'src/components/Page';
import { createAgent } from 'src/redux/actions/agentActions';
import useFieldOfficer from 'src/hooks/field_officers';
import { useFinance, useFOO } from 'src/hooks/permissions';
import DataGridToolbar from 'src/components/DataGridToolbar';
import mainConfig from 'src/config/config.json';
import { ID_FIELD_LABEL } from 'src/config';

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

const AddAgent = () => {
  const classes = useStyles();
  const { siteNames } = mainConfig.globalData;

  let agentTerms = terms;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const isFinance = useFinance();
  const isFOO = useFOO();

  useEffect(() => {
    dispatch({ type: 'CLEAR_ERRORS' });
  }, [dispatch]);

  // get currently logged in user pk
  const {
    data: fieldOfficer,
    isError,
    error: fooError,
    isSuccess
  } = useFieldOfficer();
  let fieldOfficerId = null;
  if (isSuccess) {
    fieldOfficerId = fieldOfficer.id;
  }

  const error = useSelector((state) => state.agent.agentError, shallowEqual);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      //
      idNumber: '',
      passportNumber: '',
      hudumaNumber: '',
      dlNumber: '',
      //
      phoneNumber: '',
      terms: ''
      // email: ''
    },

    onSubmit: (values, { setSubmitting }) => {
      dispatch(
        createAgent(
          { ...values, field_officer: fieldOfficerId },
          navigate,
          enqueueSnackbar,
          setSubmitting
        )
      );
    }
  });

  // Expose only contract option for FOOs
  // Assumes 'key' is numeric
  if (isFOO) {
    let result = {};
    for (let key in agentTerms) {
      if ([3].includes(+key)) {
        result[key] = agentTerms[key];
      }
    }
    agentTerms = result;
  }

  // Skip contract for Finance role
  if (isFinance) {
    let result = {};
    for (let key in agentTerms) {
      if ([3].includes(+key)) {
        continue;
      }
      result[key] = agentTerms[key];
    }
    agentTerms = result;
  }

  return (
    <Page className={classes.root} title="Add new Agent">
      <Container maxWidth={false}>
        <DataGridToolbar pageTitle={`New ${siteNames.Agent.name}`} />
        <Box className={classes.content}>
          <form
            autoComplete="off"
            noValidate
            className={clsx(classes.content)}
            onSubmit={formik.handleSubmit}
          >
            <Card>
              <CardHeader title={`Add new ${siteNames.Agent.name}`} />
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
                  {/**
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
                  */}

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label={`${ID_FIELD_LABEL}`}
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
                    >
                      <option key="None" value="None"></option>
                      {Object.entries(agentTerms).map(([key, value]) => {
                        return (
                          <option key={key} value={key}>
                            {value}
                          </option>
                        );
                      })}
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
                  Submit
                </Button>
              </Box>
              <FormHelperText className={classes.error} error>
                {' '}
                {error && `${error}`}
              </FormHelperText>
            </Card>
          </form>
        </Box>
      </Container>
    </Page>
  );
};

export default AddAgent;

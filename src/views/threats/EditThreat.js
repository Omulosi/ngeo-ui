import React, { useEffect } from 'react';
import clsx from 'clsx';
// import * as Yup from 'yup';
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
  FormHelperText,
  capitalize
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-mde/lib/styles/css/react-mde-all.css';
import Page from 'src/components/Page';
import { editThreat } from 'src/redux/actions/threatAction';
import { useThreat } from 'src/hooks/threats';
import { threatTypes } from 'src/config';
// import ComboBox from 'src/components/ComboBox';
import DataGridToolbar from 'src/components/DataGridToolbar';
// import ComboBox from 'src/components/GeneralComboBox';
// import adminData from 'src/data/adminData';

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

// This component is only used to add threats away from the map view.

/* eslint-disable */
const EditThreat = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();

  const { data, isSuccess } = useThreat(id);

  let threat = {};
  if (isSuccess) {
    threat = data.attributes;
  }

  useEffect(() => {
    dispatch({ type: 'CLEAR_ERRORS' });
  }, [dispatch]);

  // const error = useSelector((state) => state.agent.agentError, shallowEqual);

  const formik = useFormik({
    initialValues: {
      date_reported:
        (threat.date_reported &&
          threat.date_reported.slice(0, threat.date_reported.length - 1)) ||
        '',
      name: threat.name || '',
      color: threat.color || '',
      description: threat.description || '',
      threat_type: threat.threat_type || ''
    },
    onSubmit: (values, { setSubmitting }) => {
      dispatch(
        editThreat({ ...values, id }, navigate, enqueueSnackbar, setSubmitting)
      );
    }
  });

  return (
    <Page className={classes.root} title="EditThreat">
      <Container maxWidth={false}>
        <DataGridToolbar pageTitle="Edit Threat" />
        <Box className={classes.content}>
          <form
            autoComplete="off"
            noValidate
            className={clsx(classes.content)}
            onSubmit={formik.handleSubmit}
          >
            <Card>
              <CardHeader title="Edit Threat" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  {/**
                   <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Date Reported"
                      name="date_reported"
                      variant="outlined"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={formik.values.date_reported}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                
                */}

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={formik.values.description}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Type"
                      name="threat_type"
                      select
                      SelectProps={{ native: true }}
                      variant="outlined"
                      value={formik.values.threat_type}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    >
                      <option key="None" value="None"></option>

                      {threatTypes.map((threat) => {
                        return (
                          <option key={threat.name} value={threat.value}>
                            {threat.name}
                          </option>
                        );
                      })}
                    </TextField>
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Color"
                      name="color"
                      select
                      SelectProps={{ native: true }}
                      variant="outlined"
                      value={formik.values.color}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    >
                      <option key="None" value="None"></option>

                      {threatTypes.map((threat) => {
                        return (
                          <option key={threat.name} value={threat.color}>
                            {`${threat.name} - ${capitalize(threat.color)}`}
                          </option>
                        );
                      })}
                    </TextField>
                  </Grid>

                  {/*
                
                     <Grid item lg={6} md={6} xs={12}>
                    <ComboBox
                      label="From"
                      name="from"
                      options={adminData.counties}
                      onChange={(e, value) => {
                        handleChange(e, value, 'from');
                      }}
                    />
                  </Grid>

                  <Grid item lg={6} md={6} xs={12}>
                    <ComboBox
                      label="To"
                      name="to"
                      options={adminData.counties}
                      onChange={(e, value) => {
                        handleChange(e, value, 'to');
                      }}
                    />
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
                  Edit Threat
                </Button>
              </Box>
              <FormHelperText className={classes.error} error>
                {' '}
              </FormHelperText>
            </Card>
          </form>
        </Box>
      </Container>
    </Page>
  );
};

// EditThreat.propTypes = {
//   activeTab: PropTypes.string,
//   remarksPrompt: PropTypes.string,
//   date_submitted: PropTypes.string,
//   project: PropTypes.string,
//   agent: PropTypes.string,
//   rating: PropTypes.number,
//   projectList: PropTypes.array,
//   agentList: PropTypes.array
// };

export default EditThreat;

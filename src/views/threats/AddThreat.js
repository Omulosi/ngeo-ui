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
  FormHelperText
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import 'react-mde/lib/styles/css/react-mde-all.css';
import Page from 'src/components/Page';
import { addThreat } from 'src/redux/actions/threatAction';
// import ComboBox from 'src/components/ComboBox';
import DataGridToolbar from 'src/components/DataGridToolbar';
import ComboBox from 'src/components/GeneralComboBox';
import adminData from 'src/data/adminData';

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
const AddThreat = ({
  date_submitted = '',
  project = '',
  agent = '',
  rating = '',
  areaList = [],
  agentList
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    county: '',
    region: ''
  };

  const [threatValues, setThreatalues] = React.useState(initialValues);

  useEffect(() => {
    dispatch({ type: 'CLEAR_ERRORS' });
  }, [dispatch]);

  //   const error = useSelector((state) => state.agent.agentError, shallowEqual);

  const formik = useFormik({
    initialValues: {
      date_submitted: '',
      name: '',
      longitude: '',
      latitude: '',
      to: '',
      from: ''
    },
    onSubmit: (values, { setSubmitting }) => {
      //
      debugger;
      dispatch(
        addThreat(
          { ...values, ...threatValues, description: remarks },
          navigate,
          enqueueSnackbar,
          setSubmitting
        )
      );
    }
  });

  // From and to fields
  const handleChange = (evt, dataObj, key) => {
    if (dataObj === null) {
      enqueueSnackbar('Please select a value', {
        variant: 'warning'
      });
      return;
    }

    if (key === 'from') {
      setThreatValues({ ...threatValues, from: dataObj.name });
    }

    if (key === 'to') {
      setThreatValues({ ...threatValues, to: dataObj.name });
    }
  };

  return (
    <Page className={classes.root} title="Add new Threat">
      <Container maxWidth={false}>
        <DataGridToolbar pageTitle="New Threat" />
        <Box className={classes.content}>
          <form
            autoComplete="off"
            noValidate
            className={clsx(classes.content)}
            onSubmit={formik.handleSubmit}
          >
            <Card>
              <CardHeader title="Add Threat" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Date"
                      name="date_submitted"
                      required
                      variant="outlined"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={formik.values.date_submitted}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      required
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
                      placeholder="Longitude (degree decimal)"
                      name="longitude"
                      required
                      variant="outlined"
                      value={formik.values.longitude}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      placeholder="Latitude (degree decimal)"
                      name="latitude"
                      required
                      variant="outlined"
                      value={formik.values.latitude}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </Grid>

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
                  Add Threat
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

// AddThreat.propTypes = {
//   activeTab: PropTypes.string,
//   remarksPrompt: PropTypes.string,
//   date_submitted: PropTypes.string,
//   project: PropTypes.string,
//   agent: PropTypes.string,
//   rating: PropTypes.number,
//   projectList: PropTypes.array,
//   agentList: PropTypes.array
// };

export default AddThreat;

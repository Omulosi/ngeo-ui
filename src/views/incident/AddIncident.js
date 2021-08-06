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
import { addIncident } from 'src/redux/actions/incidentAction';
import DataGridToolbar from 'src/components/DataGridToolbar';

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

/* eslint-disable */
const AddIncident = ({
  activeTab = 'write',
  remarksPrompt = '## Incident description',
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

  useEffect(() => {
    dispatch({ type: 'CLEAR_ERRORS' });
  }, [dispatch]);

  const [selectedTab, setSelectedTab] = React.useState(activeTab);
  const [remarks, setRemarks] = React.useState(remarksPrompt);
  //   const error = useSelector((state) => state.agent.agentError, shallowEqual);

  const formik = useFormik({
    initialValues: {
      date_submitted: '',
      name: '',
      longitude: '',
      latitude: ''
    },
    onSubmit: (values, { setSubmitting }) => {
      dispatch(
        addIncident(
          { ...values, description: remarks },
          navigate,
          enqueueSnackbar,
          setSubmitting
        )
      );
    }
  });

  const handleAgentChange = (e, value) => {
    formik.setFieldValue(
      'agent',
      value !== null ? value : formik.initialValues.agent
    );
  };

  const handleProjectChange = (e, value) => {
    formik.setFieldValue(
      'project',
      value !== null ? value : formik.initialValues.project
    );
  };

  const handleMarkdownChange = (value) => {
    setRemarks(value);
  };

  return (
    <Page className={classes.root} title="Add new Incident">
      <Container maxWidth={false}>
        <DataGridToolbar pageTitle="New Incident" />
        <Box className={classes.content}>
          <form
            autoComplete="off"
            noValidate
            className={clsx(classes.content)}
            onSubmit={formik.handleSubmit}
          >
            <Card>
              <CardHeader title="Add Incident" />
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

                  {/**
                     
                      <Grid item md={12} xs={12}>
                    <ReactMde
                      value={remarks}
                      onChange={handleMarkdownChange}
                      selectedTab={selectedTab}
                      onTabChange={setSelectedTab}
                      generateMarkdownPreview={(markdown) => {
                        Promise.resolve(<ReactMarkdown source={markdown} />);
                      }}
                      childProps={{
                        writeButton: {
                          tabIndex: -1
                        }
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
                  Add Incident
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

// AddIncident.propTypes = {
//   activeTab: PropTypes.string,
//   remarksPrompt: PropTypes.string,
//   date_submitted: PropTypes.string,
//   project: PropTypes.string,
//   agent: PropTypes.string,
//   rating: PropTypes.number,
//   projectList: PropTypes.array,
//   agentList: PropTypes.array
// };

export default AddIncident;

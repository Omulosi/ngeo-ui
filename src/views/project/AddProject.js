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

/* eslint-disable */
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// import ReactMde from 'react-mde';
// import ReactMarkdown from 'react-markdown';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import DatePicker from 'react-datepicker';
// import 'react-mde/lib/styles/css/react-mde-all.css';
import ReactQuill from 'react-quill';
import Page from 'src/components/Page';
import { addProject } from 'src/redux/actions/projectActions';
// import ComboBox from 'src/components/ComboBox';
import DataGridToolbar from 'src/components/DataGridToolbar';
import AsynchronousComboBox from 'src/components/AsynchronousComboBox';
import { initiatedByList } from 'src/config';
import { useThemes } from 'src/hooks/themes';
import mainConfig from 'src/config/config.json';

import 'react-datepicker/dist/react-datepicker.css';

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
  },
  datepicker: {
    width: '100%',
    fontSize: '1rem',
    padding: '18.5px 14px',
    borderRadius: '4px',
    lineHeight: '1.1876em',
    color: 'rgb(118, 118, 118)',
    border: '1px solid #aaa'
  }
}));

const AddProject = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { siteNames } = mainConfig.globalData;

  useEffect(() => {
    dispatch({ type: 'CLEAR_ERRORS' });
  }, [dispatch]);

  const [selectedTab, setSelectedTab] = React.useState('write');
  const [startDate, setStartDate] = React.useState(new Date());
  const [editorState, setEditorState] = React.useState({
    remarks: ''
  });
  //   const error = useSelector((state) => state.agent.agentError, shallowEqual);

  const { data, isLoading, isSuccess } = useThemes();

  let themes = [];
  if (isSuccess) {
    themes = data.map((theme) => ({
      id: theme.id,
      name: theme.attributes.name
    }));
  }

  const formik = useFormik({
    initialValues: {
      // date_submitted: '',
      name: '',
      theme: '',
      longitude: '',
      latitude: '',
      initiated_by: ''
    },
    onSubmit: (values, { setSubmitting }) => {
      dispatch(
        addProject(
          { ...values, date_submitted: startDate, ...editorState },
          navigate,
          enqueueSnackbar,
          setSubmitting
        )
      );
    }
  });

  const handleChange = (e, value, field) => {
    formik.setFieldValue(
      field,
      value !== null ? value : formik.initialValues.theme
    );
  };

  const handleMarkdownChange = (value) => {
    setRemarks(value);
  };

  const handleEditorChange = (html) => {
    setEditorState({ remarks: html });
  };

  return (
    <Page className={classes.root} title={`Add new ${siteNames.Project.name}`}>
      <Container maxWidth={false}>
        <DataGridToolbar pageTitle={`New ${siteNames.Project.name}`} />
        <Box className={classes.content}>
          <form
            autoComplete="off"
            noValidate
            className={clsx(classes.content)}
            onSubmit={formik.handleSubmit}
          >
            <Card>
              <CardHeader title={`Add ${siteNames.Project.name}`} />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    {/**
                     * 
                     * <TextField
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
                     * 
                     */}

                    <FormControl fullWidth>
                      <DatePicker
                        selected={startDate}
                        name="date_submitted"
                        onChange={(date) => setStartDate(date)}
                        className={classes.datepicker}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      placeholder="Name"
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
                  {/** 
                  
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      required
                      placeholder="Theme"
                      label="Theme"
                      InputLabelProps={{
                        shrink: true
                      }}
                      required
                      variant="outlined"
                      name="theme"
                      value={formik.values.theme}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  
                  
                  */}

                  <Grid item md={6} xs={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      fullWidth
                      required
                    >
                      <AsynchronousComboBox
                        isRequired={true}
                        loading={isLoading}
                        label="Theme"
                        name="theme"
                        value={formik.values.theme}
                        options={themes}
                        onChange={(e, value) => handleChange(e, value, 'theme')}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      fullWidth
                      required
                    >
                      <InputLabel id="simple-select-filled-label">
                        Controlled By
                      </InputLabel>
                      <Select
                        labelId="simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="initiated_by"
                        value={formik.values.initiated_by}
                        onChange={formik.handleChange}
                        label="Controlled By"
                        required
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {Object.keys(initiatedByList).map((key) => {
                          const val = initiatedByList[key];
                          return <MenuItem value={key}>{val}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      // label="Longitude"
                      placeholder="Longitude (degrees)"
                      name="longitude"
                      required
                      variant="outlined"
                      value={formik.values.longitude}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={classes.formControl}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      // label="Latitude"
                      placeholder="Latitude (degrees)"
                      name="latitude"
                      required
                      variant="outlined"
                      value={formik.values.latitude}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={classes.formControl}
                    />
                  </Grid>
                  {/** 
                     
                    <Grid item md={12} xs={12}>
                    <ReactQuill
                      name="denialReason"
                      placeholder="Add project description"
                      onChange={handleEditorChange}
                      value={editorState.remarks}
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
                  Add
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

export default AddProject;

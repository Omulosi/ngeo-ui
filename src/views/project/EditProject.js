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
import { useNavigate, useParams } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import 'react-mde/lib/styles/css/react-mde-all.css';
import Page from 'src/components/Page';
import { editProject } from 'src/redux/actions/projectActions';
import DataGridToolbar from 'src/components/DataGridToolbar';
import AsynchronousComboBox from 'src/components/AsynchronousComboBox';
import { initiatedByList } from 'src/config'; // projectThemes
import { useProject } from 'src/hooks/projects';
import { useThemes } from 'src/hooks/themes';
import mainConfig from 'src/config/config.json';

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
const EditProject = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { siteNames } = mainConfig.globalData;

  const { id } = useParams();

  const { data, isSuccess } = useProject(id);

  let project = null;
  if (isSuccess) {
    project = data.attributes;
  }

  const { data: themeData, isLoading, isSuccess: themeSuccess } = useThemes();

  let themes = [];
  if (themeSuccess) {
    themes = themeData.map((theme) => ({
      id: theme.id,
      name: theme.attributes.name
    }));
  }

  useEffect(() => {
    dispatch({ type: 'CLEAR_ERRORS' });
  }, [dispatch]);

  const [remarks, setRemarks] = React.useState(
    project?.description || '## Edit project'
  );
  //   const error = useSelector((state) => state.agent.agentError, shallowEqual);

  const formik = useFormik({
    initialValues: {
      name: project?.name || '',
      theme: project?.theme || '',
      longitude: project?.longitude || '',
      latitude: project?.latitude || '',
      initiated_by: project?.initiated_by || ''
    },
    onSubmit: (values, { setSubmitting }) => {
      dispatch(
        editProject(
          { updatedData: values, projectID: id },
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

  return (
    <Page className={classes.root} title={`Edit ${siteNames.Project.name}`}>
      <Container maxWidth={false}>
        <DataGridToolbar pageTitle={`Edit ${siteNames.Project.name}`} />
        <Box className={classes.content}>
          <form
            autoComplete="off"
            noValidate
            className={clsx(classes.content)}
            onSubmit={formik.handleSubmit}
          >
            <Card>
              <CardHeader title={`Edit ${siteNames.Project.name}`} />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
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
                      className={classes.formControl}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      fullWidth
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
                      label="Longitude"
                      placeholder="Longitude (degree decimal)"
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
                      placeholder="Latitude (degree decimal)"
                      label="Latitude"
                      name="latitude"
                      required
                      variant="outlined"
                      value={formik.values.latitude}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
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
                  Edit
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

export default EditProject;

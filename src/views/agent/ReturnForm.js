import React, { useEffect } from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
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
  Container,
  FormHelperText
} from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import Page from 'src/components/Page';
import ComboBox from 'src/components/ComboBox';
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
const ReturnForm = ({
  activeTab = 'write',
  remarksPrompt = '## Add remarks',
  date_submitted = '',
  project = '',
  agent = '',
  rating = '',
  projectList,
  agentList,
  title,
  subTitle,
  action
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
  const error = useSelector((state) => state.agent.agentError, shallowEqual);

  const formik = useFormik({
    initialValues: {
      date_submitted,
      project,
      agent,
      rating
    },
    validationSchema: Yup.object().shape({
      date_submitted: Yup.string(),
      project: Yup.string(),
      rating: Yup.number()
    }),
    onSubmit: (values, { setSubmitting }) => {
      const { date_submitted, project, agent, rating } = values;
      const data = {
        date_submitted,
        agent: agent.id,
        project: project.id,
        rating,
        remarks
      };
      dispatch(action({ ...data }, navigate, enqueueSnackbar, setSubmitting));
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
    <Page className={classes.root} title={title}>
      <Container maxWidth={false}>
        <DataGridToolbar pageTitle={title} />
        <Box className={classes.content}>
          <form
            autoComplete="off"
            noValidate
            className={clsx(classes.content)}
            onSubmit={formik.handleSubmit}
          >
            <Card>
              <CardHeader title={subTitle} />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Submission Date"
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
                    <Divider style={{ marginTop: '1em' }} />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <ComboBox
                      label="Project"
                      name="project"
                      data={projectList}
                      onChange={(e, value) => {
                        handleProjectChange(e, value);
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <ComboBox
                      label="Agent"
                      name="agent"
                      data={agentList}
                      onChange={(e, value) => {
                        handleAgentChange(e, value);
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Rating"
                      name="rating"
                      type="number"
                      required
                      variant="outlined"
                      value={formik.values.rating}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </Grid>
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
                  Add Return
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

ReturnForm.propTypes = {
  activeTab: PropTypes.string,
  remarksPrompt: PropTypes.string,
  date_submitted: PropTypes.string,
  project: PropTypes.string,
  agent: PropTypes.string,
  rating: PropTypes.number,
  projectList: PropTypes.array,
  agentList: PropTypes.array,
  action: PropTypes.any
};

export default ReturnForm;

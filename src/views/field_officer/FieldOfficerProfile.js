import React from 'react';
/* eslint-disable */
import { Container, Grid, makeStyles } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Page from 'src/components/Page';
import PageToolbar from 'src/components/PageToolbar';
import LineProgress from 'src/components/LineProgress';
import TabPanel from 'src/components/TabPanel';
import DisplayAgents from 'src/components/DisplayAgents';
import DisplayProjects from 'src/components/DisplayProjects';
import capitalize from 'src/utils/capitalize';
import { useFieldOfficerById } from 'src/hooks/field_officers';
import useHR, {
  useCEO,
  useFinance,
  useFOO,
  useRM,
  useCM
} from 'src/hooks/permissions';
import FieldOfficerInfo from './FieldOfficerInfo';
import AssignProject from './AssignProject';
// import AssignArea from './AssignArea';
import AssignArea from 'src/components/AssignArea';
import mainConfig from 'src/config/config.json';
// import { isCountyManager } from 'src/utils/getRole';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(5)
  },
  tab: {
    color: 'rgb(33, 150, 243)'
  },
  padTop: {
    paddingTop: '2em'
  },
  content: {
    paddingTop: theme.spacing(2)
  },
  toolbar: {}
}));

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const FieldOfficerProfile = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { siteNames } = mainConfig.globalData;

  const isFinance = useFinance();
  const isRM = useRM();
  const isCEO = useCEO();
  const isCountyManager = useCM();

  const {
    data: fieldOfficer,
    isLoading,
    error,
    isSuccess
  } = useFieldOfficerById(id);

  if (error) {
    console.log(`Error => ${error}`);
    enqueueSnackbar('Unable to fetch field officer profile data', {
      variant: 'error'
    });
  }

  let details = {};
  let fieldOfficerProjects = [];
  let fieldOfficerAgents = [];
  if (isSuccess) {
    details = {
      ...fieldOfficer.attributes.user,
      area: fieldOfficer.attributes.area,
      id: fieldOfficer.id
    };
    fieldOfficerProjects = fieldOfficer.attributes.projects.features;
    fieldOfficerAgents = fieldOfficer.attributes.agents;
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="Field Officer Profile" className={classes.root}>
      <div className={classes.progress}>{isLoading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <PageToolbar
          title={
            /* eslint-disable */
            details
              ? `${siteNames.FOO.name}: ${capitalize(
                  details.first_name
                )} ${capitalize(details.last_name)}`
              : ''
          }
        />
        <Grid container className={classes.content}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="fullWidth"
            textColor="primary"
          >
            <Tab label="Details" {...a11yProps(0)} />
            <Tab label={`${siteNames.Project.name}s`} {...a11yProps(1)} />
            <Tab label="Agents" {...a11yProps(1)} />
          </Tabs>
        </Grid>

        <TabPanel value={value} index={0}>
          <Grid container spacing={3} className={classes.padTop}>
            <Grid item xl={4} lg={6} md={6} xs={12}>
              <FieldOfficerInfo details={details} />
            </Grid>
            {isCountyManager && (
              <Grid item xl={4} lg={6} md={6} xs={12}>
                <AssignProject fieldOfficerDetails={details} />
              </Grid>
            )}

            {!isFinance && !isRM && !isCEO && (
              <Grid item xl={4} lg={6} md={6} xs={12}>
                <AssignArea
                  user={fieldOfficer ? fieldOfficer.attributes.user : null}
                />
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Grid container spacing={3} className={classes.padTop}>
            <Grid item lg={12} md={12} xs={12}>
              <DisplayProjects projects={fieldOfficerProjects} />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Grid container spacing={3} className={classes.padTop}>
            <Grid item lg={12} md={12} xs={12}>
              <DisplayAgents
                agents={fieldOfficerAgents}
                agentBaseUrl="/app/agents"
              />
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </Page>
  );
};

export default FieldOfficerProfile;

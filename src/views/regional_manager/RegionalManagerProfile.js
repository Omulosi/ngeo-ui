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
import capitalize from 'src/utils/capitalize';
import { useRegionalManagerById } from 'src/hooks/regional_managers';
import DisplayCountyManagerList from 'src/components/DisplayCountyManagerList';
import AssignArea from 'src/components/AssignArea';
import RegionalManagerInfo from './RegionalManagerInfo';
import { useCEO, useFinance } from 'src/hooks/permissions';
import { useCountyManagerList } from 'src/hooks/county_managers';

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

const RegionalManagerProfile = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const isFinance = useFinance();
  const isCEO = useCEO();

  const {
    data: regionalManager,
    isLoading,
    error,
    isSuccess
  } = useRegionalManagerById(id);

  const { data: countyManagers, isSuccess: cmSuccess } = useCountyManagerList();

  let details = {};
  let regionalManagerCountyManagers = [];
  if (isSuccess) {
    details = {
      ...regionalManager.attributes.user,
      id: regionalManager.id,
      area:
        regionalManager.attributes.area &&
        regionalManager.attributes.area.region
    };
    // regionalManagerCountyManagers = regionalManager.attributes.county_managers;
  }

  if (cmSuccess) {
    regionalManagerCountyManagers = countyManagers
      .map((cmObj) => {
        return {
          ...cmObj.attributes,
          id: cmObj.id
        };
      })
      .filter((cm) => cm.area?.region == details.area);
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="Regional Manager Profile" className={classes.root}>
      <div className={classes.progress}>{isLoading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <PageToolbar
          title={
            /* eslint-disable */
            details
              ? `Regional Manager: ${capitalize(
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
            <Tab label="County Managers" {...a11yProps(1)} />
          </Tabs>
        </Grid>

        <TabPanel value={value} index={0}>
          <Grid container spacing={3} className={classes.padTop}>
            <Grid item xl={4} lg={6} md={6} xs={12}>
              <RegionalManagerInfo details={details} />
            </Grid>
            {!isFinance && !isCEO && (
              <Grid item xl={4} lg={6} md={6} xs={12}>
                <AssignArea user={details} />
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Grid container spacing={3} className={classes.padTop}>
            <Grid item lg={12} md={12} xs={12}>
              <DisplayCountyManagerList
                countyManagers={regionalManagerCountyManagers}
              />
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </Page>
  );
};

export default RegionalManagerProfile;

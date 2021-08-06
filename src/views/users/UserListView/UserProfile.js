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
// import DisplayAgents from 'src/components/DisplayAgents';
// import DisplayProjects from 'src/components/DisplayProjects';
import capitalize from 'src/utils/capitalize';
import { useUserById } from 'src/hooks/user';
import useHR, { useFinance } from 'src/hooks/permissions';
// import AssignProject from './AssignProject';
// import AssignArea from './AssignArea';
// import AssignArea from 'src/components/AssignArea';
import UserDetail from './UserDetail';
import ActivateUser from 'src/components/ActivateUser';
import DeactivateUser from 'src/components/DeactivateUser';
import DeleteResource from 'src/components/DeleteResource';
import AssignRole from 'src/components/AssignRole';
import AssignArea from 'src/components/AssignArea';
import { updateUserActiveStatus } from 'src/redux/actions/authActions';
import { roles } from 'src/config';

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

const UserProfile = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isHR = useHR();

  const { data: user, isLoading, error, isSuccess } = useUserById(id);
  if (error) {
    enqueueSnackbar('Unable to fetch user in HR module', {
      variant: 'error'
    });
  }

  let details = {};
  let role = null;
  if (isSuccess) {
    details = {
      ...user.attributes,
      id: user.id
    };
    role = details.role;
  }

  return (
    <Page title="User Profile" className={classes.root}>
      <div className={classes.progress}>{isLoading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <PageToolbar
          title={
            /* eslint-disable */
            details
              ? `User: ${capitalize(details.first_name)} ${capitalize(
                  details.last_name
                )}`
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
          </Tabs>
        </Grid>

        <TabPanel value={value} index={0}>
          <Grid container spacing={3} className={classes.padTop}>
            <Grid item xl={12} lg={12} md={12} xs={12}>
              <UserDetail details={details} />
            </Grid>
            {isHR && (
              <Grid item xl={6} lg={6} md={6} xs={12}>
                <AssignRole user={details} />
              </Grid>
            )}

            {role && [roles.RM, roles.CM, roles.FOO].includes(role) && (
              <Grid item xl={6} lg={6} md={6} xs={12}>
                <AssignArea user={details} />
              </Grid>
            )}

            <Grid item xl={6} lg={6} md={6} xs={12}>
              <ActivateUser resourceUrl={`/users/${details.id}`} />
            </Grid>
            <Grid item xl={6} lg={6} md={6} xs={12}>
              <DeactivateUser
                resourceUrl={`/users/${details.id}`}
                title="Deactivate User"
                btnTitle="Deactivate User"
              />
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </Page>
  );
};

export default UserProfile;

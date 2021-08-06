import React from 'react';
/* eslint-disable */
import {
  Button,
  Container,
  Grid,
  Box,
  makeStyles,
  Typography
} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Edit } from 'react-feather';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Page from 'src/components/Page';
import {
  useActivateAgent,
  useAgent,
  useDeleteAgent,
  useUpdateAgentToContract
} from 'src/hooks/agents';
import useHR, {
  useCEO,
  useCM,
  useFinance,
  useFOO
} from 'src/hooks/permissions';
import LineProgress from 'src/components/LineProgress';
import TabPanel from 'src/components/TabPanel';
import AssignArea from 'src/components/AssignArea';
// import AgentDetails from './AgentDetails';
import AgentInfo from './AgentInfo';
import AssignProject from './AssignProject';
// import AssignRating from './AssignRating';
import AgentProjects from './AgentProjects';
import ReturnList from './ReturnList';
import DataGridToolbar from 'src/components/DataGridToolbar';
import AgentPerformance from './AgentPerformance';
import RequestApproval from './RequestApproval';
import capitalize from 'src/utils/capitalize';
import getArea from 'src/utils/getArea';
import ApproveAgent from 'src/components/ApproveAgent';
import DeleteAgent from './DeleteAgent';
import AssignFieldOfficer from './AssignFieldOfficer';
import ReactQuill from 'react-quill';
import CustomAlert from 'src/components/Alert';
import ActivateResource from 'src/components/ActivateResource';
import { agentTerms } from 'src/config';
import ApproveAgentDeletion from './ApproveAgentDeletion';
import mainConfig from 'src/config/config.json';
import removeTags from 'src/utils/removeTags';

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
  toolbar: {},
  btn: {
    width: '200px',
    color: 'green'
  },
  message: {
    marginBottom: theme.spacing(1),
    backgroundColor: '#fff',
    padding: theme.spacing(1)
  }
}));

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const AgentProfile = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const activateAgent = useActivateAgent();
  const updateAgentToContract = useUpdateAgentToContract();
  const approveAgentDeletion = useDeleteAgent();

  const { enqueueSnackbar } = useSnackbar();
  const { siteNames } = mainConfig.globalData;
  const { id } = useParams();
  const isFOO = useFOO();
  const isFinance = useFinance();
  const isCM = useCM();

  const { data, isLoading: loading, error, isSuccess } = useAgent(id);

  let agentDetails = {};
  let pendingApproval = false;
  if (isSuccess && data) {
    let agentArea = data.attributes.area;
    agentDetails = {
      ...data.attributes,
      agentId: data.id
    };
    const {
      is_approved_by_county_manager_contract,
      is_approved_by_field_officer_contract
    } = agentDetails;
    pendingApproval =
      is_approved_by_field_officer_contract &&
      !is_approved_by_county_manager_contract;
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isContractAgent = [3].includes(agentDetails.terms);
  const isPermanentAgent = [1, 2].includes(agentDetails.terms);
  // Display assign FOO module only if agent is permanent or agent has no FOO
  const displayAssignFOO =
    agentDetails.terms !== 3 || !agentDetails.field_officer?.user.is_active;

  return (
    <Page title={`${siteNames.Agent.name} Profile`} className={classes.root}>
      <div className={classes.progress}>{loading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <DataGridToolbar
          pageTitle={
            agentDetails &&
            `${siteNames.Agent.name}: ${capitalize(
              agentDetails.first_name
            )} ${capitalize(agentDetails.last_name)}`
          }
          navLink={`/app/agents/edit/${id}`}
          btnIcon={isFOO ? <Edit /> : null}
          btnTitle={isFOO ? 'Edit Agent' : ''}
        />

        <Box>
          {state && state.from === 'notifications' && (
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classes.btn}
              onClick={() => navigate(`/app/activity`)}
            >
              <ArrowBackIcon fontSize="small" />
              Back to notifications
            </Button>
          )}
        </Box>

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
            {/*  

              <Tab label="Returns" {...a11yProps(2)} />
              <Tab label="Performance" {...a11yProps(3)} />
              
              */}
          </Tabs>
        </Grid>

        <TabPanel value={value} index={0}>
          <Grid container spacing={3} className={classes.padTop}>
            <Grid item xl={12} lg={12} md={12} xs={12}>
              {/** Show reason for denied approval/activation requests if user navigates from notifications page */}
              {/* state && state.notification?.data.is_denied == 'true' ? (
                <Box>
                  <CustomAlert
                    severity={
                      state?.notification.data?.is_denied === 'true'
                        ? 'error'
                        : state?.notification.data?.is_approved === 'true'
                        ? 'success'
                        : 'info'
                    }
                    title={state?.notification.message}
                    content={`Denial reason: ${removeTags(
                      state?.notification?.data.denial_reason
                    )}`}
                  />
                </Box>
                    ) : null */}

              {/** Display alert message if deregister request has been sent to CM */}
              {isCM && agentDetails.approve_delete ? (
                <Box>
                  <CustomAlert
                    severity={'info'}
                    title={'Please de-register this user'}
                    content={`Request from: ${agentDetails?.field_officer?.user.email}`}
                  />
                </Box>
              ) : null}

              {/** Display alert message if deregister request has been denied. Show denial reason too */}
              {isFOO && agentDetails.deny_approve_delete_message ? (
                <Box>
                  <CustomAlert
                    severity={'error'}
                    title={
                      'Request for de-registering this user has been denied'
                    }
                    content={`Denial reason: ${removeTags(
                      agentDetails.deny_approve_delete_message
                    )}`}
                  />
                </Box>
              ) : null}

              {/** Display alert message if activate request has been sent to CM */}
              {isCM && agentDetails.approve_activate ? (
                <Box>
                  <CustomAlert
                    severity={'info'}
                    title={'Please approve this user'}
                    content={`Request from: ${agentDetails?.field_officer?.user.email}`}
                  />
                </Box>
              ) : null}

              {/** Display alert message if activate request has been denied by the CM**/}
              {isFOO && agentDetails.contract_denied_reason ? (
                <Box>
                  <CustomAlert
                    severity={'error'}
                    title={'This user has been denied approval'}
                    content={`Denial reason: ${removeTags(
                      agentDetails.contract_denied_reason
                    )}`}
                  />
                </Box>
              ) : null}
            </Grid>
            <Grid item xl={4} lg={4} md={6} xs={12}>
              <AgentInfo
                agentDetails={agentDetails}
                pendingApproval={pendingApproval}
              />
            </Grid>
            {(isFOO || isFinance) && (
              <Grid item xl={4} lg={4} md={6} xs={12}>
                <AssignProject
                  agentDetails={agentDetails}
                  disabled={!agentDetails.is_active}
                />
              </Grid>
            )}

            {isCM && isContractAgent && agentDetails?.approve_activate && (
              <Grid item xl={4} lg={4} md={6} xs={12}>
                <ApproveAgent
                  agentDetails={agentDetails}
                  title={`${siteNames.Agent.name} Activation`}
                  subheader="Approve Activation"
                  action={updateAgentToContract}
                />
              </Grid>
            )}

            {isCM && isContractAgent && agentDetails?.approve_delete && (
              <Grid item xl={4} lg={4} md={6} xs={12}>
                <ApproveAgentDeletion
                  agentDetails={agentDetails}
                  title={`${siteNames.Agent.name} De-Registration`}
                  subheader="Approve De-Registration"
                  action={approveAgentDeletion}
                />
              </Grid>
            )}

            {isFOO && isContractAgent && (
              <Grid item xl={4} lg={4} md={6} xs={12}>
                <RequestApproval
                  agentDetails={agentDetails}
                  pendingApproval={agentDetails.approve_activate}
                />
              </Grid>
            )}

            {/** HR cant assign area to an agent. FOO can assign agent to different area apart from theirs */}
            {/* !isHR && !isFOO && !isCEO && (
              <Grid item xl={4} lg={4} md={6} xs={12}>
                <AssignArea user={agentDetails} />
              </Grid>
            ) */}

            {isFinance && (
              <Grid item xl={4} lg={4} md={6} xs={12}>
                <AssignArea
                  user={agentDetails}
                  disabled={!agentDetails.is_active}
                />
              </Grid>
            )}

            {/** Only assign FOO to permanent agents or agents with no FOO or active agents */}
            {isCM && displayAssignFOO && (
              <Grid item xl={4} lg={4} md={6} xs={12}>
                <AssignFieldOfficer disabled={!agentDetails?.is_active} />
              </Grid>
            )}

            {((isFOO && isContractAgent) ||
              (isPermanentAgent && isFinance) ||
              (isCM && isContractAgent && !agentDetails?.approve_delete)) && (
              <Grid item xl={4} lg={4} md={6} xs={12}>
                <DeleteAgent
                  agentDetails={agentDetails}
                  disabled={!agentDetails.is_active}
                />
              </Grid>
            )}

            {((isCM && isContractAgent) || (isPermanentAgent && isFinance)) && (
              <Grid item xl={4} lg={4} md={6} xs={12}>
                <ActivateResource
                  resourceUrl={`/agents/${id}`}
                  title={`Activate ${siteNames.Agent.name}`}
                  action={activateAgent}
                  disabled={agentDetails.is_active}
                  pendingApproval={agentDetails.approve_activate}
                />
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Grid container spacing={3} className={classes.padTop}>
            <Grid item lg={12} md={12} xs={12}>
              <AgentProjects agentDetails={agentDetails} />
            </Grid>
          </Grid>
        </TabPanel>

        {/* 

          <TabPanel value={value} index={2}>
          <Grid container spacing={3} className={classes.padTop}>
            <Grid item lg={12} md={12} xs={12}>
              <ReturnList returns={agentDetails ? agentDetails.returns : []} />
            </Grid>
          </Grid>
        </TabPanel>

           <TabPanel value={value} index={3}>
          <Grid container spacing={3} className={classes.padTop}>
            <Grid item lg={12} md={12} xs={12}>
              <AgentPerformance />
            </Grid>
          </Grid>
        </TabPanel>


          */}
      </Container>
    </Page>
  );
};

export default AgentProfile;

import React from 'react';
/* eslint-disable */
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { useProjects } from 'src/hooks/projects';
import SummaryCard from './SummaryCard';
import useUser, { useUserList } from 'src/hooks/user';
import { useAgents } from 'src/hooks/agents';
import {
  isFinance,
  isHR,
  isRegionalManager,
  isCountyManager,
  isFieldOfficer,
  isCEO
} from 'src/utils/getRole';
import mainConfig from 'src/config/config.json';
import FolderIcon from '@material-ui/icons/FolderOpenTwoTone';
import BarChart from './BarChart';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const { globalData } = mainConfig;

  let { data: projects, isSuccess: projectsSuccess } = useProjects();
  const { data: userDetail, isSuccess: userSuccess } = useUser();
  const { data: userList, isSuccess: userListSuccess } = useUserList();
  let { data: agentList, isSuccess: agentListSuccess } = useAgents();

  // Users
  let userCount = 0;
  let financeOfficerCount = 0;
  let ceoCount = 0;
  let hrCount = 0;
  let regionalManagerCount = 0;
  let countyManagerCount = 0;
  let fieldOfficerCount = 0;
  let agentCount = 0;
  // Projects
  let totalProjectCount = 0;
  let userProjectCount = 0;
  let projectsWithAgents = 0;
  let projectsWithoutAgents = 0;
  let projectsWithAgentsContract = 0;
  let projectsWithAgentsPermanent = 0;
  // user's area
  let userArea = null;

  let role = null;
  if (userSuccess) {
    role = userDetail && userDetail.attributes && userDetail.attributes.role;
    if (isCountyManager(role)) {
      userArea = userDetail.attributes && userDetail.attributes.area.county;
    }

    if (isRegionalManager(role)) {
      userArea = userDetail.attributes && userDetail.attributes.area.region;
    }
  }

  if (userListSuccess) {
    // Ignore admin and current user (HR)
    userCount = Array.isArray(userList) ? userList.length - 2 : 0;
    financeOfficerCount = Array.isArray(userList)
      ? userList.filter((user) => isFinance(user.attributes.role)).length
      : 0;
    ceoCount = Array.isArray(userList)
      ? userList.filter((user) => isCEO(user.attributes.role)).length
      : 0;

    hrCount = Array.isArray(userList)
      ? userList.filter((user) => isHR(user.attributes.role)).length
      : 0;

    regionalManagerCount = Array.isArray(userList)
      ? userList.filter((user) => isRegionalManager(user.attributes.role))
          .length
      : 0;

    countyManagerCount = Array.isArray(userList)
      ? userList.filter((user) => isCountyManager(user.attributes.role)).length
      : 0;

    fieldOfficerCount = Array.isArray(userList)
      ? userList.filter((user) => isFieldOfficer(user.attributes.role)).length
      : 0;

    if (isRegionalManager(role)) {
      // debugger;
      countyManagerCount = Array.isArray(userList)
        ? userList.filter(
            (user) =>
              isCountyManager(user.attributes.role) &&
              user.attributes.area &&
              user.attributes.area.region &&
              user.attributes.area.region == userArea
          ).length
        : 0;

      fieldOfficerCount = Array.isArray(userList)
        ? userList.filter(
            (user) =>
              isFieldOfficer(user.attributes.role) &&
              user.attributes.area &&
              user.attributes.area.region &&
              user.attributes.area.region == userArea
          ).length
        : 0;
    }

    if (isCountyManager(role)) {
      countyManagerCount = Array.isArray(userList)
        ? userList.filter(
            (user) =>
              isCountyManager(user.attributes.role) &&
              user.attributes.area &&
              user.attributes.area.county &&
              user.attributes.area.county == userArea
          ).length
        : 0;

      fieldOfficerCount = Array.isArray(userList)
        ? userList.filter(
            (user) =>
              isFieldOfficer(user.attributes.role) &&
              user.attributes.area &&
              user.attributes.area.county &&
              user.attributes.area.county == userArea
          ).length
        : 0;
    }
  }

  if (projectsSuccess && userSuccess) {
    // Total project count

    projects = projects.results.features;
    projects = projects.filter((p) => p.properties.is_active);
    totalProjectCount = projects.length;

    projects.forEach((ft) => {
      if (ft.properties.agent) {
        if (ft.properties.agent.length > 0) {
          projectsWithAgents += 1;
          agentCount += ft.properties.agent.length;
          let agents = ft.properties.agent;
          agents.forEach((agent) => {
            if (agent.terms === 3) {
              projectsWithAgentsContract += 1;
            }

            if ([1, 2].includes(agent.terms)) {
              projectsWithAgentsPermanent += 1;
            }
          });
        } else {
          projectsWithoutAgents += 1;
        }
      }
    });
  }

  if (agentListSuccess) {
    agentList = Array.isArray(agentList)
      ? agentList.filter((agent) => agent.attributes.is_active)
      : [];
    agentCount = agentList.filter((agent) => agent.attributes.is_active).length;

    if (isRegionalManager(role)) {
      agentCount = agentList.filter(
        (agent) =>
          agent.attributes.area &&
          agent.attributes.area.region &&
          agent.attributes.area.region == userArea
      ).length;
    }
  }

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {isHR(role) && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <SummaryCard label="TOTAL USERS" count={userCount} />
            </Grid>
          )}

          {isHR(role) && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <SummaryCard
                label={`${globalData.siteNames.CEO.name.toUpperCase()}`}
                count={ceoCount}
              />
            </Grid>
          )}

          {isHR(role) && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <SummaryCard
                label={`${globalData.siteNames.HR.name.toUpperCase()}`}
                count={hrCount}
              />
            </Grid>
          )}

          {isHR(role) && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <SummaryCard
                label={`${globalData.siteNames.Finance.name.toUpperCase()}`}
                count={financeOfficerCount}
              />
            </Grid>
          )}

          {!isFinance(role) &&
            !isRegionalManager(role) &&
            !isCountyManager(role) &&
            !isFieldOfficer(role) && (
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <SummaryCard
                  label={`${globalData.siteNames.RM.name.toUpperCase()}(S)`}
                  count={regionalManagerCount}
                />
              </Grid>
            )}

          {!isFinance(role) && !isCountyManager(role) && !isFieldOfficer(role) && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <SummaryCard
                label={`${globalData.siteNames.CM.name.toUpperCase()}(S)`}
                count={countyManagerCount}
              />
            </Grid>
          )}

          {!isFinance(role) && !isFieldOfficer(role) && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <SummaryCard
                label={`${globalData.siteNames.FOO.name.toUpperCase()}(S)`}
                count={fieldOfficerCount}
              />
            </Grid>
          )}

          {!isHR(role) && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <SummaryCard
                label={`${globalData.siteNames.Agent?.name.toUpperCase()}(S)`}
                count={agentCount}
              />
            </Grid>
          )}

          {!isHR(role) && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <SummaryCard
                label={`${globalData.siteNames.Project?.name.toUpperCase()}(S)`}
                count={totalProjectCount || userProjectCount}
                icon={<FolderIcon />}
              />
            </Grid>
          )}

          {!isHR(role) && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <SummaryCard
                label={`${globalData.siteNames.Project.name.toUpperCase()}(S) WITH ${globalData.siteNames.Agent.name.toUpperCase()}(S) `}
                count={projectsWithAgents}
              />
            </Grid>
          )}

          {!isHR(role) && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <SummaryCard
                label={`${globalData.siteNames.Project.name.toUpperCase()}(S) WITH NO ${globalData.siteNames.Agent.name.toUpperCase()}(S) `}
                count={projectsWithoutAgents}
              />
            </Grid>
          )}

          {/**  */}

          {!isHR(role) && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <SummaryCard
                label={`${globalData.siteNames.Project.name.toUpperCase()}(S) WITH ${globalData.siteNames.Agent.name.toUpperCase()}(S) - ${globalData.siteNames.Permanent.name.toUpperCase()}`}
                count={projectsWithAgentsPermanent}
              />
            </Grid>
          )}

          {!isHR(role) && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <SummaryCard
                label={`${globalData.siteNames.Project.name.toUpperCase()}(S) WITH ${globalData.siteNames.Agent.name.toUpperCase()}(S) - ${globalData.siteNames.Contract.name.toUpperCase()}`}
                count={projectsWithAgentsContract}
              />
            </Grid>
          )}

          {/**
          
            {!isFinance(role) &&
            !isFieldOfficer(role) &&
            !isRegionalManager(role) && (
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalFieldOfficers />
              </Grid>
            )}

          {!isFinance(role) && !isCountyManager(role) && !isFieldOfficer(role) && (
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCountyManagers />
            </Grid>
          )}

          {!isFinance(role) &&
            !isRegionalManager(role) &&
            !isCountyManager(role) &&
            !isFieldOfficer(role) && (
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <TotalRegionalManagers />
              </Grid>
            )}
          
          
          */}

          {/**
             <Grid item lg={12} md={12} xl={12} xs={12}>
              <ReturnsGraph />
            </Grid>
          
          */}
        </Grid>
        <Grid container spacing={3}>
          {/** Bar chart here */}
          {/*
               <BarChart />

            */}
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;

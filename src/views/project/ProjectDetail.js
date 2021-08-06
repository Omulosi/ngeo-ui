import React from 'react';
/* eslint-disable */
import { makeStyles, Container, Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Edit } from 'react-feather';
import moment from 'moment';
import { useActivateProject, useProject } from 'src/hooks/projects';
import DetailsDisplay from 'src/components/DetailsDisplay';
import Page from 'src/components/Page';
import DataGridToolbar from 'src/components/DataGridToolbar';
import ProjectInfo from 'src/components/ProjectInfo';
import capitalize from 'src/utils/capitalize';
import { useFinance } from 'src/hooks/permissions';
import AssignArea from 'src/components/AssignArea';
import ActivateResource from 'src/components/ActivateResource';
import DeleteProject from './DeleteProject';
import mainConfig from 'src/config/config.json';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  gridWrapper: {
    height: '80vh',
    width: '100%'
  },
  grid: {},
  dark: {
    color: '#263238',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#263238'
    }
  },
  actionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewAction: {
    marginLeft: '0.7rem'
  }
}));

const ProjectDetails = () => {
  const classes = useStyles();
  const { id } = useParams();

  const { siteNames } = mainConfig.globalData;

  const { enqueueSnackbar } = useSnackbar();
  const activateProject = useActivateProject();

  const isFinance = useFinance();

  const { data, isLoading, error, isSuccess } = useProject(id);

  if (error) {
    console.log(`Error => ${error}`);
    enqueueSnackbar('Unable to fetch project data', {
      variant: 'error'
    });
  }

  let projectDetails = {};
  if (isSuccess) {
    projectDetails = { ...data.attributes, id: data.id };
  }
  return (
    <Page
      title={`${siteNames.Project.name}: ${capitalize(projectDetails.name)}`}
      className={classes.root}
    >
      <Container maxWidth={false}>
        <DataGridToolbar
          pageTitle={`${siteNames.Project.name}: ${capitalize(
            projectDetails.name
          )}`}
          navLink={`/app/projects/edit/${id}`}
          btnIcon={<Edit />}
          btnTitle="Edit"
          btnDisabled={!isFinance}
        />

        <Grid container spacing={3}>
          <Grid item xl={4} lg={6} md={6} xs={12}>
            <ProjectInfo projectDetails={projectDetails} />
          </Grid>
          {isFinance && (
            <Grid item xl={4} lg={6} md={6} xs={12}>
              {/** Todo: Fix me!!!!! */}
              <AssignArea
                project={projectDetails}
                disabled={!projectDetails.is_active}
              />
            </Grid>
          )}
          {isFinance && (
            <Grid item xl={4} lg={6} md={6} xs={12}>
              <DeleteProject
                projectDetails={projectDetails}
                disabled={!projectDetails.is_active}
              />
            </Grid>
          )}
          {isFinance && (
            <Grid item xl={4} lg={6} md={6} xs={12}>
              <ActivateResource
                resourceUrl={`/projects/${id}`}
                title={`Activate ${siteNames.Project.name}`}
                action={activateProject}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default ProjectDetails;

import React from 'react';
/* eslint-disable */
import {
  Container,
  makeStyles,
  Button,
  Input,
  InputBase
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useSnackbar } from 'notistack';
import LineProgress from 'src/components/LineProgress';
import useUser from 'src/hooks/user';
import { useProjects, useUploadFileResource } from 'src/hooks/projects';
import DisplayProjects from 'src/components/DisplayProjects';
import PageToolbar from 'src/components/PageToolbar';
import DataGridToolbar from 'src/components/DataGridToolbar';
import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';
import { useFinance } from 'src/hooks/permissions';
import mainConfig from 'src/config/config.json';
import EnhancedPageToolbar from 'src/components/EnhancedPageToolbar';
import UploadFileDialog from './UploadFileDialog';
import { axiosWithAuth } from 'src/utils/axios';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  gridWrapper: {
    height: '75vh',
    width: 'auto'
  },
  grid: {
    marginTop: theme.spacing(5)
  },
  progress: {
    marginTop: '0.3em'
  },
  btn: {
    textTransform: 'none',
    background: '#376fd0',
    marginLeft: '1em'
  },
  uploadForm: {
    display: 'inline-block'
  }
}));

const Projects = () => {
  const classes = useStyles();

  const [openFileUploadDialog, setOpenFileUploadDialog] = React.useState(false);

  const useUploadFile = useUploadFileResource();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const isFinance = useFinance();

  const { siteNames } = mainConfig.globalData;

  // get projects for currently logged in user
  const { data, isLoading, error, isSuccess } = useProjects();

  if (error) {
    console.log(`Error => ${error}`);
    enqueueSnackbar('Unable to fetch projects for this user', {
      variant: 'error'
    });
  }

  let projectData = [];
  if (isSuccess) {
    projectData = data.results.features;
  }

  const handleOpenFileDialog = () => {
    setOpenFileUploadDialog(true);
  };

  const handleCloseFileDialog = () => {
    setOpenFileUploadDialog(false);
  };

  const handleUploadFile = (files) => {
    let formData = new FormData();
    let file = files[0];
    formData.append('file', file);
    useUploadFile.mutate(formData);
  };

  return (
    <Page title={`${siteNames.Project.name}s`} className={classes.root}>
      <div className={classes.progress}>{isLoading && <LineProgress />}</div>
      <Container maxWidth={false}>
        {/** 
         *   <DataGridToolbar
          pageTitle={`${siteNames.Project.name}s`}
          navLink="/app/projects/add"
          btnIcon=
          btnTitle="New Project"
          btnDisabled={!isFinance}
        />
         * 
         */}

        <EnhancedPageToolbar pageTitle={`${siteNames.Project.name}s`}>
          <Button
            color="primary"
            variant="contained"
            className={classes.btn}
            onClick={handleOpenFileDialog}
            disabled={!isFinance}
          >
            {<PublishIcon />} {'Upload'}
          </Button>

          <Button
            color="primary"
            variant="contained"
            className={classes.btn}
            onClick={() => {
              navigate('/app/projects/add');
            }}
            disabled={!isFinance}
          >
            {<AddIcon />} {'Add New'}
          </Button>
          <UploadFileDialog
            open={openFileUploadDialog}
            handleClose={handleCloseFileDialog}
            handleSubmit={handleUploadFile}
          />
        </EnhancedPageToolbar>

        <DisplayProjects projects={projectData ? projectData : []} />
      </Container>
    </Page>
  );
};

export default Projects;

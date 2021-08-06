import React from 'react';
// import clsx from 'clsx';
/* eslint-disable-next-line */
import { Container, makeStyles, Tooltip } from '@material-ui/core';
import Page from 'src/components/Page';
import DataGridToolbar from 'src/components/DataGridToolbar';
// import { useNavigate } from 'react-router-dom';
// import { useSnackbar } from 'notistack';
// import LineProgress from 'src/components/LineProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const WelcomeView = () => {
  const classes = useStyles();
  //   const navigate = useNavigate();
  //   const { enqueueSnackbar } = useSnackbar();

  return (
    <Page title="Agents" className={classes.root}>
      {/* <div className={classes.progress}>{loading && <LineProgress />}</div> */}

      <Container maxWidth={false}>
        <DataGridToolbar pageTitle="Welcome Page" />
        <div>Welcome Page</div>
      </Container>
    </Page>
  );
};

export default WelcomeView;

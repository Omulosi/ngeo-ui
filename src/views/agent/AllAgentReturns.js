import React from 'react';
/* eslint-disable */
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import DataGridToolbar from 'src/components/DataGridToolbar';
import { useReturns } from 'src/hooks/returns';
import LineProgress from 'src/components/LineProgress';
import AddIcon from '@material-ui/icons/Add';
import ReturnList from './ReturnList';
import { useSnackbar } from 'notistack';

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

const AgentReturns = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, error } = useReturns();

  if (error) {
    enqueueSnackbar('Error fetching returns', { variant: 'error' });
  }

  let returns = [];
  if (data) {
    returns = data.map((r) => ({ ...r.attributes, id: r.id }));
  }

  return (
    <Page title="Returns" className={classes.root}>
      <div className={classes.progress}>{isLoading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <DataGridToolbar
          navLink="/app/returns/add"
          btnIcon={<AddIcon />}
          btnTitle="New Return"
          pageTitle="Returns"
        />
        <ReturnList returns={returns} />
      </Container>
    </Page>
  );
};

export default AgentReturns;

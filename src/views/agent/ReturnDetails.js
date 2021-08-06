import React from 'react';
/* eslint-disable */
// import PropTypes from 'prop-types';
import { makeStyles, Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Edit } from 'react-feather';
import moment from 'moment';
import { useReturn } from 'src/hooks/returns';
import DetailsDisplay from 'src/components/DetailsDisplay';
import Page from 'src/components/Page';
import DataGridToolbar from 'src/components/DataGridToolbar';

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

const ReturnDetails = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const { data, isLoading, error } = useReturn(id);

  if (error) {
    console.log(`Error => ${error}`);
    enqueueSnackbar('Unable to fetch agent return data', {
      variant: 'info'
    });
  }

  let rows = [];

  if (data) {
    const dataObject = { ...data.attributes, ...data.relationships };
    let name;
    const fields = Object.keys(dataObject);
    fields.forEach((field) => {
      if (field == 'project') {
        rows.push({
          name: 'Project',
          value: `${dataObject.project.name}`
        });

        return;
      }

      if (field == 'agent') {
        rows.push({
          name: 'Agent',
          value: `${dataObject.agent.first_name} ${dataObject.agent.last_name}`
        });
        return;
      }

      if (field == 'date_submitted') {
        rows.push({
          name: 'Date Submitted',
          value: moment(dataObject.date_submitted).format('lll')
        });
        return;
      }

      switch (field) {
        case 'rating':
          name = 'Rating';
          break;
        case 'remark':
          name = 'Remark';
          break;
        default:
          name = field;
      }
      rows.push({ name: name, value: dataObject[field] });
    });
  }

  return (
    <Page title="Returns" className={classes.root}>
      <Container maxWidth={false}>
        <DataGridToolbar
          pageTitle="Agent Return"
          navLink={`/app/returns/edit/${id}`}
          btnIcon={<Edit />}
          btnTitle="Edit Return"
        />
        <DetailsDisplay data={rows} title="Return Details" />
      </Container>
    </Page>
  );
};

export default ReturnDetails;

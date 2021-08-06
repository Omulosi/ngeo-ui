import React from 'react';
/* eslint-disable */
// import PropTypes from 'prop-types';
import { makeStyles, Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Edit } from 'react-feather';
import moment from 'moment';
import { useIncident } from 'src/hooks/incidents';
import DetailsDisplay from 'src/components/DetailsDisplay';
import Page from 'src/components/Page';
import DataGridToolbar from 'src/components/DataGridToolbar';
import ProjectInfo from 'src/components/ProjectInfo';
import capitalize from 'src/utils/capitalize';

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

const IncidentDetails = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const { data, isLoading, isError, isSuccess } = useIncident(id);

  // if (error) {
  //   console.log(`Error => ${error}`);
  //   enqueueSnackbar('Unable to fetch incindent data', {
  //     variant: 'error'
  //   });
  // }

  let incidentDetails = {};
  if (isSuccess) {
    incidentDetails = data.attributes;
  }

  let incidentData = [];
  if (data) {
    const fields = Object.keys(incidentDetails);
    fields.forEach((field) => {
      let header = '';

      if (field === 'location') {
        return;
      }

      switch (field) {
        case 'id':
          header = 'ID';
          break;
        case 'name':
          header = 'Name';
          break;
        case 'date_reported':
          header = 'Last Name';
          break;
        case 'description':
          header = 'Description';
          break;
        case 'longitude':
          header = 'Longitude';
          break;
        case 'latitude':
          header = 'Latitude';
          break;
        default:
          header = field;
      }

      incidentData.push({ name: header, value: incidentDetails[field] });
    });
  }

  return (
    <Page
      title={`Incident: ${capitalize(incidentDetails.title)}`}
      className={classes.root}
    >
      <Container maxWidth={false}>
        <DataGridToolbar
          pageTitle={`Incident: ${capitalize(incidentDetails.name)}`}
          navLink={`/app/incidents/edit/${id}`}
          btnIcon={<Edit />}
          btnTitle="Edit Incident"
          btnDisabled={true}
        />
        <DetailsDisplay data={incidentData} title="Incident Info" />
      </Container>
    </Page>
  );
};

export default IncidentDetails;

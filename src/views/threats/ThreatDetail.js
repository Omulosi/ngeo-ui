import React from 'react';
/* eslint-disable */
// import PropTypes from 'prop-types';
import { makeStyles, Container, Grid, Box } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Edit } from 'react-feather';
import moment from 'moment';
import { useActivateThreat, useThreat } from 'src/hooks/threats';
import { useCM, useFOO } from 'src/hooks/permissions';
import DetailsDisplay from 'src/components/DetailsDisplay';
import Page from 'src/components/Page';
import DataGridToolbar from 'src/components/DataGridToolbar';
import FailureChip from 'src/components/FailureChip';
import SuccessChip from 'src/components/SuccessChip';
import ActivateResource from 'src/components/ActivateResource';
import capitalize from 'src/utils/capitalize';
import DeleteThreat from './DeleteThreat';
import { capitalizeFirstLetter } from 'src/utils/capitalize';

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

const ThreatDetails = () => {
  const classes = useStyles();
  const { id } = useParams();

  const activateThreat = useActivateThreat();

  const isCM = useCM();
  const { data, isSuccess } = useThreat(id);

  let threatDetails = {};
  if (isSuccess) {
    threatDetails = { ...data.attributes, id: data.id };
  }

  let threatData = [];
  if (data) {
    const excludeFields = [
      'location',
      'from_region',
      'to_region',
      'id',
      'deleted',
      'created',
      'updated',
      // 'is_active',
      'delete_reason'
    ];
    const fields = Object.keys(threatDetails);
    fields.forEach((field) => {
      let header = '';

      if (excludeFields.includes(field)) {
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
          header = 'Date Reported';
          break;
        case 'description':
          header = 'Description';
          break;
        case 'origin':
          header = 'From';
          break;
        case 'destination':
          header = 'To';
          break;
        case 'threat_type':
          header = 'Type';
          break;
        case 'color':
          header = 'Color';
          break;
        case 'is_active':
          header = 'Status';
          const getStatus = (activeStatus) => {
            if (activeStatus) {
              return (
                <Box className={classes.actionItem}>
                  <SuccessChip label="Active" />
                </Box>
              );
            }
            return (
              <Box className={classes.actionItem}>
                <FailureChip label="Inactive" />
              </Box>
            );
          };
          let status = threatDetails['is_active'];
          console.log(status);
          threatDetails['is_active'] = getStatus(status);
          break;
        default:
          header = field;
      }

      threatData.push({
        name: header,
        value:
          typeof threatDetails[field] === 'string'
            ? capitalizeFirstLetter(threatDetails[field])
            : threatDetails[field]
      });
    });
  }

  return (
    <Page
      title={`Threat: ${capitalize(threatDetails.title)}`}
      className={classes.root}
    >
      <Container maxWidth={false}>
        <DataGridToolbar
          pageTitle={`Threat: ${capitalize(threatDetails.name)}`}
          navLink={`/app/threats/edit/${id}`}
          btnIcon={<Edit />}
          btnTitle="Edit Threat"
          btnDisabled={!isCM}
        />

        <Grid container spacing={3}>
          <Grid item xl={4} lg={6} md={6} xs={12}>
            <DetailsDisplay data={threatData} title="Threat Info" />
          </Grid>

          {isCM && (
            <Grid item xl={4} lg={6} md={6} xs={12}>
              <DeleteThreat threatDetails={threatDetails} />
            </Grid>
          )}

          {isCM && (
            <Grid item xl={4} lg={6} md={6} xs={12}>
              <ActivateResource
                resourceUrl={`/threats/${id}`}
                title="Activate Threat"
                action={activateThreat}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default ThreatDetails;

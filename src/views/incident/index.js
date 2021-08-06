import React from 'react';
import clsx from 'clsx';
/* eslint-disable */
import { Container, Box, Avatar, Tooltip, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import DataGridToolbar from 'src/components/DataGridToolbar';
import { ArrowRight, Edit } from 'react-feather';
import { useSnackbar } from 'notistack';
import AddIcon from '@material-ui/icons/Add';
import { useIncidents } from 'src/hooks/incidents';
import LineProgress from 'src/components/LineProgress';
import { useNavigate } from 'react-router';
// import { Scrollbars } from 'react-custom-scrollbars';

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

const Incidents = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error, isSuccess } = useIncidents();

  if (error) {
    console.log(`Error => ${error}`);
    enqueueSnackbar('Unable to fetch incidents', {
      variant: 'error'
    });
  }

  let incidents = [];
  if (isSuccess) {
    incidents = data.results.features;
  }

  const rows = incidents
    ? incidents.map((p) => {
        return { id: p.id, ...p.properties, incident: { id: p.id } };
      })
    : [];

  const columns = [];
  if (rows.length > 0) {
    const fields = Object.keys(rows[0]);
    fields.forEach((field) => {
      let header = '';
      if (
        field === 'incident' ||
        field === 'location' ||
        // field === 'description' ||
        field === 'longitude' ||
        field === 'latitude'
      ) {
        return;
      }

      switch (field) {
        case 'id':
          header = 'ID';
          break;
        case 'name':
          header = 'Name';
          break;
        case 'description':
          header = 'Description';
          break;
        case 'date_reported':
          header = 'Date Reported';
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
      columns.push({
        field,
        headerName: header,
        width: 230,
        hide: field === 'id' || field === 'description'
      });
    });

    const editField = {
      field: 'incident',
      headerName: 'Actions',
      width: 230,
      renderCell: (params) => (
        <Box className={classes.actionItem}>
          <Tooltip title="Edit" placement="bottom">
            <Avatar className={classes.dark}>
              <Edit
                onClick={() => navigate(`/app/incidents/edit/${params.row.id}`)}
              />
            </Avatar>
          </Tooltip>
          <Tooltip title="View" placement="bottom">
            <Avatar className={clsx(classes.dark, classes.viewAction)}>
              <ArrowRight
                onClick={() => navigate(`/app/incidents/${params.row.id}`)}
              />
            </Avatar>
          </Tooltip>
        </Box>
      )
    };

    columns.push(editField);
  }

  const incidentData = { columns, rows };

  return (
    <Page title="Incidents" className={classes.root}>
      <div className={classes.progress}>{loading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <DataGridToolbar
          pageTitle="Incidents"
          navLink="/app/incidents/add"
          btnIcon={<AddIcon />}
          btnTitle="New Incident"
        />

        <div className={classes.gridWrapper}>
          <DataGrid
            {...incidentData}
            components={{
              Toolbar: GridToolbar
            }}
            showToolbar
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            checkboxSelection
            className={classes.grid}
          />
        </div>
      </Container>
    </Page>
  );
};

export default Incidents;

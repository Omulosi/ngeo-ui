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
import { useThreats } from 'src/hooks/threats';
import LineProgress from 'src/components/LineProgress';
import { useNavigate } from 'react-router';
import moment from 'moment';
import { useCM, useFOO } from 'src/hooks/permissions';
import FailureChip from 'src/components/FailureChip';
import SuccessChip from 'src/components/SuccessChip';
import mainConfig from 'src/config/config.json';
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

const Threats = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { siteNames } = mainConfig.globalData;

  const isFOO = useFOO();
  const isCM = useCM();

  const { data, loading, error, isSuccess } = useThreats();

  if (error) {
    console.log(`Error => ${error}`);
    enqueueSnackbar('Unable to fetch threats', {
      variant: 'error'
    });
  }

  let threats = [];

  if (isSuccess) {
    threats = data.results.features;
  }

  const rows = threats
    ? threats.map((p) => {
        return {
          id: p.id,
          ...p.properties,
          date_reported: moment(p.properties.date_reported).format('ll'),
          threat: { id: p.id }
        };
      })
    : [];

  const columns = [];
  if (rows.length > 0) {
    const excludeFields = [
      'location',
      'from_region',
      'to_region',
      'id',
      'deleted',
      'created',
      'updated',
      'is_active',
      'delete_reason',
      'color',
      'threat'
    ];
    const fields = Object.keys(rows[0]);
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
        case 'description':
          header = 'Description';
          break;
        case 'date_reported':
          header = 'Date Reported';
          break;
        case 'origin':
          header = 'From';
          break;
        case 'threat_type':
          header = 'Type';
          break;
        case 'destination':
          header = 'To';
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

    const statusField = {
      field: 'is_active',
      headerName: 'Status',
      width: 200,
      renderCell: (params) => {
        if (params.value) {
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
      }
    };

    const actionsField = {
      field: 'threat',
      headerName: 'Actions',
      width: 230,
      renderCell: (params) => (
        <Box className={classes.actionItem}>
          {isCM && (
            <Tooltip title="Edit" placement="bottom">
              <Avatar className={classes.dark}>
                <Edit
                  onClick={() => navigate(`/app/threats/edit/${params.row.id}`)}
                />
              </Avatar>
            </Tooltip>
          )}

          <Tooltip title="View" placement="bottom">
            <Avatar className={clsx(classes.dark, classes.viewAction)}>
              <ArrowRight
                onClick={() => navigate(`/app/threats/${params.row.id}`)}
              />
            </Avatar>
          </Tooltip>
        </Box>
      )
    };

    columns.push(statusField);
    columns.push(actionsField);
  }

  const threatData = { columns, rows };

  return (
    <Page title={`${siteNames.Threat.name}s`} className={classes.root}>
      <div className={classes.progress}>{loading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <DataGridToolbar
          pageTitle={`${siteNames.Threat.name}s`}
          navLink="/c/map"
          btnIcon={<AddIcon />}
          btnTitle="Add New"
          btnDisabled={!isFOO}
        />

        <div className={classes.gridWrapper}>
          <DataGrid
            {...threatData}
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

export default Threats;

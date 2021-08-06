import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
/* eslint-disable */
import { Avatar, Box, Container, makeStyles, Tooltip } from '@material-ui/core';
import Page from 'src/components/Page';
// import DataGridToolbar from 'src/components/DataGridToolbar';
import { ArrowRight } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import LineProgress from 'src/components/LineProgress';
import DataGridDisplay from 'src/components/DataGridDisplay';
// import AddIcon from '@material-ui/icons/Add';
import PageToolbar from 'src/components/PageToolbar';
import { useCountyManagerList } from 'src/hooks/county_managers';
import FailureChip from 'src/components/FailureChip';
import SuccessChip from 'src/components/SuccessChip';
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

const CountyManagerList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { siteNames } = mainConfig.globalData;

  // Get all countyManagers
  const { data, isLoading, error, isSuccess } = useCountyManagerList();

  if (error) {
    console.log(`Error => ${error}`);
    enqueueSnackbar('Error fetching county managers', {
      variant: 'error'
    });
  }

  let countyManagers = [];
  if (isSuccess) {
    countyManagers = data;
  }

  const rows =
    countyManagers.length > 0
      ? countyManagers.map((cm) => {
          return {
            id: cm.id,
            ...cm.attributes.user,
            is_active: { isActive: cm.attributes.user.is_active },
            date_joined: moment(cm.attributes.user.date_joined),
            regionalManager: { id: cm.id }
          };
        })
      : [];

  const columns = [];
  const displayFields = [
    'id',
    'first_name',
    'last_name',
    'email',
    'date_joined',
    'staff_number'
  ];
  if (rows.length > 0) {
    const fields = Object.keys(rows[0]);
    fields.forEach((field) => {
      let header = '';

      // Display only allowable fields
      if (!displayFields.includes(field)) {
        return;
      }

      switch (field) {
        case 'id':
          header = 'ID';
          break;
        case 'first_name':
          header = 'First Name';
          break;
        case 'last_name':
          header = 'Last Name';
          break;
        case 'email':
          header = 'Email';
          break;
        case 'date_joined':
          header = 'Date Joined';
          break;
        case 'staff_number':
          header = 'Staff Number';
          break;
        default:
          header = field;
      }
      columns.push({
        field,
        headerName: header,
        width: 250,
        hide: field === 'id' || field === 'created' || field === 'uuid'
      });
    });

    const statusField = {
      field: 'is_active',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => {
        if (params.value.isActive) {
          return <SuccessChip label="Active" />;
        }
        return <FailureChip label="Inactive" />;
      }
    };

    const actionField = {
      field: 'regionalManager',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <Box className={classes.actionItem}>
          <Tooltip title="View" placement="bottom">
            <Avatar className={clsx(classes.dark, classes.viewAction)}>
              <ArrowRight
                onClick={() =>
                  navigate(`/app/county_managers/${params.value.id}`)
                }
              />
            </Avatar>
          </Tooltip>
        </Box>
      )
    };

    columns.push(statusField);
    columns.push(actionField);
  }

  const countyManagerData = { columns, rows };

  return (
    <Page title={`${siteNames.CM.name}s`} className={classes.root}>
      <div className={classes.progress}>{isLoading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <PageToolbar title={`${siteNames.CM.name}s`} />
        <DataGridDisplay
          data={countyManagerData}
          title={`${siteNames.CM.name}s`}
        />
      </Container>
    </Page>
  );
};

export default CountyManagerList;

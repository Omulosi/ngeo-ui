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
import { useFieldOfficerList } from 'src/hooks/field_officers';
import FailureChip from 'src/components/FailureChip';
import SuccessChip from 'src/components/SuccessChip';
import useHR from 'src/hooks/permissions';
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

const FieldOfficerList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { siteNames } = mainConfig.globalData;

  // Get all field officers
  const { data, isLoading, error, isSuccess } = useFieldOfficerList();

  if (error) {
    console.log(`Error => ${error}`);
    enqueueSnackbar('Error fetching field officers', {
      variant: 'error'
    });
  }

  let fieldOfficers = [];
  if (isSuccess) {
    fieldOfficers = data;
  }
  const rows =
    fieldOfficers.length > 0
      ? fieldOfficers.map((fo) => {
          return {
            id: fo.id,
            ...fo.attributes.user,
            is_active: { isActive: fo.attributes.user.is_active },
            date_joined: moment(fo.attributes.user.date_joined),
            fieldOfficer: { id: fo.id }
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
        case 'is_active':
          header = 'Status';
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
        flex: 1,
        hide: field === 'id' || field === 'created' || field === 'uuid'
      });
    });

    const statusField = {
      field: 'is_active',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        if (params.value.isActive) {
          return <SuccessChip label="Active" />;
        }
        return <FailureChip label="Inactive" />;
      }
    };

    const actionField = {
      field: 'fieldOfficer',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box className={classes.actionItem}>
          <Tooltip title="View" placement="bottom">
            <Avatar className={clsx(classes.dark, classes.viewAction)}>
              <ArrowRight
                onClick={() =>
                  navigate(`/app/field_officers/${params.value.id}`)
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

  const fieldOfficerData = { columns, rows };

  return (
    <Page title={`${siteNames.FOO.name}s`} className={classes.root}>
      <div className={classes.progress}>{isLoading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <PageToolbar title={`${siteNames.FOO.name}s`} />
        <DataGridDisplay
          data={fieldOfficerData}
          title={`${siteNames.FOO.name}s`}
        />
      </Container>
    </Page>
  );
};

export default FieldOfficerList;

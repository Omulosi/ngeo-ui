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
import FailureChip from 'src/components/FailureChip';
import SuccessChip from 'src/components/SuccessChip';
import useUser, { useUserList } from 'src/hooks/user';
import { roleNames as roles } from 'src/config';
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

const UserList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { data: user, isSuccess: userSuccess } = useUser();

  const { data, isLoading, error, isSuccess } = useUserList();

  if (error) {
    console.log(`Error => ${error}`);
    enqueueSnackbar('Error fetching user list in HR module', {
      variant: 'error'
    });
  }

  let userList = [];
  if (isSuccess) {
    userList = data;
  }

  let rows =
    userList.length > 0
      ? userList.map((u) => {
          return {
            id: u.id,
            ...u.attributes,
            role: roles[u.attributes.role],
            is_active: { isActive: u.attributes.is_active },
            date_joined: moment(u.attributes.date_joined),
            user: { id: u.id }
          };
        })
      : [];

  let columns = [];
  const displayFields = [
    'id',
    'first_name',
    'last_name',
    'email',
    'date_joined',
    'is_active',
    'created',
    'role'
  ];
  if (rows.length > 0) {
    const fields = Object.keys(rows[0]);
    fields.forEach((field) => {
      let header = '';

      if (field === 'user') {
        return;
      }

      if (field === 'is_active') {
        return;
      }

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
        case 'created':
          header = 'Created';
          break;
        case 'role':
          header = 'Role';
          break;
        default:
          header = field;
      }
      columns.push({
        field,
        headerName: header,
        width: 200,
        hide: field === 'id' || field === 'created'
      });
    });

    const statusField = {
      field: 'is_active',
      headerName: 'Status',
      width: 200,
      renderCell: (params) => {
        if (params.value.isActive) {
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

    const actionField = {
      field: 'user',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box className={classes.actionItem}>
          <Tooltip title="View" placement="bottom">
            <Avatar className={clsx(classes.dark, classes.viewAction)}>
              <ArrowRight
                onClick={() => navigate(`/app/users/${params.value.id}`)}
              />
            </Avatar>
          </Tooltip>
        </Box>
      )
    };

    columns.push(statusField);
    columns.push(actionField);
  }

  // Skip current current from list of users
  if (userSuccess && rows.length > 0) {
    rows = rows
      .filter((u) => u.email !== user.attributes.email)
      .filter((u) => !u.is_staff);
  }

  const userListData = { columns, rows };

  return (
    <Page title="Registered Users" className={classes.root}>
      <div className={classes.progress}>{isLoading && <LineProgress />}</div>
      <Container maxWidth={false}>
        <PageToolbar title="Registered Users" />
        <DataGridDisplay data={userListData} title="Registered Users" />
      </Container>
    </Page>
  );
};

export default UserList;

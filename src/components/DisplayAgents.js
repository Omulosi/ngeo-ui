import React from 'react';
import clsx from 'clsx';
/* eslint-disable */
import moment from 'moment';
import { Avatar, Box, Container, makeStyles, Tooltip } from '@material-ui/core';
import Page from 'src/components/Page';
import DataGridToolbar from 'src/components/DataGridToolbar';
import { ArrowRight, Edit } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useFieldOfficerAgents } from 'src/hooks/agents';
import LineProgress from 'src/components/LineProgress';
import { agentTerms as terms } from 'src/config';
import DataGridDisplay from 'src/components/DataGridDisplay';
import AddIcon from '@material-ui/icons/Add';
import { useFOO, useFinance } from 'src/hooks/permissions';
import FailureChip from 'src/components/FailureChip';
import SuccessChip from 'src/components/SuccessChip';
import useUser from 'src/hooks/user';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    '& .MuiDataGrid-root .MuiDataGrid-colCellTitle': {
      fontWeight: 'bold',
      width: '500px'
    }
  },
  gridWrapper: {
    height: '80vh',
    minWidth: '100%'
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

/* eslint-disable */
const DisplayAgents = ({ agents, agentBaseUrl }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isFOO = useFOO();
  const isFinance = useFinance();
  const { data: user } = useUser();

  const baseUrl = agentBaseUrl ? agentBaseUrl : '/app/agents';

  /* eslint-disable */
  const rows = agents
    ? agents.map((agent) => {
        return {
          id: agent.id,
          ...agent,
          terms: terms[agent.terms],
          agent: { ...agent, id: agent.id },
          is_active: { isActive: agent.is_active },
          created: moment(agent.created).format('ll'),
          updated: moment(agent.updated).format('ll')
        };
      })
    : [];

  const columns = [];
  if (rows.length > 0) {
    const fields = Object.keys(rows[0]);
    const visibleFields = [
      'id',
      'first_name',
      'last_name',
      'id_number',
      'terms',
      'created',
      'updated'
    ];
    fields.forEach((field) => {
      let header = '';

      if (!visibleFields.includes(field)) {
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
        case 'id_number':
          header = 'ID Number';
          break;
        // case 'phone_number':
        //   header = 'Phone Number';
        //   break;
        // case 'email':
        //   header = 'Email';
        //   break;
        case 'terms':
          header = 'Terms';
          break;
        case 'role':
          header = 'Role';
          break;
        case 'created':
          header = 'Date Created';
          break;
        case 'updated':
          header = 'Date Updated';
          break;
        default:
          header = field;
      }
      columns.push({
        field,
        headerName: header,
        width: 200,
        hide: field == 'id' || field == 'projects' || field == 'returns'
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

    const editField = {
      field: 'agent',
      headerName: 'Actions',
      width: 230,
      renderCell: (params) => (
        <Box className={classes.actionItem}>
          {/** Can be edited only by user who created them */}
          {user &&
            user.attributes &&
            user.attributes.staff_number ==
              params.row.created_by.staff_number && (
              <Tooltip title="Edit" placement="bottom">
                <Avatar className={classes.dark}>
                  <Edit
                    onClick={() =>
                      navigate(`/app/agents/edit/${params.row.id}`)
                    }
                  />
                </Avatar>
              </Tooltip>
            )}
          <Tooltip title="View" placement="bottom">
            <Avatar className={clsx(classes.dark, classes.viewAction)}>
              <ArrowRight
                onClick={() => navigate(`/app/agents/${params.row.id}`)}
              />
            </Avatar>
          </Tooltip>
        </Box>
      )
    };

    columns.push(statusField);
    columns.push(editField);
  }

  const agentData = { columns, rows };

  return (
    <Page title="Agents" className={classes.root}>
      <Container maxWidth={false}>
        <>
          <DataGridDisplay data={agentData} title="Agents" />
        </>
      </Container>
    </Page>
  );
};

export default DisplayAgents;

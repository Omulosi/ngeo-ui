import React from 'react';
import clsx from 'clsx';
/* eslint-disable */
import { ArrowRight, Delete } from 'react-feather';
import { makeStyles, Box, Tooltip, Avatar } from '@material-ui/core';
import { useNavigate } from 'react-router';
import FailureChip from 'src/components/FailureChip';
import SuccessChip from 'src/components/SuccessChip';
import DataGridDisplay from 'src/components/DataGridDisplay';
// import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { UnAssignProject } from 'src/redux/actions/projectActions';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {},
  gridWrapper: {
    height: '75vh',
    width: 'auto'
  },
  grid: {
    marginTop: theme.spacing(5)
  },
  progress: {
    marginTop: '0.3em'
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
    justifyContent: 'space-betweeb',
    alignItems: 'center'
  },
  viewAction: {
    marginLeft: '0.7rem'
  }
}));

const DisplayProjects = ({ projects = [] }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const pathName = window.location.pathname.toLocaleLowerCase();
  let assignee = null;

  if (pathName.includes('field_officers')) {
    assignee = 'FOO';
  }

  if (pathName.includes('agent')) {
    assignee = 'Agent';
  }

  // debugger;

  /* eslint-disable */
  const rows = projects
    ? projects.map((p) => {
        return {
          id: p.id,
          ...p.properties,
          theme: p.properties.theme?.name,
          project: { id: p.id },
          date_added: moment(p.properties.date_added).format('lll'),
          remove: { id: p.id }
        };
      })
    : [];

  const columns = [];
  if (rows.length > 0) {
    const excludedFields = [
      'project',
      'description',
      'area',
      'deleted',
      'remove',
      'areaID',
      'county_manager',
      'field_officer',
      'agent',
      'delete_reason',
      'is_active',
      'created',
      'updated',
      'deleted_by'
    ];
    const fields = Object.keys(rows[0]);
    fields.forEach((field) => {
      let header = '';
      // skip these fields
      if (excludedFields.includes(field)) {
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
        case 'theme':
          header = 'Theme';
          break;
        case 'date_added':
          header = 'Date Added';
          break;
        case 'county':
          header = 'County';
          break;
        case 'region':
          header = 'Region';
          break;
        case 'initiated_by':
          header = 'Controlled By';
          break;
        default:
          header = field;
      }
      let hide = ['id', 'latitude', 'longitude', 'date_added'].includes(field);
      columns.push({ field, headerName: header, width: 200, hide });
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

    const projectInfoField = {
      field: 'project',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box className={classes.actionItem}>
          <Tooltip title="View project" placement="bottom">
            <Avatar className={clsx(classes.dark, classes.viewAction)}>
              <ArrowRight
                onClick={() => navigate(`/app/projects/${params.value.id}`)}
              />
            </Avatar>
          </Tooltip>
          {/**
            Display only on agents/CM/FOO profile pages.

            if Agent:
              dispatch unassign project action.
              data: project ID, agent ID, user unassigning
              user can assign if: - They assigned the project to this agent
                                  - They are a Finance Officer
           */}
          {pathName.includes('field_officers') && (
            <Tooltip title="Unassign project" placement="bottom">
              <Avatar className={clsx(classes.dark, classes.viewAction)}>
                <Delete
                  onClick={() =>
                    dispatch(
                      UnAssignProject(
                        {
                          assignee,
                          project_id: params.value.id
                        },
                        enqueueSnackbar
                      )
                    )
                  }
                />
              </Avatar>
            </Tooltip>
          )}
        </Box>
      )
    };

    columns.push(statusField);
    columns.push(projectInfoField);
  }

  const projectData = { columns, rows };

  return <DataGridDisplay data={projectData} />;
};

export default DisplayProjects;

import React from 'react';
/* eslint-disable */
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Divider,
  Paper,
  TableContainer,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableRow,
  makeStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import SuccessChip from 'src/components/SuccessChip';
import capitalize from 'src/utils/capitalize';
import FailureChip from 'src/components/FailureChip';
import PendingChip from 'src/components/PendingChip';
import { agentTerms as termsDict, roles } from 'src/config';
import createAreaString from 'src/utils/createAreaString';
import { useFinance } from 'src/hooks/permissions';
import useUser from 'src/hooks/user';

const useStyles = makeStyles({
  table: {},
  title: {
    padding: '1em'
  },
  rowHeader: {
    fontWeight: 500
  },
  rowBody: {
    // fontWeight: 400,
    color: 'rgb(107, 119, 140)'
  },
  area: {
    backgroundColor: 'rgba(76, 175, 80, 0.08)',
    color: '#4caf50',
    padding: '0.3em 0.1em'
  }
});

/*eslint-disable */
const AgentInfo = ({ agentDetails, pendingApproval }) => {
  const {
    email,
    first_name: firstName,
    id_number: idNumber,
    last_name: lastName,
    phone_number: phoneNumber,
    terms,
    area,
    created,
    created_by,
    updated,
    field_officer,
    is_active,
    deleted,
    delete_reason
  } = agentDetails;

  const classes = useStyles();
  const areaString = createAreaString(area);
  const isFinance = useFinance();
  const { data: user } = useUser();

  const handleReasonChange = (html) => {};

  let rows = [
    {
      name: 'First Name',
      value: (firstName && capitalize(firstName)) || ''
    },
    {
      name: 'Last Name',
      value: (lastName && capitalize(lastName)) || ''
    },
    {
      name: 'Employment terms',
      value: termsDict[terms]
    },
    {
      name: 'Status',
      value: is_active ? (
        <SuccessChip label="Active" />
      ) : pendingApproval ? (
        <PendingChip label="Pending" />
      ) : (
        <FailureChip label="Inactive" />
      )
    },
    { name: 'ID Number', value: idNumber || '' },
    { name: 'Field Officer', value: field_officer?.user.email },

    { name: 'Area', value: areaString || '' },
    { name: 'Created', value: moment(created).format('lll') },
    { name: 'Updated', value: moment(updated).format('lll') }
  ];

  if (isFinance) {
    rows.push({
      name: 'Created by',
      value:
        (created_by && (
          <Link
            to={
              created_by.role == roles.FOO
                ? '/app/field_officers'
                : created_by.role == roles.CM
                ? '/app/county_managers'
                : '#'
            }
          >
            <em style={{ textDecoration: 'underline' }}>
              {created_by.staff_number}
            </em>
          </Link>
        )) ||
        ''
    });
  }

  // Displayed only when project is inactive
  if (!is_active) {
    rows = [
      ...rows,
      {
        name: 'Date De-Registered',
        value: deleted && moment(deleted).format('lll')
      },
      {
        name: 'Action By',
        value: user?.attributes.staff_number
      },
      {
        name: 'Reason for De-Registration',
        value: (
          <ReactQuill
            modules={{ toolbar: false }}
            value={delete_reason || ''}
            readOnly
          />
        ),
        isReasonField: true
      }
    ];
  }

  return (
    <Paper elevation={1}>
      <div>
        <Typography variant="h5" className={classes.title}>
          Agent Info
        </Typography>
      </div>
      <Divider />
      <TableContainer>
        <Table className={classes.table}>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.rowHeader}
                >
                  {row.name}
                </TableCell>
                <TableCell align="left" className={clsx(classes.rowBody)}>
                  <span className={row.name == 'Area' && classes.area}>
                    {row.value}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

AgentInfo.propTypes = {
  agentDetails: PropTypes.object
};

export default AgentInfo;

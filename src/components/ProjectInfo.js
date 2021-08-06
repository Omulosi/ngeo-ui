import React from 'react';
/* eslint-disable */
import PropTypes from 'prop-types';
import moment from 'moment';
import { projectThemes } from 'src/config';
import { makeStyles } from '@material-ui/core';
import DetailsDisplay from 'src/components/DetailsDisplay';
import SuccessChip from 'src/components/SuccessChip';
import PendingChip from 'src/components/PendingChip';
import FailureChip from 'src/components/FailureChip';
import ReactQuill from 'react-quill';
import mainConfig from 'src/config/config.json';
import useUser from 'src/hooks/user';

const useStyles = makeStyles(() => ({
  root: {
    colorPrimary: '#e8eaf6',
    barColorPrimary: '#03a9f4'
  },
  reasonField: {}
}));

const ProjectInfo = ({ projectDetails }) => {
  const classes = useStyles();

  const { siteNames } = mainConfig.globalData;

  const {
    name,
    description,
    theme,
    date_added,
    latitude,
    longitude,
    area,
    initiated_by,
    // Assignees
    field_officer,
    county_manager,
    is_active,
    delete_reason,
    deleted,
    deleted_by
  } = projectDetails;

  const { data: user } = useUser();

  // debugger;

  let rows = [
    {
      name: 'Name',
      value: name || ''
    },
    {
      name: 'Theme',
      value: theme?.name || ''
    },
    // {
    //   name: 'Status',
    //   value:
    //     field_officer || county_manager ? (
    //       <PendingChip label="In Progress" />
    //     ) : (
    //       <FailureChip label="Not assigned" />
    //     )
    // },
    {
      name: 'Date added',
      value: moment(date_added).format('lll')
    },
    {
      name: 'Controlled By',
      value: initiated_by
    },
    {
      name: 'Longitude',
      value: longitude
    },
    {
      name: 'Latitude',
      value: latitude
    },
    {
      name: 'Region',
      value: area && `${area.region}`
    },
    {
      name: 'County',
      value: area && `${area.county}`
    },
    {
      name: 'Status',
      value: is_active ? (
        <SuccessChip label="Active" />
      ) : (
        <FailureChip label="Inactive" />
      )
    }
  ];

  // Displayed only when project is inactive
  if (!is_active) {
    rows = [
      ...rows,
      {
        name: 'Date Discontinued',
        value: deleted && moment(deleted).format('lll')
      },
      {
        name: 'Action By',
        value: user?.attributes.staff_number
      },
      {
        name: 'Reason for Discontinuation',
        value: (
          <ReactQuill
            value={delete_reason || ''}
            modules={{ toolbar: false }}
            readOnly
          />
        ),
        isReasonField: true
      }
    ];
  }

  return (
    <DetailsDisplay data={rows} title={`${siteNames.Project.name} Info`} />
  );
};

ProjectInfo.propTypes = {
  projectDetails: PropTypes.object
};

export default ProjectInfo;

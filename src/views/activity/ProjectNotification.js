import React from 'react';
/* eslint-disable */
import { makeStyles } from '@material-ui/core';
import NotificationsDisplay from './NotificationsDisplay';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const ProjectNotification = ({ notifications = [] }) => {
  return (
    <NotificationsDisplay
      title="Project Notifications"
      notifications={notifications}
    />
  );
};

export default ProjectNotification;

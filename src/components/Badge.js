import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2)
    }
  }
}));

const defaultProps = {
  color: 'secondary',
  children: <NotificationsIcon />
};

/* eslint-disable */
export default function BadgeComponent({ total }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Badge badgeContent={total} {...defaultProps} />
    </div>
  );
}

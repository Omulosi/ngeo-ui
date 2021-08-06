import React from 'react';
/* eslint-disable */
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  // Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const SummaryCard = ({ className, count, label, icon = null }) => {
  const classes = useStyles();

  if (!icon) {
    icon = <PeopleIcon />;
  }

  return (
    <Card className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {label}
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {count}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>{icon}</Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

SummaryCard.propTypes = {
  className: PropTypes.string
};

export default SummaryCard;

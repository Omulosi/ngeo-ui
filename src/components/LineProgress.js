import React from 'react';
import { LinearProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    colorPrimary: '#e8eaf6',
    barColorPrimary: '#03a9f4'
  }
}));

const LineProgress = () => {
  const classes = useStyles();

  return <LinearProgress className={classes.root} />;
};

export default LineProgress;

import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  controls: {
    position: ''
  }
});
/* eslint-disable */
const Controls = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.controls}>{children}</div>;
};

export default Controls;

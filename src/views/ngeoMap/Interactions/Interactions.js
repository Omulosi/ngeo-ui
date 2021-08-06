import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  interactions: {}
});

/* eslint-disable */
const Interactions = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.interactions}>{children}</div>;
};

export default Interactions;

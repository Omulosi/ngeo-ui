import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(() => ({
  root: {
    height: '20px',
    padding: '4px 0px',
    fontSize: '85%',
    backgroundColor: 'rgb(255, 152, 0)',
    color: 'rgb(255, 255, 255)'
  }
}));

export default function PendingChip({ label }) {
  const classes = useStyles();

  return <Chip size="small" label={label} className={classes.root} />;
}

PendingChip.propTypes = {
  label: PropTypes.string
};

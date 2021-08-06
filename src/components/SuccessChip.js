import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(() => ({
  root: {
    height: '20px',
    padding: '4px 0px',
    fontSize: '85%',
    backgroundColor: 'rgb(76, 175, 80)',
    color: 'rgb(255, 255, 255)',
    letterSpacing: '1px'
  }
}));

export default function SuccessChip({ label }) {
  const classes = useStyles();

  return <Chip size="small" label={label} className={classes.root} />;
}

SuccessChip.propTypes = {
  label: PropTypes.string
};

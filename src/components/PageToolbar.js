import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
/* eslint-disable */
import { Box, Divider, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  header: {
    color: 'rgba(0, 0, 0, 0.87)'
  }
}));

const Toolbar = ({ className, title, children, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="space-between">
        <Typography color="primary" variant="h3" className={classes.header}>
          {title}
        </Typography>
        {children}
      </Box>
      <Divider className={classes.divider} />
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;

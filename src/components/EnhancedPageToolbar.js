import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
/* eslint-disable */
import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import Button from './Button';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  btn: {
    textTransform: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#376fd0'
  },
  header: {
    color: 'rgba(0, 0, 0, 0.87)'
  },
  children: {}
}));

const EnhancedPageToolbar = ({
  className,
  btnTitle,
  pageTitle,
  navLink,
  btnIcon,
  btnDisabled,
  children,
  ...rest
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="space-between">
        <Typography color="primary" variant="h3" className={classes.header}>
          {pageTitle}
        </Typography>
        <div className={classes.children}>{children}</div>
      </Box>
      <Divider className={classes.divider} />
    </div>
  );
};

EnhancedPageToolbar.propTypes = {
  className: PropTypes.string
};

export default EnhancedPageToolbar;

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
  }
}));

const Toolbar = ({
  className,
  btnTitle,
  pageTitle,
  navLink,
  btnIcon,
  btnDisabled,
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
        {btnTitle && (
          <Button
            color="primary"
            variant="contained"
            className={classes.btn}
            disabled={btnDisabled}
            onClick={() => {
              navigate(`${navLink}`);
              if (btnTitle.toLocaleLowerCase().includes('threat')) {
                // Event handled in src/views/ngeoMap/SideDrawer
                window.mapSidebarOpen = true;
              }
            }}
          >
            {btnIcon} {btnTitle}
          </Button>
        )}
      </Box>
      <Divider className={classes.divider} />
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;

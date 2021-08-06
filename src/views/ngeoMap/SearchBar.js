import React, { useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
/* eslint-disable */
import { AppBar, Box, Toolbar, fade, makeStyles } from '@material-ui/core';
import MapContext from './Map/MapContext';
import GeoSearch from './GeoSearch';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '8vh'
  },
  avatar: {
    width: 60,
    height: 60
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    marginBottom: theme.spacing(2),
    right: '45%',
    width: '400px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));

const SearchBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  const { map } = useContext(MapContext);

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <GeoSearch />
      </Toolbar>
    </AppBar>
  );
};

SearchBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default SearchBar;

import React from 'react';
/* eslint-disable */
import { Container, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Page from 'src/components/Page';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles((theme) => ({
  root: {},
  gridWrapper: {
    height: '75vh',
    minWidth: '100%'
  },
  grid: {},
  dark: {
    color: '#263238',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#263238'
    }
  },
  actionItem: {
    display: 'flex',
    justifyContent: 'space-betweeb',
    alignItems: 'center'
  },
  viewAction: {
    marginLeft: '0.7rem'
  }
}));

const DataGridDisplay = ({ data, title }) => {
  const classes = useStyles();
  return (
    <PerfectScrollbar>
      <div className={classes.gridWrapper}>
        <DataGrid
          {...data}
          components={{
            Toolbar: GridToolbar
          }}
          showToolbar
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          checkboxSelection
          density="standard"
          className={classes.grid}
        />
      </div>
    </PerfectScrollbar>
  );
};

DataGridDisplay.propTypes = {
  /*
    data object must have the fields 'row and 'column'
     */
  data: PropTypes.object
};

export default DataGridDisplay;

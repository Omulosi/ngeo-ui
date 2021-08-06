import * as React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import ScrollBar from 'react-perfect-scrollbar';
import customCheckbox from '../theme/customCheckbox';
import CustomPagination from './CustomPagination';
import DataGridToolbar from './DataGridToolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    border: 0,
    backgroundColor: '#fff',
    color:
      theme.palette.type === 'dark'
        ? 'rgba(0,0,0,.85)'
        : 'rgba(255,255,255,0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiIconButton-root': {
      color: '#fff'
    },
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.type === 'dark' ? '#fafafa' : '#1d1d1d'
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none'
    },
    '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
      borderRight: `1px solid ${
        theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
      }`
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `1px solid ${
        theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
      }`
    },
    '& .MuiDataGrid-cell': {
      color:
        theme.palette.type === 'light'
          ? 'rgba(0,0,0,.85)'
          : 'rgba(255,255,255,0.65)'
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0
    },
    ...customCheckbox(theme)
  },
  gridWrapper: {
    height: '75vh',
    width: 'auto'
  },
  toolbar: {
    marginBottom: theme.spacing(3)
  },
  gridToolbar: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const CustomToolbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.gridToolbar}>
      <GridToolbar />
    </div>
  );
};

/* eslint-disable */
const ResultGrid = ({ data, title = 'Add Item' }) => {
  const classes = useStyles();

  return (
    <Container maxWidth={false}>
      <div className={classes.toolbar}>
        <DataGridToolbar title={title} />
      </div>
      <ScrollBar>
        <div className={classes.gridWrapper}>
          <DataGrid
            {...data}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            checkboxSelection={true}
            className={classes.root}
            showToolbar
            components={{
              Toolbar: CustomToolbar,
              Pagination: CustomPagination
            }}
          />
        </div>
      </ScrollBar>
    </Container>
  );
};

ResultGrid.propTypes = {
  data: PropTypes.object
};

export default ResultGrid;

import React from 'react';
import {
  Divider,
  Paper,
  TableContainer,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableRow,
  makeStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles({
  table: {},
  title: {
    padding: '1em'
  },
  rowHeader: {
    fontWeight: 500
  },
  rowBody: {
    // fontWeight: 400,
    color: 'rgb(107, 119, 140)'
  },
  area: {
    backgroundColor: 'rgba(76, 175, 80, 0.08)',
    color: '#4caf50',
    padding: '0.3em 0.1em'
  },
  reasonField: {
    width: '100%'
  }
});

/*eslint-disable */
const DetailsDisplay = ({ data = [], title }) => {
  const classes = useStyles();

  return (
    <Paper elevation={1}>
      <div>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
      </div>
      <Divider />
      <TableContainer>
        <Table className={classes.table}>
          <TableBody>
            {data.map((row) =>
              row.isReasonField ? (
                <TableRow key={row.name}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.rowHeader}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ) : (
                <TableRow key={row.name}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.rowHeader}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="left" className={classes.rowBody}>
                    <span className={clsx(row.name == 'Area' && classes.area)}>
                      {row.name == 'Color' ? (
                        <div
                          style={{
                            backgroundColor: row.value,
                            width: '12px',
                            height: '12px'
                          }}
                        ></div>
                      ) : (
                        row.value
                      )}
                    </span>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

DetailsDisplay.propTypes = {
  /** array with {name: 'name',  value: 'value'}  objects*/
  data: PropTypes.array
};

export default DetailsDisplay;

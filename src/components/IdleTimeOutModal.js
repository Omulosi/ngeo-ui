import React from 'react';
/* eslint-disable */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { Divider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  formContent: {
    // backgroundColor: 'rgb(35, 48, 68)',
    borderRadius: '5px'
  },
  dialogContent: {
    marginBottom: theme.spacing(2)
  },
  header: {
    color: '#263228',
    fontSize: '1.5rem'
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  error: {
    textAlign: 'center'
  }
}));

export default function IdleTimeOutModal({
  showModal,
  handleClose,
  handleLogout
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">{'Session Timeout'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your session is about to timeout. Do you want to continue ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="secondary" onClick={handleLogout}>
            Logout
          </Button>
          <Button color="primary" onClick={handleClose}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

IdleTimeOutModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired
};

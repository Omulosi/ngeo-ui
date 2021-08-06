import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

const ThemeDialogForm = ({
  open,
  handleClose,
  theme,
  handleChange,
  switchState,
  handleSwitchChange,
  handleMutateTheme,
  title,
  contentText
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={theme?.name}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          {switchState && (
            <Tooltip title="Add multiple">
              <Switch
                checked={switchState.addMultiple}
                onChange={handleSwitchChange}
                value="addMultiple"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Tooltip>
          )}

          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleMutateTheme} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ThemeDialogForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  theme: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  switchState: PropTypes.object,
  handleSwitchChange: PropTypes.func,
  handleMutateTheme: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  contentText: PropTypes.string.isRequired
};

export default ThemeDialogForm;

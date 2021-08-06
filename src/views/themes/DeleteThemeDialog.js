import React from 'react';
import PropTypes from 'prop-types';
import AlertDialog from 'src/components/AlertDialog';

const DeleteThemeDialog = ({
  open,
  deleteThemeHandler,
  closeDialogHandler,
  theme
}) => {
  const handleClose = () => {
    closeDialogHandler();
  };

  // eslint-disable-next-line no-unused-vars
  const handleDelete = (evt) => {
    deleteThemeHandler({ ...theme });
  };

  return (
    <AlertDialog
      title="Delete Theme"
      message="Are you sure you want to delete this theme?"
      open={open}
      handleDialogClose={handleClose}
      handleSubmit={handleDelete}
    />
  );
};

DeleteThemeDialog.propTypes = {
  deleteThemeHandler: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  closeDialogHandler: PropTypes.func.isRequired,
  theme: PropTypes.object
};

export default DeleteThemeDialog;

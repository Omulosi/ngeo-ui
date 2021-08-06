import React from 'react';
import PropTypes from 'prop-types';
import ThemeDialogForm from 'src/components/ThemeDialogForm';

const EditThemeDialog = ({
  editThemeHandler,
  open,
  closeDialogHandler,
  theme,
  setTheme
}) => {
  const handleClose = () => {
    closeDialogHandler();
  };

  const handleEdit = () => {
    editThemeHandler({ ...theme });
  };

  const handleChange = (name) => ({ target: { value } }) => {
    setTheme({ ...theme, [name]: value });
  };

  return (
    <ThemeDialogForm
      open={open}
      theme={theme}
      handleClose={handleClose}
      handleChange={handleChange('name')}
      handleMutateTheme={handleEdit}
      title="Edit Theme"
      contentText="Update theme name"
    />
  );
};

EditThemeDialog.propTypes = {
  editThemeHandler: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  closeDialogHandler: PropTypes.func.isRequired,
  theme: PropTypes.object,
  setTheme: PropTypes.func.isRequired
};

export default EditThemeDialog;

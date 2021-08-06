import React, { useState } from 'react';
import PropTypes from 'prop-types';
import generateRandomColor from 'src/utils/generateRandomColor';
import ThemeDialogForm from 'src/components/ThemeDialogForm';

const initialTheme = {
  name: ''
};

const AddThemeDialog = ({
  addThemeHandler,
  open,
  setOpen,
  closeDialogHandler
}) => {
  const [theme, setTheme] = useState(initialTheme);

  const [switchState, setSwitchState] = React.useState({
    addMultiple: false
  });

  const handleSwitchChange = (name) => (event) => {
    setSwitchState({ ...switchState, [name]: event.target.checked });
  };

  const resetSwitch = () => {
    setSwitchState({ addMultiple: false });
  };

  const handleClose = () => {
    closeDialogHandler();
    resetSwitch();
  };

  const handleAdd = () => {
    addThemeHandler({ ...theme, color: generateRandomColor() });
    setTheme(initialTheme);
    // eslint-disable-next-line no-unused-expressions
    switchState.addMultiple ? setOpen(true) : setOpen(false);
  };

  const handleChange = (name) => ({ target: { value } }) => {
    setTheme({ ...theme, [name]: value });
  };

  // theme, handlechange, handleSwitchChange, handleClose, handleEdit
  return (
    <ThemeDialogForm
      open={open}
      theme={theme}
      handleClose={handleClose}
      handleChange={handleChange('name')}
      switchState={switchState}
      handleSwitchChange={handleSwitchChange('addMultiple')}
      handleMutateTheme={handleAdd}
      title="New Theme"
      contentText="Add a new theme"
    />
  );
};

AddThemeDialog.propTypes = {
  addThemeHandler: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  closeDialogHandler: PropTypes.func.isRequired
};

export default AddThemeDialog;

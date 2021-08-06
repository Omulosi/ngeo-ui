/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

/* eslint-disable */
const ComboBox = ({
  multiple,
  groupBy,
  label,
  value,
  onChange,
  options,
  name,
  disabled,
  variant
}) => {
  return (
    <Autocomplete
      id="combo-box"
      disabled={disabled}
      multiple={multiple}
      value={value}
      onChange={onChange}
      options={options ? options : [{ name: '' }]}
      groupBy={groupBy}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={name}
          variant={variant || 'outlined'}
        />
      )}
    />
  );
};

ComboBox.propTypes = {
  label: PropTypes.string,
  data: PropTypes.object
};

export default ComboBox;

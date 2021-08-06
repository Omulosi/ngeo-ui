/* eslint-disable */
import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function AsynchronousComboBox({
  options,
  label,
  loading,
  value,
  onChange,
  name,
  multiple,
  groupBy,
  disabled,
  isRequired,
  variant
}) {
  return (
    <Autocomplete
      id="asynchronous-combo-box"
      disabled={disabled}
      multiple={multiple}
      getOptionLabel={(option) => option.name}
      options={options}
      groupBy={groupBy}
      loading={loading}
      onChange={onChange}
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          required={isRequired}
          label={label}
          name={name}
          variant={variant || 'outlined'}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  );
}

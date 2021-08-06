import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  FormHelperText
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import ComboBox from './ComboBox';

/* eslint-disable */
const useStyles = makeStyles(() => ({
  root: {},
  info: {
    textAlign: 'left',
    color: 'blue',
    padding: '1em'
  },
  error: {
    textAlign: 'left',
    color: 'red',
    padding: '1em'
  }
}));

const AssignResource = ({
  title,
  fieldLabel,
  resourceList,
  data, // What is being assigned
  action,
  setRole,
  disabled
}) => {
  const [value, setValue] = React.useState(null);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (value !== null) {
      // dispatch(
      //   action({ resourceId: value.id, data }, enqueueSnackbar, setValue)
      // );
      action.mutate({ resourceId: value.id, data });
      // window.location.reload();
      if (setRole) {
        setRole(value.id);
      }
    } else {
      enqueueSnackbar('Please select a value first', {
        variant: 'warning',
        anchorOrigin: { horizontal: 'center', vertical: 'top' }
      });
    }

    if (action.isSuccess) {
      setValue(null);
    }
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root)}
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader title={title} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <ComboBox
                label={fieldLabel}
                data={resourceList}
                value={value}
                setValue={setValue}
                groupBy={(option) => option.county}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <FormHelperText className={classes.info}>
          {resourceList.length > 0
            ? ''
            : `You currently have no available ${fieldLabel.toLowerCase()}s`}
        </FormHelperText>
        <FormHelperText className={classes.error}>
          {disabled ? 'Activation needed first' : ''}
        </FormHelperText>
        <Box display="flex" justifyContent="flex-start" p={2}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={disabled}
          >
            Submit
          </Button>
        </Box>
      </Card>
    </form>
  );
};

AssignResource.propTypes = {
  title: PropTypes.string,
  fieldLabel: PropTypes.string,
  /**
   * An array of objects.
   * Each object must have a key named 'id',
   * and a corresponding value named 'name'
   */
  resourceList: PropTypes.array,
  assigneeId: PropTypes.string,
  action: PropTypes.func
};

export default AssignResource;

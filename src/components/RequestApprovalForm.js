import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  FormHelperText,
  TextField
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
  }
}));

const RequestApprovalForm = ({
  title,
  subTitle,
  fieldLabel,
  resourceList,
  data,
  sender,
  action,
  pendingApproval,
  isAgentActive
}) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      reason: '',
      resource: ''
    },
    onSubmit: (values, { setSubmitting }) => {
      action.mutate({ ...values, data, sender });
    }
  });

  const handleChange = (value) => {
    formik.setFieldValue(
      'resource',
      value !== null ? value : formik.initialValues.resourceId
    );
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root)}
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader title={title} subheader={subTitle} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <ComboBox
                label={fieldLabel}
                name="resource"
                value={formik.values.resource}
                data={resourceList}
                setValue={(e, value) => {
                  handleChange(e, value);
                }}
                // onChange={(e, value) => {
                //   handleChange(e, value);
                // }}
              />
            </Grid>

            {false && (
              <Grid item md={12} xs={12}>
                <TextField
                  id="standard-multiline-static"
                  label="Reason"
                  multiline
                  rows={4}
                  name="reason"
                  value={formik.values.reason}
                  onChange={formik.handleChange}
                  variant="outlined"
                  style={{ width: '100%' }}
                />
              </Grid>
            )}
          </Grid>
        </CardContent>
        <Divider />
        <FormHelperText className={classes.info}>
          {resourceList.length > 0
            ? ''
            : `You currently have no available ${fieldLabel.toLowerCase()}s to assign`}
        </FormHelperText>
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={isAgentActive || pendingApproval}
          >
            {isAgentActive
              ? 'Activated'
              : pendingApproval
              ? 'Request Pending...'
              : 'Request Activation'}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

RequestApprovalForm.propTypes = {
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

export default RequestApprovalForm;

import React from 'react';
/* eslint-disable */
import clsx from 'clsx';
// import PropTypes from 'prop-types';
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
  FormHelperText
} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const useStyles = makeStyles((theme) => ({
  root: {},
  info: {
    textAlign: 'left',
    color: 'blue',
    padding: '1em'
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: 'blue'
  },
  icon: {
    marginRight: '0.5em'
  }
}));

const ActivateResource = ({
  resourceUrl,
  action,
  title,
  disabled,
  pendingApproval
}) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values, { setSubmitting, resetForm }) => {
      action.mutate({ url: resourceUrl, is_active: true });
      console.log('activated');
    }
  });

  return (
    <Card>
      <CardHeader title={`${title}`} />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <form
            autoComplete="off"
            noValidate
            className={clsx(classes.root)}
            onSubmit={formik.handleSubmit}
          >
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<LockOpenIcon />}
                type="submit"
                disabled={disabled || pendingApproval}
              >
                {pendingApproval ? 'Request Pending' : 'Activate'}
              </Button>
            </Box>
            <FormHelperText className={classes.info}></FormHelperText>
          </form>
        </Grid>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default ActivateResource;

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
import { useActivateUser } from 'src/hooks/user';

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

const ActivateUser = ({ resourceUrl }) => {
  const classes = useStyles();
  const activateUser = useActivateUser();

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values, { setSubmitting, resetForm }) => {
      activateUser.mutate({ url: resourceUrl, is_active: true });
    }
  });

  return (
    <Card>
      <CardHeader title="Permissions" />
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
              >
                Activate User
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

export default ActivateUser;

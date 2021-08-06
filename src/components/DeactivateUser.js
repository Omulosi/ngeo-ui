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
import DeleteIcon from '@material-ui/icons/Delete';
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
    backgroundColor: 'rgb(244, 67, 54)'
  },
  icon: {
    marginRight: '0.5em'
  }
}));

const DeactivateUser = ({ resourceUrl, action, title, btnTitle }) => {
  const classes = useStyles();
  const activateUser = useActivateUser();

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      activateUser.mutate({ url: resourceUrl, is_active: false });
    }
  });

  return (
    <Card>
      <CardHeader title={title} />
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
                type="submit"
                className={classes.button}
                startIcon={<DeleteIcon />}
              >
                {btnTitle}
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

export default DeactivateUser;

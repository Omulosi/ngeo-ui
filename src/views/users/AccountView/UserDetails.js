import React, { useState } from 'react';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { roleNames } from 'src/config';
import capitalize from 'src/utils/capitalize';

const useStyles = makeStyles(() => ({
  root: {}
}));

/* eslint-disable */
const ProfileDetails = ({ className, profileDetails = {}, ...rest }) => {
  const { first_name, last_name, email, staff_number, role } = profileDetails;

  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [values, setValues] = useState({
    firstName: (first_name && capitalize(first_name)) || '',
    lastName: (last_name && capitalize(last_name)) || '',
    email: email || '',
    staffNumber: staff_number || '',
    role: roleNames[role] || ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    enqueueSnackbar('Profile updated!', { variant: 'success' });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      onSubmit={(e) => handleSubmit(e)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="" title="Profile Info" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Staff Number"
                name="staffNumber"
                onChange={handleChange}
                required
                value={values.staffNumber}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Role"
                name="role"
                onChange={handleChange}
                required
                value={values.role}
                variant="outlined"
              />
            </Grid>
            {/**
              <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="ID Number"
                name="idNumber"
                onChange={handleChange}
                required
                value={values.idNumber}
                variant="outlined"
              />
            </Grid>
            
            */}
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" type="submit" disabled>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
  profileDetails: PropTypes.object
};

export default ProfileDetails;

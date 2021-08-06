import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
import UserDetails from './UserDetails';

const Profile = ({ user }) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <UserInfo profileDetails={user} />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <UserDetails profileDetails={user} />
        </Grid>
      </Grid>
    </>
  );
};

Profile.propTypes = {
  user: PropTypes.object
};

export default Profile;

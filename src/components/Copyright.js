import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import mainConfig from 'src/config/config.json';

/* eslint-disable */
function Copyright() {
  const { globalData } = mainConfig;
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{ padding: '2em' }}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        {globalData.appName}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;

import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';

const Loading = () => {
  return (
    <Backdrop open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;

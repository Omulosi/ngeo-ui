import React from 'react';

import { ListItem, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  checkbox: {
    marginRight: '0.5em'
  },
  checkboxName: {
    fontSize: '0.9rem'
  }
});

// eslint-disable-next-line react/prop-types
const CustomListItem = ({ children, name, hide }) => {
  const classes = useStyles();

  if (hide) {
    return null;
  }

  return (
    <ListItem button className={classes.layerItem}>
      <span className={classes.checkbox}>{children}</span>
      <span className={classes.checkboxName}>{name}</span>
    </ListItem>
  );
};

export default CustomListItem;

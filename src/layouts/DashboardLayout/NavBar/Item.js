import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Tooltip
} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(() => ({
  item: {
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: 'rgba(0,0,0,0.04)'
    }
  },
  hide: {
    display: 'none'
  },
  dropdown: {},
  listItem: {
    color: 'rgb(238,238,238)',
    '& .MuiTypography-body1': {
      fontSize: '0.85rem'
    }
  }
}));

/* eslint-disable */
const NavItem = ({ href, icon: Icon, title, name, items, className }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  const NavItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div">
        {items.map((item, index) => (
          <NavItem
            {...item}
            key={index}
            className={item.visible ? null : classes.hide}
          />
        ))}
      </List>
    </Collapse>
  ) : null;

  return (
    <Tooltip title={`${name}`} placement="right">
      <div>
        <ListItem
          onClick={() => {
            isExpandable ? handleClick() : navigate(href);
          }}
          className={clsx(classes.item, className)}
        >
          <ListItemIcon onClick={() => handleClick()}>
            {Icon && <Icon />}
          </ListItemIcon>
          <ListItemText primary={title} className={classes.listItem} />
          {/* Display the expand menu if the item has children */}
          {isExpandable && !open && <IconExpandMore />}
          {isExpandable && open && <IconExpandLess />}
        </ListItem>
        {NavItemChildren}
      </div>
    </Tooltip>
  );
};

NavItem.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
  items: PropTypes.array
};

export default NavItem;

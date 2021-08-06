import React from 'react';
import {
  Badge,
  List,
  ListItemText,
  ListItem,
  ListItemAvatar
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import moment from 'moment';

/* eslint-disable */
const SidebarInfo = ({ user, notifications, className }) => {
  return (
    <List component="nav" className={className} aria-label="activity summary">
      <ListItem button divider>
        <ListItemText
          primary="Last login"
          secondary={user && moment(user.last_login).fromNow()}
        />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Inbox" />
        <ListItemAvatar>
          <Badge badgeContent={notifications.length} color="primary">
            <MailIcon />
          </Badge>
        </ListItemAvatar>
      </ListItem>
    </List>
  );
};

export default SidebarInfo;

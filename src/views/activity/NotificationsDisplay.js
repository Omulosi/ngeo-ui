import React from 'react';
/* eslint-disable */
import clsx from 'clsx';
// import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
// import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  //   TableHead,
  TableRow,
  //   TableSortLabel,
  //   Tooltip,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useNavigate } from 'react-router';
import ApproveDialog from './ApproveDialog';
import { useFOO } from 'src/hooks/permissions';
import { markNotificationRead } from 'src/redux/actions/notificationAction';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  },
  row: {
    cursor: 'pointer',
    width: '100%',
    backgroundColor: '#F4F6F8'
  },
  unread: {
    backgroundColor: '#fff'
  },
  circle: {
    width: '8px !important',
    height: '8px !important',
    backgroundColor: '#0366d6 !important',
    borderRadius: '50%'
  }
}));

const NotificationsDisplay = ({ title, notifications, className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [allNotifications, setAllNotifications] = React.useState([]);
  const [unreadNotifications, setUnreadNotifications] = React.useState([]);
  const [showAll, setShowAll] = React.useState(true);
  const [showUnread, setShowUnread] = React.useState(false);

  React.useEffect(() => {
    let unread = notifications.filter((n) => n.unread === true);
    setAllNotifications([...notifications]);
    setUnreadNotifications(unread);
  }, [notifications]);

  // list of dialog states for each notification
  const [openList, setOpenList] = React.useState(
    notifications.map((_) => false)
  );

  const handleUnread = () => {
    setShowAll(false);
    setShowUnread(true);
  };

  const handleAll = () => {
    setShowAll(true);
    setShowUnread(false);
  };

  const handleDialogOpen = (i) => {
    openList[i] = true;
    setOpenList([...openList]);
  };

  // Closing dialog marks notification as read
  const handleDialogClose = (e, i, notification) => {
    openList[i] = false;
    setOpenList([...openList]);
    e.stopPropagation();

    dispatch(
      markNotificationRead({
        notification: notification.id
      })
    );
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title={title} />
      <div>
        <Button color="primary" onClick={handleAll}>
          All
        </Button>
        <Button color="primary" onClick={handleUnread}>
          Unread
        </Button>
      </div>
      <Divider />
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableBody>
              {showAll &&
                allNotifications.map((notification, i) => (
                  <TableRow
                    hover
                    className={clsx(
                      classes.row,
                      notification.unread && classes.unread
                    )}
                    key={notification.id}
                    onClick={() => handleDialogOpen(i)}
                  >
                    <TableCell>
                      <div className={notification.unread && classes.circle} />
                    </TableCell>
                    <TableCell>{notification.message}</TableCell>
                    <TableCell>{notification.createdAt}</TableCell>
                    <TableCell>
                      <ApproveDialog
                        ind={i}
                        open={openList[i]}
                        handleDialogClose={(e) =>
                          handleDialogClose(e, i, notification)
                        }
                        notification={notification}
                      />
                    </TableCell>
                  </TableRow>
                ))}

              {showUnread &&
                unreadNotifications.map((notification, i) => (
                  <TableRow
                    hover
                    className={clsx(
                      classes.row,
                      notification.unread && classes.unread
                    )}
                    key={notification.id}
                    onClick={() => handleDialogOpen(i)}
                  >
                    <TableCell>
                      <div className={notification.unread && classes.circle} />
                    </TableCell>
                    <TableCell>{notification.message}</TableCell>
                    <TableCell>{notification.createdAt}</TableCell>
                    <TableCell>
                      <ApproveDialog
                        ind={i}
                        open={openList[i]}
                        handleDialogClose={(e) =>
                          handleDialogClose(e, i, notification)
                        }
                        notification={notification}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

// NotificationsDisplay.propTypes = {
//   className: PropTypes.string,
//   title: PropTypes.string
// };

export default NotificationsDisplay;

import React from 'react';
// import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { IconButton } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
// import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CssBaseline from '@material-ui/core/CssBaseline';

const drawerWidth = 370;

const useStyles = makeStyles((theme) => ({
  content: {
    padding: '0 5px'
  },
  menu: {
    position: 'absolute',
    top: '.7em',
    right: '.8em',
    zIndex: 1110,
    width: '37px !important',
    height: '37px !important',
    lineHeight: '34px !important',
    borderRadius: '4px !important',
    color: '#5d5d5d !important',
    background:
      'linear-gradient( to bottom, rgba(255, 255, 255, 1) 0%, rgba(229, 229, 229, 1) 100% )',
    boxShadow: '0px 0px 5px 0px rgb(80 80 80 / 69%)',
    cursor: 'pointer',
    userSelect: 'none',
    fontFamily: 'verdana, helvetica'
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    whiteSpace: 'wrap',
    fontSize: '13px',
    color: 'rgb(238,238,238)',
    backgroundColor: 'rgb(35, 48, 68)',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    '& .MuiSvgIcon-root': {
      fill: 'rgb(238,238,238)',
      opacity: 0.5
    },
    '& svg': {
      fill: 'rgb(238,238,238)',
      opacity: 0.5
    }
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-start'
  },
  thumbVertical: {
    backgroundColor: 'rgb(238,238,238)',
    borderRadius: 6
  }
}));

// eslint-disable-next-line react/prop-types
export default function SideDrawer({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false || window.mapSidebarOpen);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <>
        <IconButton
          className={classes.menu}
          color="primary"
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <CssBaseline />
        <Drawer
          anchor="right"
          variant="persistent"
          open={open}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>

          <Scrollbars
            renderThumbVertical={(props) => (
              <div {...props} className={classes.thumbVertical} />
            )}
          >
            <div className={classes.content}>{children}</div>
          </Scrollbars>
        </Drawer>
      </>
    </div>
  );
}

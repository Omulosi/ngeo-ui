import React from 'react';
import clsx from 'clsx';
/* eslint-disable */
import {
  Typography,
  makeStyles,
  Avatar,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'src/redux/actions/authActions';
import { roleNames } from 'src/config';
import { Scrollbars } from 'react-custom-scrollbars';
import capitalize from 'src/utils/capitalize';
import { roles } from 'src/config';
import useFieldOfficer from 'src/hooks/field_officers';
import useCountyManager from 'src/hooks/county_managers';
import useRegionalManager from 'src/hooks/regional_managers';
import getArea from 'src/utils/getArea';
import mainConfig from 'src/config/config.json';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    fontSize: '13px'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '65px',
    padding: '0 24px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'wrap',
    fontSize: '13px',
    color: 'rgb(238,238,238)',
    backgroundColor: 'rgb(35, 48, 68)',
    width: drawerWidth,
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
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  },
  profile: {
    padding: '12px 24px',
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column'
  },
  gutter: {
    paddingTop: '16px',
    paddingBottom: '8px'
  },
  logo: {
    fontWeight: 'bold',
    letterSpacing: '1px',
    fontSize: '1.2rem'
  },
  authBtn: {
    fontSize: '0.9em',
    cursor: 'pointer',
    fontWeight: 600
  },
  menuButton: {
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    cursor: 'pointer',
    paddingBottom: '8px',
    paddingTop: '16px',
    marginBottom: 0,
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: 'rgba(0,0,0,0.04)'
    }
  },
  thumbVertical: {
    backgroundColor: 'rgb(238,238,238)',
    borderRadius: 6
  },
  area: {
    color: '#4caf50',
    backgroundColor: 'rgba(76, 175, 80, 0.08)',
    padding: '0.2em 0.1em'
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function DrawerComponent({ profileData = {}, children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [areaOpen, setAreaOpen] = React.useState(false);

  const { sidebarMenu, globalData } = mainConfig;

  const handleClick = () => {
    setAreaOpen(!areaOpen);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  let user = {};
  if (profileData) {
    user = {
      ...profileData,
      name: capitalize(`${profileData.first_name} ${profileData.last_name}`)
    };
  }

  let { data: fieldOfficer, error: fooError } = useFieldOfficer();
  let { data: countyManager, error: cmError } = useCountyManager();
  let { data: regionalManager, error: rmError } = useRegionalManager();

  const areas = getArea({
    user,
    roles,
    countyManager,
    fieldOfficer,
    regionalManager
  });

  // debugger;

  // Section with user info details
  const userBox = user.isAuthenticated ? (
    <div className={clsx(classes.profile)}>
      <Avatar>{user && user.name ? user.name.charAt(0) : 'A'}</Avatar>
      <Typography variant="body2" className={classes.gutter}>
        {user.name}
      </Typography>
      <Typography variant="body2" style={{ paddingBottom: '4px' }}>
        {user.email}
      </Typography>
      <Typography variant="body2" style={{ paddingBottom: '4px' }}>
        {roleNames[user.role]}
      </Typography>

      {areas &&
        areas.map((area) => (
          <Typography variant="p">
            <List dense className={classes.area}>
              <ListItem button onClick={handleClick}>
                <ListItemText
                  primary={`${
                    area.type == 'Constituency' ? 'Sub County' : area.type
                  }(s) `}
                ></ListItemText>
                {areaOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={areaOpen} timeout="auto" unmountOnExit>
                <List dense component="div" disablePadding>
                  {area.name.split(',').map((name) => (
                    <ListItem button className={classes.nested}>
                      <ListItemText primary={`${name} `} />{' '}
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </List>
          </Typography>
        ))}

      <Typography
        style={{ color: '#1a73e8', paddingTop: '0.3em' }}
        variant="body2"
        className={classes.authBtn}
      >
        <span onClick={() => dispatch(logout(navigate))}>Sign out</span>
      </Typography>
    </div>
  ) : (
    <div className={classes.profile}>
      <Typography
        style={{ color: '#1a73e8', paddingTop: '0.3em' }}
        variant="body2"
        className={classes.authBtn}
      >
        <span onClick={() => navigate('/login')}>Sign in</span>
      </Typography>
    </div>
  );

  // Menu button for toggling drawer open close
  const menuButton = (
    <Tooltip title="menu" placement="right">
      <ListItem className={classes.menuButton}>
        <ListItemIcon
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </ListItemIcon>
      </ListItem>
    </Tooltip>
  );

  // Button for closing drawer
  const menuToolbar = (
    <div className={classes.toolbarIcon}>
      <div className={classes.logo}>{globalData.appName}</div>
      <IconButton onClick={handleDrawerClose}>
        <ChevronLeftIcon style={{ fill: 'rgb(238,238,238)' }} />
      </IconButton>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        {open ? null : menuButton}
        {open ? menuToolbar : null}
        {open ? userBox : null}
        {open ? (
          <Divider style={{ backgroundColor: 'rgb(238,238,238)' }} />
        ) : null}
        <Scrollbars
          renderThumbVertical={(props) => (
            <div {...props} className={classes.thumbVertical} />
          )}
        >
          {children}
        </Scrollbars>
      </Drawer>
    </div>
  );
}

DrawerComponent.propTypes = {
  children: PropTypes.any,
  user: PropTypes.object
};

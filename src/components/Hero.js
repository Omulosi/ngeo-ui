import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
// import { APP_NAME } from 'src/config';
import mainConfig from 'src/config/config.json';
import Button from './Button';
import Typography from './Typography';
import HeroLayout from './HeroLayout';
import bgImage from '../assets/images/Basemap_1.png';

const backgroundImage = bgImage;

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    animation: '300ms linear 0ms 1 normal both $zoomIn',
    animationDuration: '5000ms',
    animationIterationCount: 'infinite'
  },
  '@keyframes zoomIn': {
    '0%': {
      transform: 'scale(1.05)'
    },
    '100%': {
      transform: 'scale(1)'
    }
  },
  button: {
    minWidth: 200,
    backgroundColor: 'transparent',
    border: '2px solid #fff',
    color: theme.palette.common.white,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: theme.palette.common.white,
      color: '#1A73E8'
    }
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    fontSize: '1.8em',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(2)
    }
  },
  more: {
    marginTop: theme.spacing(2)
  },
  actionCall: {
    position: 'absolute',
    left: '5%',
    color: theme.palette.common.white
  },
  linkSecondary: {
    color: '#1A73E8'
  },
  heroTitle: {
    fontSize: '5em'
  }
});

function Hero(props) {
  const { classes } = props;
  const { globalData } = mainConfig;

  return (
    <HeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />

      <section className={classes.actionCall}>
        <Typography color="inherit" align="left" className={classes.heroTitle}>
          {globalData.appName}
        </Typography>
        <Typography
          color="inherit"
          align="left"
          variant="h5"
          className={classes.h5}
        >
          {globalData.appTagline}
        </Typography>
        <Button
          variant="contained"
          size="large"
          className={clsx(classes.button)}
          component="a"
          href="/c/map"
        >
          {`${globalData.appLaunchText} ${globalData.appName}`}
        </Button>
      </section>
    </HeroLayout>
  );
}

Hero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Hero);

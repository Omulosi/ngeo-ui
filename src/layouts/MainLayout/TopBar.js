// import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import clsx from 'clsx';
// import PropTypes from 'prop-types';
// import MuiAppBar from '@material-ui/core/AppBar';
// import { Toolbar, makeStyles, Button } from '@material-ui/core';
// import Logo from 'src/components/Logo';
// // import Button from 'src/components/Button';
// import { APP_NAME } from 'src/config';

// const useStyles = makeStyles({
//   root: {
//     backgroundColor: 'rgba(32, 33, 36, 0.5)',
//     transition: 'all 250ms ease-out',
//     animation: '1000ms ease 1000ms 1 normal both $moveDown',
//     animationDelay: '1500ms',
//     width: '100%',
//     position: 'fixed',
//     height: '65x',
//     borderBottom: '1px solid rgba(255,255,255,0.3)'
//   },
//   toolbar: {
//     display: 'flex'
//   },

//   '@keyframes moveDown': {
//     '0%': {
//       transform: 'translateY(-100%) translateZ(0)'
//     },
//     '100%': {
//       transform: 'translateY(0%) translateZ(0)'
//     }
//   },
//   btn: {
//     backgroundColor: '#1A73E8',
//     borderRadius: '2px',
//     color: '#fff',
//     marginLeft: 'auto',
//     cursor: 'pointer',
//     padding: '12px 24px',
//     fontSize: '1rem',
//     '&:hover': {
//       backgroundColor: '#1A73E8',
//       color: '#fff'
//     }
//   }
// });

// const TopBar = ({ className, ...rest }) => {
//   const classes = useStyles();

//   return (
//     <MuiAppBar
//       className={clsx(classes.root, className)}
//       elevation={0}
//       {...rest}
//     >
//       <Toolbar className={classes.toolbar}>
//         <RouterLink to="/">
//           <Logo />
//         </RouterLink>
//         <Button
//           variant="contained"
//           size="small"
//           className={classes.btn}
//           component="a"
//           href="/app/map"
//         >
//           Launch
//           {`${APP_NAME}`}
//         </Button>
//       </Toolbar>
//     </MuiAppBar>
//   );
// };

// TopBar.propTypes = {
//   className: PropTypes.string
// };

// export default TopBar;

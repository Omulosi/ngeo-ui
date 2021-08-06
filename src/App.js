import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import { ThemeProvider, Button } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { useIdleTimer } from 'react-idle-timer';
import { useDispatch } from 'react-redux';
import { logout } from 'src/redux/actions/authActions';
import IdleTimeOutModal from 'src/components/IdleTimeOutModal';
import GlobalStyles from 'src/components/GlobalStyles';

import theme from 'src/theme';
import routes from 'src/routes';
import mainConfig from 'src/config/config.json';
import { IDLE_TIMEOUT_IN_MINUTES } from 'src/config';
import Loading from './components/Loading';

const isLoggedIn = () => {
  return localStorage.getItem('token') !== null;
};

/* eslint-disable */
const App = () => {
  const [showModal, setShowModal] = React.useState(false);
  const routing = useRoutes(routes(isLoggedIn()));
  const notistackRef = React.createRef();

  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  window.mapControls = mainConfig.controls;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const timeout = 60 * 1000 * IDLE_TIMEOUT_IN_MINUTES;
  let logoutTimer = null;

  const handleOnActive = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      logoutTimer = null;
    }
  };

  const handleOnIdle = () => {
    if (isLoggedIn()) {
      setShowModal(true);
      logoutTimer = setTimeout(() => {
        setShowModal(false);
        dispatch(logout(navigate));
      }, 5 * 1000); // 5 seconds
    }
  };

  const { reset } = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle,
    crossTab: {
      emitOnAllTabs: true
    }
  });

  const handleStayLoggedIn = () => {
    reset();
    setShowModal(false);
  };

  const handleLogout = () => {
    setShowModal(false);
    dispatch(logout(navigate));
  };

  return (
    <React.Suspense fallback={<Loading />}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          ref={notistackRef}
          action={(key) => (
            <Button onClick={onClickDismiss(key)}>Dismiss</Button>
          )}
          maxSnack={2}
        >
          <GlobalStyles />
          <div id="portal-root" />
          <IdleTimeOutModal
            showModal={showModal}
            handleClose={handleStayLoggedIn}
            handleLogout={handleLogout}
          />
          {/* <React.Suspense fallback={<Loading />}>{routing}</React.Suspense> */}
          {routing}
        </SnackbarProvider>
      </ThemeProvider>
    </React.Suspense>
  );
};

export default App;

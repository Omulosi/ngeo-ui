import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
/* eslint-disable */
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Slide from '@material-ui/core/Slide';
import { useDispatch } from 'react-redux';
// import Alert from '@material-ui/lab/Alert';
import ReactQuill from 'react-quill';
import ApproveAgent from 'src/components/ApproveAgent';
import useHR, { useCM, useFOO } from 'src/hooks/permissions';
import { useNavigate } from 'react-router';
import CustomAlert from 'src/components/Alert';
import { markNotificationRead } from 'src/redux/actions/notificationAction';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  content: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.dark,
    height: '100%'
  },
  btn: {
    width: '200px',
    color: 'green',
    backgroundColor: '#fff'
  },
  message: {
    marginBottom: theme.spacing(1),
    backgroundColor: '#fff',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  reasonTitle: {}
}));

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function ApproveDialog({
  open,
  ind,
  handleDialogClose,
  notification
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFOO = useFOO();
  const isCM = useCM();
  const isHR = useHR();

  const agentApproved =
    notification.actor_type == 'field_officer' &&
    notification.data.is_approved == 'true';

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleDialogClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDialogClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}></Typography>
        </Toolbar>
      </AppBar>

      {/*notification.data.approval_reason ? (
        <Box className={classes.message}>
          <Typography variant="h5" align="center" gutterBottom>
            Reason for Approval
          </Typography>
          <ReactQuill value={notification.data.approval_reason} readOnly />
        </Box>
      ) : null*/}

      <Box className={classes.content}>
        <CustomAlert
          severity={
            notification.data?.is_denied === 'true'
              ? 'error'
              : notification.data?.is_approved === 'true'
              ? 'success'
              : 'info'
          }
          content={notification.message}
        />

        {/** Displayed on HR's welcome page. Navigates HR to page for activating registered user . */}
        {isHR && (
          <Box style={{ marginTop: '1em' }}>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classes.btn}
              onClick={() => {
                navigate(`/app/users/${notification.data.user_id}`, {
                  state: { from: 'notifications' }
                });

                dispatch(
                  markNotificationRead({
                    notification: notification.id
                  })
                );
              }}
            >
              Activate User
              <ArrowForwardIcon fontSize="small" />
            </Button>
          </Box>
        )}

        {!isHR && notification.data?.agent && (
          <>
            {/** Displayed on CMs welcome page. Navigates to Agent profile page for approval */}
            <Box style={{ marginTop: '1em' }}>
              {notification.data?.agent && (
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  className={classes.btn}
                  onClick={() => {
                    navigate(`/app/agents/${notification.data.agent}`, {
                      state: {
                        from: 'notifications',
                        notification,
                        agentApproved
                      }
                    });

                    dispatch(
                      markNotificationRead({
                        notification: notification.id
                      })
                    );
                  }}
                >
                  Go to agent
                  <ArrowForwardIcon fontSize="small" />
                </Button>
              )}
            </Box>

            {/** Approval Module */}

            {/** Show reason for denied approval requests */}
            {notification.data?.is_denied == 'true' ? (
              <Box className={classes.message}>
                <Typography
                  variant="h5"
                  align="left"
                  gutterBottom
                  className={classes.reasonTitle}
                >
                  Reason
                </Typography>
                <ReactQuill value={notification.data.denial_reason} readOnly />
              </Box>
            ) : null}

            {/** What for?? */}
            <Box style={{ marginTop: '1em' }}>
              {agentApproved && (
                <CustomAlert
                  severity="warning"
                  content="This agent has already been approved"
                />
              )}
            </Box>

            {/* !isFOO && !(notification.actor_type === 'finance') && (
              <ApproveAgent
                notification={notification}
                agentApproved={agentApproved}
              />
            ) */}
          </>
        )}
      </Box>
    </Dialog>
  );
}

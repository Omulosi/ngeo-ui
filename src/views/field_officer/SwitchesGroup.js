import React from 'react';
/* eslint-disable */
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  makeStyles,
  Switch,
  Container,
  TextareaAutosize
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  item: {
    display: 'flex',
    flexDirection: 'column'
  },
  textArea: {
    padding: theme.spacing(1),
    borderRadius: '.25em'
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

const SwitchesGroup = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    temporary: false,
    permanent: false,
    temporaryDeny: false,
    permanentDeny: false
  });
  const [notificationAlert, setNotificationAlert] = React.useState(false);

  window.emitter.addListener('notification', () => {
    setNotificationAlert(true);
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <form className={classes.root} id="approvals">
      <Card>
        <CardHeader
          subheader="Approve to contract or permanent terms"
          title="Approvals"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid className={classes.item} item md={6} sm={6} xs={12}>
              {notificationAlert && (
                <Alert severity="warning">
                  Field Officer Leo Tolstoy has request for approval to
                  temporary status for this agent
                </Alert>
              )}

              <Typography color="textPrimary" gutterBottom variant="h6">
                Contract
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.temporary}
                    onChange={handleChange}
                    name="temporary"
                    color="secondary"
                  />
                }
                label="Approve request"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.temporaryDeny}
                    onChange={handleChange}
                    name="temporary"
                    color="secondary"
                  />
                }
                label="Deny request"
              />
              <TextareaAutosize
                aria-label="textarea"
                rowsMin={4}
                className={classes.textArea}
                placeholder="Add reason for denying this request"
              />
            </Grid>
            <Grid className={classes.item} item md={6} sm={6} xs={12}>
              <Typography color="textPrimary" gutterBottom variant="h6">
                Permanent
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.permanent}
                    onChange={handleChange}
                    name="permanent"
                  />
                }
                label="Approve request"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.permanentDeny}
                    onChange={handleChange}
                    name="temporary"
                    color="secondary"
                  />
                }
                label="Deny request"
              />
              <TextareaAutosize
                aria-label="textarea"
                rowsMin={4}
                className={classes.textArea}
                placeholder="Add reason for denying this request"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">
            Submit
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default SwitchesGroup;

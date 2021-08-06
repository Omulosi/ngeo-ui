import React from 'react';
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  Link
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  },
  btn: {
    marginTop: theme.spacing(3)
  }
}));

const NotFoundView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="404">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h1">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src="/static/images/undraw_page_not_found_su7k.svg"
            />
          </Box>
          <Box textAlign="center" className={classes.btn}>
            <Button variant="outlined" color="primary">
              <Link
                component={RouterLink}
                to="/app/dashboard"
                variant="h6"
                underline="none"
              >
                Back to Home
              </Link>
            </Button>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default NotFoundView;

import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Paper from './Paper';

const styles = (theme) => ({
  paper: {
    padding: theme.spacing(4, 3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 6)
    }
  }
});

function FormWrapper(props) {
  const { children, classes } = props;

  return (
    <Container maxWidth="sm">
      <Box mt={7} mb={12}>
        <Paper className={classes.paper} elevation={2}>{children}</Paper>
      </Box>
    </Container>
  );
}

FormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormWrapper);

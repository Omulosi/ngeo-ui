import React from 'react';
/* eslint-disable */
import clsx from 'clsx';
// import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  FormHelperText
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import BlockIcon from '@material-ui/icons/Block';
import { activateUser } from 'src/redux/actions/authActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import ReactQuill from 'react-quill';
import AlertDialog from 'src/components/AlertDialog';
import { useFOO } from 'src/hooks/permissions';

const useStyles = makeStyles((theme) => ({
  root: {},
  error: {
    paddingTop: '1em'
  },
  button: {
    margin: theme.spacing(0),
    backgroundColor: 'rgb(244, 67, 54)'
  },
  icon: {
    marginRight: '0.5em'
  },
  blockIcon: {}
}));

const DeleteResource = ({
  resourceUrl,
  action,
  title,
  btnTitle,
  subTitle = null,
  reasonForDeletion = null,
  disabled,
  pendingApproval
}) => {
  const classes = useStyles();
  const isFOO = useFOO();

  const [open, setOpen] = React.useState(false);
  const [deleteReason, setDeleteReason] = React.useState(null);
  const [error, setError] = React.useState(null);

  const approveDelete = isFOO;

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    // '<p><br></p>' get assigned to react quill editor automatically if empty
    if (!deleteReason || deleteReason == '<p><br></p>') {
      setError('Please add a reason for perfoming this operation');
      return;
    }

    if (deleteReason) {
      handleDialogOpen();
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    action.mutate({ url: resourceUrl, deleteReason, approveDelete });
    handleDialogClose();
    if (action.isSuccess) {
      setError('');
      setDeleteReason('');
    }
  };

  const handleEditorChange = (html) => {
    setDeleteReason(html);
  };

  return (
    <Card>
      <CardHeader title={title} subheader={subTitle} />
      <Divider />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xl={12} lg={12} md={12} xs={12}>
            <form autoComplete="off" noValidate className={clsx(classes.root)}>
              <Box p={2} style={{ width: '100%' }}>
                <ReactQuill
                  name="deleteReason"
                  placeholder="Add reason..."
                  onChange={handleEditorChange}
                  value={deleteReason}
                  modules={{ toolbar: true }}
                />
                <FormHelperText error className={classes.error}>
                  {error}
                </FormHelperText>
              </Box>
              <Box display="flex" justifyContent="flex-start" p={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}
                  disabled={
                    error ||
                    !Boolean(deleteReason) ||
                    deleteReason == '<p><br></p>' ||
                    disabled ||
                    pendingApproval
                  }
                >
                  {pendingApproval ? 'Request Pending...' : `${btnTitle}`}
                </Button>
                <AlertDialog
                  open={open}
                  handleDialogClose={handleDialogOpen}
                  handleDialogClose={handleDialogClose}
                  handleSubmit={handleSubmit}
                  title={`${title} ?`}
                  message="Are you sure you want to continue with this operation?"
                />
              </Box>
            </form>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default DeleteResource;

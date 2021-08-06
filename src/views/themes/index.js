import React from 'react';
/* eslint-disable */
import { Container, makeStyles, Button } from '@material-ui/core';
import Page from 'src/components/Page';
import { useSnackbar } from 'notistack';
import LineProgress from 'src/components/LineProgress';
import PageToolbar from 'src/components/PageToolbar';
import AddIcon from '@material-ui/icons/Add';
import {
  useDeleteTheme,
  useThemes,
  useEditTheme,
  useAddTheme
} from 'src/hooks/themes';
import DisplayThemes from 'src/components/DisplayThemes';
import { useDispatch } from 'react-redux';
import { addTheme, editTheme } from 'src/redux/actions/themeActions';
import { useNavigate } from 'react-router';
import AddThemeDialog from './AddThemeDialog';
import EditThemeDialog from './EditThemeDialog';
import DeleteThemeDialog from './DeleteThemeDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  gridWrapper: {
    height: '75vh',
    width: 'auto'
  },
  grid: {
    marginTop: theme.spacing(5)
  },
  progress: {
    marginTop: '0.3em'
  }
}));

const Themes = () => {
  const classes = useStyles();
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = React.useState(
    false
  );
  //
  const [themeToEdit, setThemeToEdit] = React.useState(null);
  const [themeToDelete, setThemeToDelete] = React.useState(null);
  const editTheme = useEditTheme();
  const deleteTheme = useDeleteTheme();
  const addTheme = useAddTheme();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // get all themes for site
  const { data, isSuccess } = useThemes();

  let themes = [];
  if (isSuccess) {
    themes = data.map((theme) => ({
      id: theme.id,
      name: theme.attributes.name
    }));
  }

  const handleClickOpenAdd = () => {
    setOpenAddDialog(true);
  };

  const handleClickOpenEdit = () => {
    setOpenEditDialog(true);
  };

  const handleClickCloseAdd = () => {
    setOpenAddDialog(false);
  };

  const handleClickCloseEdit = () => {
    setOpenEditDialog(false);
  };

  const handleClickOpenDelete = () => {
    setOpenConfirmDeleteDialog(true);
  };

  const handleClickCloseDelete = () => {
    setOpenConfirmDeleteDialog(false);
  };

  const addThemeHandler = (theme) => {
    addTheme.mutate(theme);
    handleClickCloseAdd();
  };

  const editThemeHandler = (theme) => {
    editTheme.mutate(theme);
    handleClickCloseEdit();
  };

  const deleteThemeHandler = (theme) => {
    deleteTheme.mutate(theme);
    handleClickCloseDelete();
  };

  const handleEdit = (theme) => {
    const themeObj = theme.length > 0 ? theme[0] : null; // id, name
    setThemeToEdit(themeObj);
    handleClickOpenEdit();
  };

  const handleDelete = (theme) => {
    const themeObj = theme.length > 0 ? theme[0] : null; // id, name
    setThemeToDelete(themeObj);
    handleClickOpenDelete();
  };

  return (
    <Page title="Themes" className={classes.root}>
      <div className={classes.progress}>{false && <LineProgress />}</div>
      <Container maxWidth={false}>
        <PageToolbar title="Themes">
          <Button
            color="primary"
            variant="contained"
            className={classes.btn}
            onClick={handleClickOpenAdd}
          >
            {<AddIcon />} {'New Theme'}
          </Button>
        </PageToolbar>
        <AddThemeDialog
          open={openAddDialog}
          setOpen={setOpenAddDialog}
          closeDialogHandler={handleClickCloseAdd}
          addThemeHandler={addThemeHandler}
        />
        <EditThemeDialog
          open={openEditDialog}
          setOpen={setOpenEditDialog}
          closeDialogHandler={handleClickCloseEdit}
          editThemeHandler={editThemeHandler}
          theme={themeToEdit}
          setTheme={setThemeToEdit}
        />
        <DeleteThemeDialog
          open={openConfirmDeleteDialog}
          closeDialogHandler={handleClickCloseDelete}
          theme={themeToDelete}
          deleteThemeHandler={deleteThemeHandler}
        />

        <DisplayThemes
          themes={themes}
          handleOpenEditDialog={handleClickOpenEdit}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Container>
    </Page>
  );
};

export default Themes;

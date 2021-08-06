import React from 'react';
/* eslint-disable */
import Button from '@material-ui/core/Button';
import { DropzoneDialog } from 'material-ui-dropzone';
import { Input } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210
    }
  })
);

// eslint-disable-next-line react/prop-types
export default function UploadFileDialog({ open, handleClose, handleSubmit }) {
  const classes = useStyles();
  return (
    <div>
      <DropzoneDialog
        acceptedFiles={['.xlsx']}
        cancelButtonText={'cancel'}
        submitButtonText={'upload'}
        filesLimit={1}
        maxFileSize={5000000}
        open={open}
        onClose={handleClose}
        onSave={(files) => {
          handleSubmit(files);
          handleClose();
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
        useChipsForPreview
        previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
        previewChipProps={{ classes: { root: classes.previewChip } }}
        previewText="Selected files"
      />
    </div>
  );
}

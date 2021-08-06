import React from 'react';
/* eslint-disable */
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  makeStyles,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup
} from '@material-ui/core';
import ReactQuill from 'react-quill';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useCM, useFinance } from 'src/hooks/permissions';
import useCountyManager from 'src/hooks/county_managers';
import { useUpdateAgentToContract } from 'src/hooks/agents';
import ApproveAgent from 'src/components/ApproveAgent';
import { useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  },
  item: {
    display: 'flex',
    flexDirection: 'column'
  },
  textArea: {
    padding: theme.spacing(1),
    borderRadius: '.25em',
    width: '100%'
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  },
  reasonField: {
    marginBottom: theme.spacing(2)
  },
  denyRegion: {
    marginTop: theme.spacing(2)
  }
}));

const ApproveAgentDeletion = ({ agentDetails, title, subheader, action }) => {
  const { id } = useParams();
  const classes = useStyles();

  return (
    <div className={classes.root} id="approvals">
      <ApproveAgent
        agentDetails={agentDetails}
        title={title}
        subheader={subheader}
        action={action}
        deleteReason={agentDetails.delete_reason}
        resourceURL={`/agents/${id}`}
      />
    </div>
  );
};

export default ApproveAgentDeletion;

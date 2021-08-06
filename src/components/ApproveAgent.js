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

const ApproveAgent = ({
  agentDetails,
  title,
  subheader,
  action,
  deleteReason = null,
  resourceURL // for deletion approval
}) => {
  const { agentId, field_officer } = agentDetails;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = React.useState({
    denialReason: ''
  });

  const [isApproved, setIsApproved] = React.useState('true');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');

  const isCM = useCM();
  const isFinance = useFinance();

  let userId = null;

  const { data: countyManager, isSuccess: cmSuccess } = useCountyManager();

  if (isCM) {
    userId = countyManager && countyManager.id;
  }

  if (isFinance) {
    userId = null;
  }

  const contractFormik = useFormik({
    initialValues: {
      resource: { name: 'contract' }
    },
    onSubmit: (values) => {
      // Cannot select deny without supplying denial reason
      if (isApproved === 'false') {
        if (state.denialReason === '') {
          enqueueSnackbar('Please provide a denial reason', {
            variant: 'error'
          });
          setHelperText('Please provide a denial reason');
          setError(true);
          return;
        }
      }

      action.mutate({
        url: resourceURL,
        ...values,
        data: { agent: agentId },
        sender: field_officer.id,
        approveDelete: isApproved === 'true',
        isApproved, // 'true' when approval request (activation) is granted
        ...state
      });

      if (action.isSuccess) {
        setHelperText('');
        setError(false);
        setState({ denialReason: '' });
      }
    }
  });

  const handleEditorChange = (html) => {
    setState({ denialReason: html });
  };

  const handleRadioChange = (event) => {
    setIsApproved(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  console.log(isApproved);

  return (
    <div className={classes.root} id="approvals">
      <Card>
        <CardHeader title={`${title}`} subheader={`${subheader}`} />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid className={classes.item} item md={12} sm={12} xs={12}>
              {deleteReason && (
                <Box className={classes.reasonField}>
                  <p style={{ fontWeight: 'bold' }}>Reason</p>
                  <ReactQuill
                    value={deleteReason}
                    readOnly
                    modules={{ toolbar: false }}
                  />
                </Box>
              )}

              <form onSubmit={contractFormik.handleSubmit}>
                <FormControl
                  component="fieldset"
                  error={error}
                  className={classes.formControl}
                >
                  <RadioGroup
                    aria-label="approvals"
                    name="isApproved"
                    value={isApproved}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Approve"
                    />
                    <Divider />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="Deny"
                    />
                  </RadioGroup>
                  <FormHelperText>{helperText}</FormHelperText>
                </FormControl>

                {isApproved === 'false' && (
                  <Box className={classes.reasonField}>
                    <ReactQuill
                      name="denialReason"
                      placeholder="Add reason for denying this request"
                      onChange={handleEditorChange}
                      value={state.denialReason}
                    />
                  </Box>
                )}

                <Box>
                  <Button
                    color="primary"
                    variant="outlined"
                    type="submit"
                    disabled={isApproved == 'false' && !state.denialReason}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApproveAgent;

import React, { useState } from 'react';
/* eslint-disable */
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import {
  Divider,
  makeStyles,
  InputLabel,
  Select,
  Input,
  FormControl,
  MenuItem
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// Date
import DatePicker from 'react-datepicker';
import { addIncident } from 'src/redux/actions/incidentAction';
import { addProject } from 'src/redux/actions/projectActions';
import { addThreat } from 'src/redux/actions/threatAction';
import { useCM, useFinance, useFOO } from 'src/hooks/permissions';
import { initiatedByList, threatTypes } from 'src/config';
import ComboBox from 'src/components/GeneralComboBox';
import adminData from 'src/data/adminData';
import * as helpers from 'src/utils/helpers';
import AsynchronousComboBox from 'src/components/AsynchronousComboBox';
import { useThemes } from 'src/hooks/themes';
import mainConfig from 'src/config/config.json';
import 'react-datepicker/dist/react-datepicker.css';

const useStyles = makeStyles((theme) => ({
  root: {},
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  formContent: {
    // backgroundColor: 'rgb(35, 48, 68)',
    borderRadius: '5px'
  },
  dialogContent: {
    marginBottom: theme.spacing(2)
  },
  header: {
    color: '#263228',
    fontSize: '1.5rem'
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  error: {
    textAlign: 'center'
  },
  datepicker: {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #aaa',
    padding: '0.5em 0'
  }
}));

export default function AddMarkerDialog({
  coordinates = '',
  open,
  handleClose,
  type
}) {
  const classes = useStyles();
  const { siteNames } = mainConfig.globalData;
  const [markerType, setMarkerType] = React.useState('');
  const [startDate, setStartDate] = useState(new Date());
  let [longitude = '', latitude = ''] = [];
  if (type === 'Point') {
    [longitude = '', latitude = ''] = coordinates;
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const countyData = helpers.getItemsFromStorage('counties');
  const { data: themeData, isLoading, isSuccess: themeSuccess } = useThemes();

  let themes = [];
  if (themeSuccess) {
    themes = themeData.map((theme) => ({
      id: theme.id,
      name: theme.attributes.name
    }));
  }

  const initialValues = {
    from: '',
    to: ''
  };
  const [threatValues, setThreatValues] = React.useState(initialValues);

  const isFOO = useFOO();
  const isCM = useCM();
  const isFinance = useFinance();

  const formik = useFormik({
    initialValues: {
      markerType: '',
      threatType: '',
      date_submitted: '',
      name: '',
      description: '',
      from: '',
      to: '',
      theme: '',
      initiated_by: ''
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      let action = null;
      let color = '';
      let fromRegion = '';
      let toRegion = '';
      if (countyData && threatValues.from && threatValues.to) {
        fromRegion = countyData.filter(
          (county) => county.name == threatValues.from
        )[0]?.region;
        toRegion = countyData.filter(
          (county) => county.name == threatValues.to
        )[0]?.region;
      }
      switch (values.markerType) {
        case 'incident':
          action = addIncident;
          break;
        case 'project':
          action = addProject;
          break;
        case 'threat':
          action = addThreat;
          let thisThreat = threatTypes.filter(
            (threat) => threat.value === values.threatType
          );
          color = (thisThreat.length && thisThreat[0].color) || '';
          // if (values.threatType === 'incoming') {
          //   color = 'red';
          // }
          // if (values.threatType === 'outgoing') {
          //   color = 'blue';
          // }
          break;
        default:
          action = null;
      }
      dispatch(
        action(
          {
            ...values,
            ...threatValues,
            date_submitted: startDate,
            color,
            longitude,
            latitude,
            coordinates,
            fromRegion,
            toRegion
          },
          navigate,
          enqueueSnackbar,
          setSubmitting,
          resetForm
        )
      );
    }
  });

  // From and to fields
  const handleChange = (evt, dataObj, key) => {
    if (dataObj === null) {
      enqueueSnackbar('Please select a value', {
        variant: 'warning'
      });
      return;
    }

    if (key === 'from') {
      setThreatValues({ ...threatValues, from: dataObj.name });
    }

    if (key === 'to') {
      setThreatValues({ ...threatValues, to: dataObj.name });
    }

    if (key === 'theme') {
      formik.setFieldValue(
        key,
        dataObj !== null ? dataObj : formik.initialValues.theme
      );
    }
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form className={classes.formContent} onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title">New Feature</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <DialogContentText>
              Add a description and all pertinent details of the feature you are
              adding to this map. Ensure to specify whether it is an incident, a
              threat or a project
            </DialogContentText>
            <Divider />

            <FormControl className={classes.formControl} fullWidth>
              <InputLabel htmlFor="marker-type">Feature Type</InputLabel>
              <Select
                native
                name="markerType"
                input={<Input id="marker-type" />}
                autoFocus
                value={formik.values.markerType}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
              >
                <option aria-label="None" value="" />
                {isFOO && type == 'Point' && (
                  <option value={'incident'}>Incident</option>
                )}
                {isCM && type == 'LineString' && (
                  <option value={'threat'}>{`${siteNames.Threat.name}`}</option>
                )}
                {isFinance && type == 'Point' && (
                  <option
                    value={'project'}
                  >{`${siteNames.Project.name}`}</option>
                )}
              </Select>
            </FormControl>

            {formik.values.markerType === 'threat' && (
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="threat-type">Threat Type</InputLabel>
                <Select
                  native
                  name="threatType"
                  input={<Input id="threat-type" />}
                  autoFocus
                  value={formik.values.threatType}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                >
                  <option aria-label="None" value="" />
                  <option value={'incoming'}>Incoming</option>
                  <option value={'outgoing'}>Outgoing</option>
                </Select>
              </FormControl>
            )}

            {formik.values.markerType == 'project' && (
              <>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  fullWidth
                >
                  <AsynchronousComboBox
                    isRequired={true}
                    loading={isLoading}
                    label="Theme"
                    name="theme"
                    value={formik.values.theme}
                    options={themes}
                    onChange={(e, value) => handleChange(e, value, 'theme')}
                    variant={'standard'}
                  />
                </FormControl>

                <FormControl className={classes.formControl} fullWidth required>
                  <InputLabel id="controlled-by-label">
                    Controlled By
                  </InputLabel>
                  <Select
                    native
                    labelId="control-label"
                    id="control"
                    name="initiated_by"
                    value={formik.values.initiated_by}
                    onChange={formik.handleChange}
                    label="Controlled By"
                    required
                  >
                    <option aria-label="None" value="" />
                    {Object.keys(initiatedByList).map((key) => {
                      const value = initiatedByList[key];
                      return <option value={key}>{value}</option>;
                    })}
                  </Select>
                </FormControl>
              </>
            )}

            <FormControl className={classes.formControl} fullWidth required>
              <DatePicker
                selected={startDate}
                name="date_submitted"
                onChange={(date) => setStartDate(date)}
                className={classes.datepicker}
                showTimeSelect
              />
            </FormControl>

            <TextField
              className={classes.textField}
              label="Name"
              margin="dense"
              id="name"
              name="name"
              placeholder="Descriptive name"
              type="text"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
            />
            {/**
              
               <TextField
              className={classes.textField}
              fullWidth
              name="longitude"
              margin="dense"
              id="longitude"
              label="Longitude"
              type="text"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              value={longitude}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
            />
            <TextField
              className={classes.textField}
              fullWidth
              name="latitude"
              margin="dense"
              id="latitude"
              label="Latitude"
              type="text"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              value={latitude}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
            />
              
              
              
              */}

            {/**
               
              <TextField
              className={classes.textField}
              id="standard-textarea"
              label="Description"
              name="description"
              placeholder="Add a description"
              multiline
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              value={formik.values.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />


              */}

            {formik.values.markerType === 'threat' && (
              <>
                <div className={classes.textField}>
                  <ComboBox
                    variant="standard"
                    label="From"
                    name="from"
                    options={adminData.counties}
                    onChange={(e, value) => {
                      handleChange(e, value, 'from');
                    }}
                  />
                </div>

                <div className={classes.textField}>
                  <ComboBox
                    className={classes.textField}
                    variant="standard"
                    label="To"
                    name="to"
                    options={adminData.counties}
                    onChange={(e, value) => {
                      handleChange(e, value, 'to');
                    }}
                  />
                </div>

                {/*
                  <FormControl
                  component="fieldset"
                  className={classes.formControl}
                  >
                    <FormLabel component="legend">Color</FormLabel>
                    <RadioGroup
                      aria-label="color"
                      name="color"
                      value={formik.values.color}
                      onChange={formik.handleChange}
                      required
                    >
                      <FormControlLabel
                        value="red"
                        control={<RedRadio />}
                        label="Red"
                      />
                      <FormControlLabel
                        value="yellow"
                        control={<YellowRadio />}
                        label="Yellow"
                      />
                      <FormControlLabel
                        value="blue"
                        control={<BlueRadio />}
                        label="Blue"
                      />
                    </RadioGroup>
                  </FormControl>
                */}
              </>
            )}
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button color="primary" type="submit" outlined>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

AddMarkerDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  coordinates: PropTypes.string
};

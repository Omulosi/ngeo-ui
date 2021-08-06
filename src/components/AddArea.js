import React, { useEffect } from 'react';
/* eslint-disable */
import clsx from 'clsx';
// import * as Yup from 'yup';
import { useFormik } from 'formik';
// import PropTypes from 'prop-types';
import axios from 'axios';
import createGetFeatureQuery from 'src/utils/queries';

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
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { assignArea } from 'src/redux/actions/areaAction';
import { updateAgentToContract } from 'src/redux/actions/agentActions';
import ComboBox from './GeneralComboBox';
import AsynchronousComboBox from './AsynchronousComboBox';
import adminData from 'src/data/adminData';
import countySubcountyData from 'src/data/countyAndSucounty';
import regionData from 'src/data/regionData';
import { roles } from 'src/config';
import { useSublocation, useSublocations } from 'src/hooks/sub_locations';
import useHR, { useCM, useFinance } from 'src/hooks/permissions';
import useCountyManager from 'src/hooks/county_managers';
import { WMSCapabilities } from 'ol/format';
import { axiosGeneral } from 'src/utils/axios';
import * as helpers from 'src/utils/helpers';
import mainConfig from 'src/config/config.json';
import { useAssignArea } from 'src/hooks/area';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  content: {
    // marginTop: theme.spacing(2)
  },
  header: {
    color: '#263228',
    fontSize: '1.5rem'
  },
  error: {
    textAlign: 'left',
    padding: '1em'
  }
}));

const AddArea = ({ user, assigner, project, disabled }) => {
  const classes = useStyles();
  const axios = axiosGeneral();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const assignArea = useAssignArea();
  const [currentRegion, setCurrentRegion] = React.useState('');
  const [isNairobiArea, setIsNairobiArea] = React.useState(false);

  let { nairobiCountyJurisdictions } = mainConfig.globalData;
  nairobiCountyJurisdictions = nairobiCountyJurisdictions.map((area) => ({
    name: area.name,
    region: 'Nairobi'
  }));

  const initialValues = {
    region: '',
    county: [],
    constituency: [],
    sub_county: [],
    division: [],
    location: [],
    sub_location: [],
    ward: []
  };

  const [values, setValues] = React.useState(initialValues);

  const [dataOptions, setDataOptions] = React.useState({
    regionOptions: [],
    countyOptions: [],
    // constituencyOptions: [],
    subCountyOptions: [],
    divisionOptions: [],
    locationOptions: [],
    subLocationOptions: []
  });

  const [loading, setLoading] = React.useState({
    isRegionLoading: false,
    isCountyLoading: false,
    // isConstituencyLoading: false,
    isSubCountyLoading: false,
    isDivisionLoading: false,
    isLocationLoading: false,
    isSubLocationLoading: false
  });

  const [isRegionDisabled, setRegionDisabled] = React.useState(false);
  const [isCountyDisabled, setCountyDisabled] = React.useState(false);
  // const [isConstituencyDisabled, setConstituencyDisabled] = React.useState(
  //   false
  // );
  const [isSubCountyDisabled, setSubCountyDisabled] = React.useState(false);
  const [isDivisionDisabled, setDivisionDisabled] = React.useState(false);
  const [isLocationDisabled, setLocationDisabled] = React.useState(false);
  const [isSubLocationDisabled, setSubLocationDisabled] = React.useState(false);

  // Region
  const regionsURL = createGetFeatureQuery('Ke_Region');
  // County
  const countiesURL = createGetFeatureQuery('Ke_County');
  // Constituency
  // const constituenciesURL = createGetFeatureQuery('Ke_Constituency');
  // Sub-County
  const subCountiesURL = createGetFeatureQuery('Ke_Sub_County');
  // Divisions
  const divisionsURL = createGetFeatureQuery('Ke_Division');
  // Locations
  const locationsURL = createGetFeatureQuery('Ke_Location');
  // Sub-Locations
  const subLocationsURL = createGetFeatureQuery('Ke_Sub_Location');

  React.useEffect(async () => {
    try {
      setLoading({
        isRegionLoading: true,
        isCountyLoading: true,
        // isConstituencyLoading: true,
        isSubCountyLoading: true,
        isDivisionLoading: true,
        isLocationLoading: true,
        isSubLocationLoading: true
      });

      // Region
      // check if regions already prev loaded.
      let regionData = helpers.getItemsFromStorage('regions');
      // Fetch afresh if not yet prev loaded.
      if (!regionData) {
        let { data } = await axios.get(regionsURL);
        regionData = data.features.map((ft) => {
          let { REGION: name } = ft.properties;
          return { name };
        });

        helpers.saveToStorage('regions', regionData);
      }

      // County

      let countyData = helpers.getItemsFromStorage('counties');
      if (!countyData) {
        let { data } = await axios.get(countiesURL);
        countyData = data.features.map((ft) => {
          let { COUNTY: name, REGION: region } = ft.properties;
          return { name, region };
        });

        helpers.saveToStorage('counties', countyData);
      }

      // constituency
      // let constituencyData = helpers.getItemsFromStorage('constituencies');
      // if (!constituencyData) {
      //   let { data } = await axios.get(constituenciesURL);
      //   constituencyData = data.features.map((ft) => {
      //     let {
      //       CONSTITUEN: name,
      //       COUNTY: county,
      //       REGION: region
      //     } = ft.properties;
      //     return { name, county, region };
      //   });

      //   helpers.saveToStorage('constituencies', constituencyData);
      // }

      // sub county
      let subCountyData = helpers.getItemsFromStorage('subcounties');
      if (!subCountyData) {
        let { data } = await axios.get(subCountiesURL);
        subCountyData = data.features.map((ft) => {
          let {
            SUB_COUN: name,
            COUNTY: county,
            REGION: region
          } = ft.properties;
          return { name, county, region };
        });

        helpers.saveToStorage('subcounties', subCountyData);
      }

      // Division
      let divisionData = helpers.getItemsFromStorage('divisions');
      if (!divisionData) {
        let { data } = await axios.get(divisionsURL);
        divisionData = data.features.map((ft) => {
          let {
            CONSTITUEN: constituency,
            COUNTY: county,
            REGION: region,
            DIVISION: name
          } = ft.properties;
          return { name, constituency, county, region };
        });

        helpers.saveToStorage('divisions', divisionData);
      }

      // Location
      let locationData = helpers.getItemsFromStorage('locations');
      if (!locationData) {
        let { data: locationData } = await axios.get(locationsURL);
        locationData = locationData.features.map((ft) => {
          let {
            CONSTITUEN: constituency,
            COUNTY: county,
            REGION: region,
            DIVISION: division,
            DISTRICT: district,
            LOCATION: name
          } = ft.properties;
          return { name, division, district, constituency, county, region };
        });

        helpers.saveToStorage('locations', locationData);
      }

      // Sub-Location
      let subLocationData = helpers.getItemsFromStorage('sublocations');
      if (!subLocationData) {
        let { data } = await axios.get(subLocationsURL);
        subLocationData = data.features.map((ft) => {
          let {
            CONSTITUEN: constituency,
            COUNTY: county,
            REGION: region,
            DIVISION: division,
            DISTRICT: district,
            LOCATION: location,
            SUB_LOCATI: name
          } = ft.properties;
          return {
            name,
            location,
            division,
            district,
            constituency,
            county,
            region
          };
        });

        helpers.saveToStorage('sublocations', subLocationData);
      }

      // Update state with new data
      setDataOptions({
        regionOptions: regionData,
        countyOptions: countyData,
        // constituencyOptions: constituencyData,
        subCountyOptions: subCountyData,
        divisionOptions: divisionData,
        locationOptions: locationData,
        subLocationOptions: subLocationData
      });

      setLoading({
        isRegionLoading: false,
        isCountyLoading: false,
        // isConstituencyLoading: false,
        isSubCountyLoading: false,
        isDivisionLoading: false,
        isLocationLoading: false,
        isSubLocationLoading: false
      });
    } catch (err) {
      setLoading({
        isRegionLoading: false,
        isCountyLoading: false,
        // isConstituencyLoading: false,
        isSubCountyLoading: false,
        isDivisionLoading: false,
        isLocationLoading: false,
        isSubLocationLoading: false
      });
    }
  }, []);

  useEffect(() => {
    dispatch({ type: 'CLEAR_ERRORS' });
  }, [dispatch]);

  // users being assigned an area
  const isCM = user && user.role === roles.CM;
  const isFOO = user && user.role === roles.FOO;
  const isRM = user && user.role === roles.RM;
  // currently logged in users
  const isHR = useHR();
  const isSessionCM = useCM();
  const isFinance = useFinance();
  const { data: countyManager, error: cmError } = useCountyManager();

  const error = useSelector((state) => state.area.areaError, shallowEqual);

  const resetForm = () => {
    setValues(initialValues);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (isFinance) {
      if (!values.region || values.county.length == 0) {
        enqueueSnackbar('Please provide both Region and County', {
          variant: 'warning'
        });
        return;
      }
    }

    // dispatch(
    //   assignArea(
    //     {
    //       ...values,
    //       user_id: user && (user.role === 'agent' ? user.agentId : user.uuid),
    //       role: user && user.role,
    //       project_id: project ? project.id : ''
    //     },
    //     enqueueSnackbar,
    //     resetForm
    //   )
    // );
    assignArea.mutate(
      {
        ...values,
        user_id: user && (user.role === 'agent' ? user.agentId : user.uuid),
        role: user && user.role,
        project_id: project ? project.id : ''
      },
      enqueueSnackbar,
      resetForm
    );

    // window.location.reload();
  };

  const handleChange = (evt, dataObj, key) => {
    if (dataObj === null) {
      enqueueSnackbar('Please select a value', {
        variant: 'warning'
      });
      return;
    }

    if (key === 'region') {
      setValues({ ...values, region: dataObj.name });
      setCurrentRegion(dataObj.name);
    }

    if (key === 'county') {
      setValues({ ...values, county: [dataObj.name] });
    }

    // Select only one of the following
    if (key === 'constituency') {
      const constituencies = dataObj
        .map((con) => (con ? con.name : ''))
        .filter((con) => Boolean(con));
      setValues({ ...values, constituency: constituencies });
      // Disabled rest of areas if this section is filled
      if (dataObj && dataObj.length > 0) {
        setSubCountyDisabled(true);
        setDivisionDisabled(true);
        setLocationDisabled(true);
        setSubLocationDisabled(true);
      } else {
        // Activate if section has no data
        setSubCountyDisabled(false);
        setDivisionDisabled(false);
        setLocationDisabled(false);
        setSubLocationDisabled(false);
      }
    }

    if (key === 'subcounty') {
      const subCounties = dataObj
        .map((sc) => (sc ? sc.name : ''))
        .filter((sc) => Boolean(sc));
      setValues({ ...values, sub_county: subCounties });
      // Disabled rest of areas
      if (dataObj && dataObj.length > 0) {
        // setConstituencyDisabled(true);
        setDivisionDisabled(true);
        setLocationDisabled(true);
        setSubLocationDisabled(true);
      } else {
        // setConstituencyDisabled(false);
        setLocationDisabled(false);
        setSubLocationDisabled(false);
        setDivisionDisabled(false);
      }
    }

    if (key === 'division') {
      const divisions = dataObj
        .map((div) => (div ? div.name : ''))
        .filter((div) => Boolean(div));
      setValues({ ...values, division: divisions });
      // Disabled rest of areas
      if (dataObj && dataObj.length > 0) {
        setSubCountyDisabled(true);
        setLocationDisabled(true);
        setSubLocationDisabled(true);
      } else {
        setSubCountyDisabled(false);
        setLocationDisabled(false);
        setSubLocationDisabled(false);
      }
    }

    if (key === 'location') {
      const locations = dataObj
        .map((loc) => (loc ? loc.name : ''))
        .filter((loc) => Boolean(loc));
      setValues({ ...values, location: locations });
      // Disabled rest of areas
      if (dataObj && dataObj.length > 0) {
        setDivisionDisabled(true);
        setSubCountyDisabled(true);
        setSubLocationDisabled(true);
      } else {
        setDivisionDisabled(false);
        setSubCountyDisabled(false);
        setSubLocationDisabled(false);
      }
    }

    if (key === 'sub_location') {
      const subLocations = dataObj
        .map((sb) => (sb ? sb.name : ''))
        .filter((sb) => Boolean(sb));
      setValues({ ...values, sub_location: subLocations });
      // Disabled rest of areas
      if (dataObj && dataObj.length > 0) {
        setDivisionDisabled(true);
        setLocationDisabled(true);
        setSubCountyDisabled(true);
      } else {
        setDivisionDisabled(false);
        setLocationDisabled(false);
        setSubCountyDisabled(false);
      }
    }
  };

  // Filter for county specific data
  let filteredRegionOptions = dataOptions.regionOptions;
  let filteredCountyOptions = dataOptions.countyOptions;
  if (currentRegion.toLocaleLowerCase().includes('nairobi')) {
    filteredCountyOptions = nairobiCountyJurisdictions;
  }
  // let filteredConstituencyOptions = dataOptions.constituencyOptions;
  let filteredSubCountyOptions = dataOptions.subCountyOptions;
  let filteredDivisionOptions = dataOptions.divisionOptions;
  let filteredLocationOptions = dataOptions.locationOptions;
  let filteredSubLocationOptions = dataOptions.subLocationOptions;
  if (isSessionCM) {
    let currentCounty =
      (countyManager &&
        countyManager.attributes &&
        countyManager.attributes.area.county) ||
      '';
    // constituency
    // filteredConstituencyOptions = filteredConstituencyOptions?.filter(
    //   (con) =>
    //     con.county.toLocaleLowerCase() === currentCounty.toLocaleLowerCase()
    // );
    // sub county
    filteredSubCountyOptions = filteredSubCountyOptions.filter((sc) =>
      currentCounty.toLocaleLowerCase().includes(sc.county.toLocaleLowerCase())
    );

    // debugger;

    // division
    filteredDivisionOptions = filteredDivisionOptions?.filter((div) =>
      currentCounty.toLocaleLowerCase().includes(div.county.toLocaleLowerCase())
    );
    // location
    filteredLocationOptions = filteredLocationOptions?.filter((loc) =>
      currentCounty.toLocaleLowerCase().includes(loc.county.toLocaleLowerCase())
    );
    // sub location
    filteredSubLocationOptions = filteredSubLocationOptions.filter((sub) =>
      currentCounty.toLocaleLowerCase().includes(sub.county.toLocaleLowerCase())
    );
  }

  if (isFinance || isHR) {
    let selectedRegion = currentRegion ? currentRegion.toLocaleLowerCase() : '';
    if (selectedRegion) {
      filteredCountyOptions = filteredCountyOptions.filter(
        (con) => con.region.toLocaleLowerCase() === selectedRegion
      );
    }
  }

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.content)}
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader title="Assign or update area" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {/**  */}
            {(isRM || isFinance || isHR) && (
              <Grid item lg={12} md={12} xs={12}>
                <ComboBox
                  required
                  label="Region"
                  name="region"
                  options={regionData.regions}
                  onChange={(e, value) => {
                    handleChange(e, value, 'region');
                  }}
                />
              </Grid>
            )}

            {/** when assigning area to a CM, he shouldnt see from sub-county downwards */}
            {(isCM || isFinance || (isHR && isFOO)) && (
              <Grid item lg={12} md={12} xs={12}>
                <AsynchronousComboBox
                  disabled={isCountyDisabled}
                  loading={loading.isCountyLoading}
                  label="County"
                  name="county"
                  value={values.county[0]}
                  options={filteredCountyOptions.sort(
                    (a, b) => -b.region.localeCompare(a.region)
                  )}
                  groupBy={(option) => option.region}
                  onChange={(e, value) => handleChange(e, value, 'county')}
                />
              </Grid>
            )}

            {/** Assign constituency */}
            {/*!isCM && !isRM && !(isHR && isFOO) && !isFinance && (
              <Grid item lg={12} md={12} xs={12}>
                <AsynchronousComboBox
                  disabled={isConstituencyDisabled}
                  loading={loading.isConstituencyLoading}
                  label="Constituency(s)"
                  name="constituency"
                  multiple={true}
                  value={values.constituency[0]}
                  options={filteredConstituencyOptions.sort(
                    (a, b) => -b.county.localeCompare(a.county)
                  )}
                  groupBy={(option) => option.county}
                  onChange={(e, value) =>
                    handleChange(e, value, 'constituency')
                  }
                />
              </Grid>
                )*/}

            {!isCM && !isRM && !(isHR && isFOO) && !isFinance && (
              <Grid item lg={12} md={12} xs={12}>
                <AsynchronousComboBox
                  disabled={isSubCountyDisabled}
                  loading={loading.isSubCountyLoading}
                  label="Sub-County(s)"
                  name="sub_county"
                  multiple={true}
                  value={values.sub_county[0]}
                  options={filteredSubCountyOptions.sort(
                    (a, b) => -b.county.localeCompare(a.county)
                  )}
                  groupBy={(option) => option.county}
                  onChange={(e, value) => handleChange(e, value, 'subcounty')}
                />
              </Grid>
            )}

            {!isCM && !isRM && !(isHR && isFOO) && !isFinance && (
              <Grid item lg={12} md={12} xs={12}>
                <AsynchronousComboBox
                  loading={loading.isDivisionLoading}
                  disabled={isDivisionDisabled}
                  label="Division(s)"
                  name="division"
                  multiple={true}
                  options={filteredDivisionOptions}
                  value={values.division[0]}
                  groupBy={(option) => option.county}
                  onChange={(e, value) => {
                    handleChange(e, value, 'division');
                  }}
                />
              </Grid>
            )}
            {!isCM && !isRM && !(isHR && isFOO) && !isFinance && (
              <Grid item lg={12} md={12} xs={12}>
                <AsynchronousComboBox
                  loading={loading.isLocationLoading}
                  disabled={isLocationDisabled}
                  multiple={true}
                  label="Location(s)"
                  name="location"
                  multiple={true}
                  value={values.location[0]}
                  options={filteredLocationOptions}
                  groupBy={(option) => option.county}
                  // groupBy={(option) => option.subCounty}
                  onChange={(e, value) => {
                    handleChange(e, value, 'location');
                  }}
                />
              </Grid>
            )}
            {!isCM && !isRM && !(isHR && isFOO) && !isFinance && (
              <Grid item lg={12} md={12} xs={12}>
                <AsynchronousComboBox
                  loading={loading.isSubLocationLoading}
                  disabled={isLocationDisabled}
                  multiple={true}
                  label="Sub-Location(s)"
                  name="sub_location"
                  multiple={true}
                  value={values.sub_location[0]}
                  options={filteredSubLocationOptions}
                  groupBy={(option) => option.county}
                  // groupBy={(option) => option.subCounty}
                  onChange={(e, value) => {
                    handleChange(e, value, 'sub_location');
                  }}
                />
              </Grid>
            )}
          </Grid>
        </CardContent>
        <Divider />
        <FormHelperText className={classes.error} error>
          {' '}
          {error && error}
        </FormHelperText>
        <Box display="flex" justifyContent="flex-start" p={2}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={disabled}
          >
            Submit
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AddArea;

import React, { useState } from 'react';
/* eslint-disable */
import clsx from 'clsx';
import { makeStyles, List, Divider, Tooltip } from '@material-ui/core';
import createGetFeatureQuery, {
  createFilterFeatureQuery
} from 'src/utils/queries';
import useFieldOfficer from 'src/hooks/field_officers';
import useUser from 'src/hooks/user';
import { roles } from 'src/config';
import { vectorGeoJson, vectorSourceWMS, vectorSourceImageWMS } from './Source';
// Map Controls
import {
  Controls,
  FullScreenControl,
  ScaleLineControl,
  MousePositionControl,
  SearchNominatimControl,
  // LegendControl,
  ProjectSelectControl
} from './Controls';
// Map Interactions
import {
  Interactions,
  DrawInteraction,
  MeasureInteraction
} from './Interactions';
import SideDrawer from './SideDrawer';
import Navigation from './Controls/navigation/Navigation';
import styles from './geoStyles';
import * as helpers from 'src/utils/helpers';
import AccordionItem from './AccordionItem';
import {
  useCEO,
  useCM,
  useFinance,
  useFOO,
  useRM
} from 'src/hooks/permissions';
import ListItem from './ListItem';
import VectorSource from 'ol/source/Vector';
import { Layers, VectorLayer, TileLayer, ImageLayer } from './Layers';
// import lineIcon from './images/line.png';
import pointIcon from './images/point.png';
import arrowIcon from './images/arrow.png';
import polygonIcon from './images/polygon.png';
import polyLineIcon from './images/polyline.png';
import noneIcon from './images/none.png';
import { useSelector } from 'react-redux';
import { useThemes } from 'src/hooks/themes';
import { isCountyManager } from 'src/utils/getRole';

const BOUNDARY_ZINDEX_OFFSET = 10;
const INSTALLATIONS_ZINDEX_OFFSET = 100;
const MYDATA_ZINDEX_OFFSET = 200;

const useStyles = makeStyles({
  map: {
    height: '100vh',
    position: 'relative'
  },
  container: {
    position: 'relative'
  },
  layerItem: {},
  checkbox: {
    marginRight: '0.5em'
  },
  checkboxName: {
    fontSize: '0.9rem'
  },
  layerTitle: {
    backgroundColor: 'rgb(35, 48, 68)',
    color: '#fff'
  },
  innerContent: {
    paddingLeft: '10px',
    backgroundColor: 'rgb(35, 48, 68)',
    paddingBottom: '1em'
  },
  listItem: {
    fontSize: '9px'
  },
  circle: {
    width: '8px !important',
    height: '8px !important',
    backgroundColor: 'blue',
    borderRadius: '50%'
  },
  editItemsContainer: {
    display: 'flex',
    minWidth: '120px',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: '5px',
    padding: '4px',
    background: 'linear-gradient(180deg,#fff 0,#e5e5e5)',
    boxShadow: '0 0 0 1px rgb(0 0 0 / 10%), 0 4px 6px rgb(0 0 0 / 20%)',
    cursor: 'normal'
  },
  editItem: {
    borderRight: '1px solid #e8e8e8',
    textAlign: 'center',
    flex: 1,
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  editIcon: {
    width: '100%',
    cursor: 'pointer'
  },
  buttonBar: {
    // background: 'linear-gradient(180deg, #fff 0,#e5e5e5)',
    // boxShadow: '0 0 0 1px rgb(0 0 0 / 10%), 0 4px 6px rgb(0 0 0 / 20%)',
    marginBottom: '10px',
    marginTop: '15px',
    marginLeft: '10px',
    width: '50%',
    display: 'inline-block',
    padding: '4px'
  },
  buttonContainer: {
    display: 'inline-block',
    // borderRight: '1px solid #e8e8e8',
    background: 'linear-gradient(180deg, #fff 0,#e5e5e5)',
    boxShadow: '0 0 0 1px rgb(0 0 0 / 10%), 0 4px 6px rgb(0 0 0 / 20%)'
  },
  button: {
    height: '38px',
    width: '34px',
    border: 'none',
    backgroundColor: 'initial',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  buttonActive: {
    // background: '#f2f5f6',
    background: 'linear-gradient(180deg,#f2f5f6 0,#e3eaed 37%,#c8d7dc)',
    border: '1px solid #97c3e8',
    boxShadow: '0 0 5px rgb(136 231 255 / 74%)'
  }
});

const NgeoMap = ({ layers = [], capabilities = [] }) => {
  const classes = useStyles();

  // Get currently logged in user
  const {
    data: user,
    isError: userError,
    isLoading: userLoading,
    isSuccess: userSuccess
  } = useUser();

  // Load field officer details if current user is a field officer
  const { data: fieldOfficer } = useFieldOfficer();

  const { data: themeData, isLoading, isSuccess: themeSuccess } = useThemes();

  let themes = [];
  if (themeSuccess) {
    themes = themeData.map((theme) => ({
      id: theme.id,
      name: theme.attributes.name,
      color: theme.attributes.color
    }));
  }

  // Get is authenticated only after user query is complete
  const isAuthenticated = !userLoading && !userError && user.isAuthenticated;

  // Set type of geometry to draw on map
  const [drawType, setDrawType] = React.useState('None');
  const [measureType, setMeasureType] = React.useState('None');
  const [activeButton, setActiveButton] = React.useState('cancel');

  // Map layers
  const [adminLayers, setAdminLayers] = React.useState([]);
  const [installationLayers, setInstallationLayers] = React.useState([]);
  const [myDataLayers, setMyDataLayers] = React.useState([]);
  // Sidebar content to control layers
  const [adminBoundaryContent, setAdminBoundaryContent] = React.useState([]);
  const [installationContent, setInstallationContent] = React.useState([]);
  const [myDataContent, setMyDataContent] = React.useState([]);

  // Admin Boundaries
  const [showRegion, setShowRegion] = useState(false);
  const [showCounty, setShowCounty] = useState(false);
  const [showSubCounty, setShowSubCounty] = useState(false);
  const [showConstituency, setShowConstituency] = useState(false);
  const [showDivision, setShowDivision] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showSubLocation, setShowSubLocation] = useState(false);
  const [showBoundary, setShowBoundary] = useState(false);
  const [showTransparentBoundary, setShowTransparentBoundary] = useState(false);

  // UserAdmin Boundaries
  const [showUserRegion, setShowUserRegion] = useState(false);
  const [showUserCounty, setShowUserCounty] = useState(false);
  const [showUserSubCounty, setShowUserSubCounty] = useState(false);
  const [showUserConstituency, setShowUserConstituency] = useState(false);
  const [showUserDivision, setShowUserDivision] = useState(false);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [showUserSubLocation, setShowUserSubLocation] = useState(false);

  // Installations
  const [showRoadClassA, setShowRoadClassA] = useState(false);
  const [showRoadClassB, setShowRoadClassB] = useState(false);
  const [showRoadClassC, setShowRoadClassC] = useState(false);
  const [showRoadClassD, setShowRoadClassD] = useState(false);
  //
  const [showInstituteOfTechnology, setShowInstituteOfTechnology] = useState(
    false
  );
  const [showNgao, setShowNgao] = useState(false);
  const [showNPS, setShowNPS] = useState(false);
  const [showForestStation, setShowForestStation] = useState(false);
  const [showForest, setShowForest] = useState(false);
  const [showSafaricomBTS, setShowSafaricomBTS] = useState(false);
  const [showTelkomBTS, setShowTelkomBTS] = useState(false);
  const [showPolytechnic, setShowPolytechnic] = useState(false);
  const [showPowerStation, setShowPowerStation] = useState(false);
  const [showPrimarySchool, setShowPrimarySchool] = useState(false);
  const [showSecondarySchool, setShowSecondarySchool] = useState(false);
  const [showHealthCentres, setShowHealthCentres] = useState(false);
  //
  const [showTownOther, setShowTownOther] = useState(false);
  const [showTownDist, setShowTownDist] = useState(false);
  const [showTownDiv, setShowTownDiv] = useState(false);
  const [showTownRegion, setShowTownRegion] = useState(false);
  const [showUniversity, setShowUniversity] = useState(false);
  const [showKTTC, setShowKTTC] = useState(false);
  const [showLakes, setShowLakes] = useState(false);

  // My Data
  const [showIncident, setShowIncident] = useState(false);
  const [showThreat, setShowThreat] = useState(false);
  const [showProject, setShowProject] = useState(true);
  const [showJurisdiction, setShowJurisdiction] = useState(true);

  const toggleShowUserLayer = (layerName) => {
    switch (layerName.toLocaleLowerCase()) {
      // User Areas
      // Admin Boundaries
      case 'ke_region':
        setShowUserRegion(!showUserRegion);
        break;
      case 'ke_county':
        setShowUserCounty(!showUserCounty);
        break;
      case 'ke_sub_county':
        setShowUserSubCounty(!showUserSubCounty);
        break;
      case 'ke_constituency':
        setShowUserConstituency(!showUserConstituency);
        break;
      case 'ke_division':
        setShowUserDivision(!showUserDivision);
        break;
      case 'ke_location':
        setShowUserLocation(!showUserLocation);
        break;
      case 'ke_sub_location':
        setShowUserSubLocation(!showUserSubLocation);
        break;
      default:
    }
  };

  const toggleShowLayer = (layerName) => {
    switch (layerName.toLocaleLowerCase()) {
      // Admin Boundaries
      case 'ke_region':
        setShowRegion(!showRegion);
        break;
      case 'ke_county':
        setShowCounty(!showCounty);
        break;
      case 'ke_sub_county':
        setShowSubCounty(!showSubCounty);
        break;
      case 'ke_constituency':
        setShowConstituency(!showConstituency);
        break;
      case 'ke_division':
        setShowDivision(!showDivision);
        break;
      case 'ke_location':
        setShowLocation(!showLocation);
        break;
      case 'ke_sub_location':
        setShowSubLocation(!showSubLocation);
        break;
      case 'ke_national_boundary':
        setShowBoundary(!showBoundary);
        break;
      case 'ke_transparent_boundary':
        setShowTransparentBoundary(!showTransparentBoundary);
        break;
      case 'jurisdiction':
        setShowJurisdiction(!showJurisdiction);
        break;
      // Installations
      case 'ke_class_a_road':
        setShowRoadClassA(!showRoadClassA);
        break;
      case 'ke_class_b_road':
        setShowRoadClassB(!showRoadClassB);
        break;
      case 'ke_class_c_road':
        setShowRoadClassC(!showRoadClassC);
        break;
      case 'ke_class_d_road':
        setShowRoadClassD(!showRoadClassD);
        break;
      case 'ke_forest_station':
        setShowForestStation(!showForestStation);
        break;
      case 'ke_nps':
        setShowNPS(!showNPS);
        break;
      case 'ke_ngao':
        setShowNgao(!showNgao);
        break;
      case 'ke_institute_of_technology':
        setShowInstituteOfTechnology(!showInstituteOfTechnology);
        break;
      case 'ke_gazetted_forest':
        setShowForest(!showForest);
        break;
      case 'ke_safaricom_bts':
        setShowSafaricomBTS(!showSafaricomBTS);
        break;
      case 'ke_telkom_bts':
        if (showTelkomBTS) {
          setShowTelkomBTS(false);
        } else {
          setShowTelkomBTS(true);
        }

        break;
      case 'ke_polytechnic':
        setShowPolytechnic(!showPolytechnic);
        break;
      case 'ke_power_station':
        setShowPowerStation(!showPowerStation);
        break;
      case 'ke_primary_schools':
        setShowPrimarySchool(!showPrimarySchool);
        break;
      case 'ke_secondary_school':
        setShowSecondarySchool(!showSecondarySchool);
        break;
      case 'ke_health_facility':
        setShowHealthCentres(!showHealthCentres);
        break;
      case 'ke_town_other':
        setShowTownOther(!showTownOther);
        break;
      case 'ke_town_disthq':
        setShowTownDist(!showTownDist);
        break;
      case 'ke_town_divhq':
        setShowTownDiv(!showTownDiv);
        break;
      case 'ke_town_regionhq':
        setShowTownRegion(!showTownRegion);
        break;
      //
      case 'ke_university':
        setShowUniversity(!showUniversity);
        break;
      case 'ke_lakes':
        setShowLakes(!showLakes);
        break;
      case 'ke_teachers_training_college':
        setShowKTTC(!showKTTC);
        break;
      case 'incidence_incident':
        setShowIncident(!showIncident);
        break;
      case 'threat_threat':
        setShowThreat(!showThreat);
        break;
      case 'projects_project':
        let toggleProject = !showProject;
        setShowProject(!showProject);
        // Event handled in src/views/ngeoMap/Controls/SelectControl module
        window.emitter.emit('onToggleProjects', toggleProject);
        break;
      // User Areas
      // Admin Boundaries
      case 'ke_region':
        setShowUserRegion(!showUserRegion);
        break;
      case 'ke_county':
        setShowUserCounty(!showUserCounty);
        break;
      case 'ke_sub_county':
        setShowUserSubCounty(!showUserSubCounty);
        break;
      case 'ke_constituency':
        setShowUserConstituency(!showUserConstituency);
        break;
      case 'ke_division':
        setShowUserDivision(!showUserDivision);
        break;
      case 'ke_location':
        setShowUserLocation(!showUserLocation);
        break;
      case 'ke_sub_location':
        setShowUserSubLocation(!showUserSubLocation);
        break;
      default:
    }
  };

  const isFinance = useFinance();
  const isCEO = useCEO();
  const isCM = isCountyManager(user?.attributes.role); // useCM();
  const isRM = useRM();
  const isFOO = useFOO();
  const userData = user ? user.attributes : {};
  let nationalBoundaryExtent = null;

  // const { map } = React.useContext(MapContext);

  const interactions = [
    <DrawInteraction type={drawType} setType={setDrawType} />,
    <MeasureInteraction measureType={measureType} setType={setMeasureType} />
  ];

  React.useEffect(async () => {
    const fooData = fieldOfficer ? fieldOfficer : {};
    let userAreaObject = { name: '', type: '' };

    layers.forEach((layer) => {
      let groupTitle = layer.layerGroup.title;

      // List of layers in this group
      let groupLayers = layer.layerGroup.publishables.published;
      // One group layer comes as an object, not an array.
      // This makes it into an array that's amenable to be looped
      // over, makes sure loop logic below wont be changed for this
      // special case.
      if (!Array.isArray(groupLayers)) {
        groupLayers = [groupLayers];
      }

      if (groupTitle.toLocaleLowerCase().includes('admin boundaries')) {
        /* ================================ Admin Boundaries ================================= */

        // Global container for admin checkbox items to control visibility of corresponding layers
        const adminBoundaryItems = [];
        // Global container to hold all layers in this group
        let adminLayers = [];

        // Create layers and their corresponding control item and update above
        // containers.
        groupLayers.forEach((layer) => {
          const layerName = layer.name.split(':')[1];
          // Get this layer's capability info.
          const capability = capabilities.filter((c) => c.name === layer.name);
          let title = '';
          let adminLayerControl = null;
          let hide = false;
          let extentCRS = null;
          let maxZoom = null;
          let minZoom = null;
          let style = null;
          let visible = isFinance || isCEO || !isAuthenticated;
          let isVisible = false;
          let zIndex = 0;
          let userArea = null;
          let isUserArea = false;
          let adminLayer = null;
          let url = null;
          // params for WMS Image layers
          let params = {
            LAYERS: layerName,
            Tiled: false
          };

          if (capability && capability.length > 0) {
            [{ title, extentCRS }] = capability;
            // update layer extent from capability info
          }

          // Layer specific data
          switch (layerName.toLocaleLowerCase()) {
            //
            case 'ke_national_boundary':
              maxZoom = 7.5;
              zIndex = BOUNDARY_ZINDEX_OFFSET + groupLayers.length;
              visible = true;
              isVisible = true;
              hide = true;
              // set this layer's extent as default extent for when user
              // does not have jurisdiction area.
              nationalBoundaryExtent = extentCRS;
              break;
            case 'ke_transparent_boundary':
              // Highest z-Index
              zIndex =
                BOUNDARY_ZINDEX_OFFSET +
                MYDATA_ZINDEX_OFFSET +
                INSTALLATIONS_ZINDEX_OFFSET;
              // Always visible
              visible = true;
              isVisible = true;
              hide = true;
              // minZoom = 7.5;
              nationalBoundaryExtent = extentCRS;
              break;

            // layers whose visibility can be manually set
            case 'ke_region':
              zIndex = BOUNDARY_ZINDEX_OFFSET + groupLayers.length;
              minZoom = 0;
              maxZoom = 9;
              isVisible = showRegion;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_county':
              minZoom = 9;
              maxZoom = 10.5;
              zIndex = BOUNDARY_ZINDEX_OFFSET + groupLayers.length - 2;

              isVisible = showCounty;
              if (isVisible) {
                minZoom = null;
                maxZoom = null;
                zIndex = MYDATA_ZINDEX_OFFSET;
                visible = true;
              }

              break;

            // case 'ke_constituency':
            //   zIndex = BOUNDARY_ZINDEX_OFFSET + (groupLayers.length - 3);
            //   minZoom = 10;
            //   maxZoom = 11.5;
            //   title = 'Sub County';
            //   isVisible = showConstituency;
            //   if (isVisible) {
            //     minZoom = null;
            //     zIndex = MYDATA_ZINDEX_OFFSET;
            //     visible = true;
            //   }
            //   break;

            case 'ke_sub_county':
              zIndex = BOUNDARY_ZINDEX_OFFSET + (groupLayers.length - 3);
              minZoom = 10;
              maxZoom = 11.5;
              title = 'Sub County';
              isVisible = showSubCounty;
              if (isVisible) {
                minZoom = null;
                maxZoom = null;
                zIndex = MYDATA_ZINDEX_OFFSET;
                visible = true;
              }
              break;

            case 'ke_division':
              minZoom = 11;
              maxZoom = 12.5;
              zIndex = BOUNDARY_ZINDEX_OFFSET + (groupLayers.length - 4);
              isVisible = showDivision;
              if (isVisible) {
                minZoom = null;
                maxZoom = null;
                zIndex = MYDATA_ZINDEX_OFFSET;
                visible = true;
              }
              break;

            case 'ke_location':
              minZoom = 12;
              maxZoom = 13.5;
              zIndex = BOUNDARY_ZINDEX_OFFSET + (groupLayers.length - 5);
              isVisible = showLocation;
              if (isVisible) {
                minZoom = null;
                maxZoom = null;
                zIndex = MYDATA_ZINDEX_OFFSET;
                visible = true;
              }
              break;
            case 'ke_sub_location':
              minZoom = 13;
              maxZoom = 30;
              zIndex = BOUNDARY_ZINDEX_OFFSET + (groupLayers.length - 6);
              isVisible = showSubLocation;
              if (isVisible) {
                minZoom = null;
                maxZoom = null;
                zIndex = MYDATA_ZINDEX_OFFSET;
                visible = true;
              }
              break;

            default:
          }

          // get user's areas and update visibility variable
          if (isAuthenticated) {
            // Get user Area description
            if (userData.role && userData.role == roles.RM) {
              if (layerName.toLocaleLowerCase().includes('ke_region')) {
                userArea = userData.area.region;
                userArea = userArea && userArea.toLocaleLowerCase();
                let areaFilter = `strToLowerCase (REGION) like '${userArea}'`;
                url = createFilterFeatureQuery(layerName, areaFilter);

                // Update global user area object
                userAreaObject.type = 'REGION';
                userAreaObject.name = userArea;
                userAreaObject.layerName = layerName;
                userAreaObject.url = url;
                userAreaObject.areaFilter = areaFilter;
              }
            }

            if (userData.role && userData.role == roles.CM) {
              // Execute only only when layer name is county
              if (layerName.toLocaleLowerCase().includes('ke_county')) {
                userArea = userData.area.county;
                // Nairobi region only has Nairobi County
                if (
                  userData.area.region.toLocaleLowerCase().includes('nairobi')
                ) {
                  userArea = 'Nairobi';
                }
                userArea = userArea && userArea.toLocaleLowerCase();
                let areaFilter = `strToLowerCase (COUNTY) like '${userArea}'`;
                url = createFilterFeatureQuery(layerName, areaFilter);

                // Update user area object
                userAreaObject.type = 'COUNTY';
                userAreaObject.name = userArea;

                // set this user's county in global user area object
                userAreaObject.layerName = layerName;
                userAreaObject.url = url;
                userAreaObject.areaFilter = areaFilter;
              }
            }

            if (userData.role && userData.role == roles.FOO) {
              let county = userData.area.county;
              let constituency = userData.area.constituency;
              let subCounty = userData.area.sub_county;
              let division = userData.area.division;
              let location = userData.area.location;
              let subLocation = userData.area.sub_location;

              // Nairobi region only has Nairobi County
              if (
                userData.area.region.toLocaleLowerCase().includes('nairobi')
              ) {
                county = 'Nairobi';
              }

              // set this user's county in global user object
              userAreaObject.county = county ? county.toLocaleLowerCase() : '';

              if (
                !constituency?.length &&
                !subCounty?.length &&
                !division?.length &&
                !location?.length &&
                !subLocation?.length
              ) {
                if (
                  county &&
                  layerName.toLocaleLowerCase().includes('ke_county')
                ) {
                  userArea = county;
                  userArea = userArea && userArea.toLocaleLowerCase();
                  let areaFilter = `strToLowerCase (COUNTY) like '${userArea}'`;
                  url = createFilterFeatureQuery(layerName, areaFilter);
                  userAreaObject.type = 'COUNTY';
                  userAreaObject.name = userArea;
                  userAreaObject.layerName = layerName;
                  userAreaObject.url = url;
                  userAreaObject.areaFilter = areaFilter;
                }
              }

              if (
                constituency &&
                constituency.length > 0 &&
                layerName.toLocaleLowerCase().includes('ke_constituency')
              ) {
                userArea = constituency[0];
                userArea = userArea && userArea.toLocaleLowerCase();
                let areaFilter = `strToLowerCase (CONSTITUEN) like '${userArea}'`;
                url = createFilterFeatureQuery(layerName, areaFilter);
                userAreaObject.type = 'CONSTITUEN';
                userAreaObject.name = userArea;
                userAreaObject.layerName = layerName;
                userAreaObject.url = url;
                userAreaObject.areaFilter = areaFilter;
              }

              if (
                subCounty &&
                subCounty.length > 0 &&
                layerName.toLocaleLowerCase().includes('ke_sub_county')
              ) {
                userArea = subCounty[0];
                userArea = userArea && userArea.toLocaleLowerCase();
                let areaFilter = `strToLowerCase (SUB_COUN) like '${userArea}'`;
                url = createFilterFeatureQuery(layerName, areaFilter);
                userAreaObject.type = 'SUB_COUN';
                userAreaObject.name = userArea;
                userAreaObject.layerName = layerName;
                userAreaObject.url = url;
                userAreaObject.areaFilter = areaFilter;
              }

              if (
                division &&
                division.length > 0 &&
                layerName.toLocaleLowerCase().includes('ke_division')
              ) {
                userArea = division[0];
                userArea = userArea && userArea.toLocaleLowerCase();
                let areaFilter = `strToLowerCase (DIVISION) like '${userArea}'`;
                url = createFilterFeatureQuery(layerName, areaFilter);

                userAreaObject.type = 'DIVISION';
                userAreaObject.name = userArea;
                userAreaObject.layerName = layerName;
                userAreaObject.url = url;
                userAreaObject.areaFilter = areaFilter;
              }

              if (
                location &&
                location.length > 0 &&
                layerName.toLocaleLowerCase().includes('ke_location')
              ) {
                userArea = location[0];
                userArea = userArea && userArea.toLocaleLowerCase();
                let areaFilter = `strToLowerCase (LOCATION) like '${userArea}'`;

                url = createFilterFeatureQuery(layerName, areaFilter);
                userAreaObject.type = 'LOCATION';
                userAreaObject.name = userArea;
                userAreaObject.layerName = layerName;
                userAreaObject.url = url;
                userAreaObject.areaFilter = areaFilter;
              }

              if (
                subLocation &&
                subLocation.length > 0 &&
                layerName.toLocaleLowerCase().includes('ke_sub_location')
              ) {
                userArea = subLocation[0];
                userArea = userArea && userArea.toLocaleLowerCase();
                let areaFilter = `strToLowerCase (SUB_LOCATI) like '${userArea}'`;
                url = createFilterFeatureQuery(layerName, areaFilter);

                userAreaObject.type = 'SUB_LOCATI';
                userAreaObject.name = userArea;
                userAreaObject.layerName = layerName;
                userAreaObject.url = url;
                userAreaObject.areaFilter = areaFilter;
              }
            }
          }

          adminLayer = (
            <ImageLayer
              key={helpers.getUID()}
              source={vectorSourceImageWMS({
                params
              })}
              extent={extentCRS}
              maxZoom={maxZoom}
              minZoom={minZoom}
              zIndex={zIndex}
              style={style}
              visible={visible}
              isVisible={isVisible}
              nationalBoundaryExtent={nationalBoundaryExtent}
            />
          );

          adminLayerControl = (
            <ListItem name={title} key={helpers.getUID()} hide={hide}>
              <input
                type="checkbox"
                checked={isVisible}
                onChange={() => {
                  toggleShowLayer(layerName);
                }}
              />
            </ListItem>
          );

          // collect all admin layers
          adminLayers.push(adminLayer);
          // adminLayers.push(countiesLayer);
          adminBoundaryItems.push(adminLayerControl);
        });

        const adminBoundaryLayerItems = (
          <AccordionItem title={groupTitle}>{adminBoundaryItems}</AccordionItem>
        );
        // drawerContent.push(adminBoundaryLayers);
        setAdminLayers(adminLayers);
        setAdminBoundaryContent([adminBoundaryLayerItems]);
      }

      if (groupTitle.toLocaleLowerCase().includes('installations')) {
        /* ================================ Installations ====================================== */
        let installationItems = [];
        let installationLayers = [];

        let zIndex = INSTALLATIONS_ZINDEX_OFFSET;

        groupLayers.forEach((layer, index) => {
          const layerName = layer.name.split(':')[1];
          const capability = capabilities.filter((c) => c.name === layer.name);

          // Url for all features
          let url = createGetFeatureQuery(layerName);
          // url for area specific features
          if (userAreaObject.name) {
            let areaName = userAreaObject.name.substring(0, 6);
            let areaType = `${userAreaObject.type}_1`;
            if (
              userAreaObject.type.toLocaleLowerCase().includes('sub_') ||
              userAreaObject.type.toLocaleLowerCase().includes('constituen')
            ) {
              areaType = userAreaObject.type;
            }
            url = createFilterFeatureQuery(
              layerName,
              `strToLowerCase (${areaType}) like '${areaName}%'`
            );
            url = encodeURI(url);
          }

          let installationLayer = null;
          // input checkbox variable
          let title = '';
          // layer variables
          let extentCRS = null;
          let style = null;
          let minZoom = null;
          let maxZoom = null;
          let minResolution = null;
          let maxResolution = null;
          let visible = false;
          let isVisible = false;
          let hide = false;
          zIndex = zIndex + index;

          if (capability && capability.length > 0) {
            [{ title, extentCRS }] = capability;
          }

          // layer Visibility toggle
          switch (layerName.toLocaleLowerCase()) {
            // Roads - set to visible to true on show road
            case 'ke_class_a_road':
              //   setShowRoadClassA(!showRoadClassA);
              isVisible = showRoadClassA;
              minZoom = 8;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_class_b_road':
              //   setShowRoadClassB(!showRoadClassB);
              isVisible = showRoadClassB;
              minZoom = 8;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_class_c_road':
              isVisible = showRoadClassC;
              minZoom = 9;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_class_d_road':
              isVisible = showRoadClassD;
              minZoom = 10;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_forest_station':
              isVisible = showForestStation;
              minZoom = 10;
              style = styles.ForestStation;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_nps':
              style = styles.Police;
              isVisible = showNPS;
              minZoom = 14.5;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_ngao':
              style = styles.Admin;
              isVisible = showNgao;
              minZoom = 13.5;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_institute_of_technology':
              isVisible = showInstituteOfTechnology;
              style = styles.SchoolPoint;
              minZoom = 10;
              if (isVisible) {
                minZoom = null;
              }
              break;
            //
            case 'ke_gazetted_forest':
              isVisible = showForest;
              style = styles.forestStyleFunction;
              hide = true;
              minZoom = 11;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_safaricom_bts':
              style = styles.BTS;
              isVisible = showSafaricomBTS;
              minZoom = 16;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_telkom_bts':
              style = styles.BTS;
              isVisible = showTelkomBTS;
              minZoom = 14;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_polytechnic':
              style = styles.SchoolPoint;
              isVisible = showPolytechnic;
              minZoom = 12;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_power_station':
              isVisible = showPowerStation;
              style = styles.PowerStation;
              minZoom = 12;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_primary_schools':
              isVisible = showPrimarySchool;
              style = styles.SchoolPoint;
              minZoom = 14.5;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_secondary_school':
              style = styles.SchoolPoint;
              isVisible = showSecondarySchool;
              minZoom = 12;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_health_facility':
              style = styles.HospitalPoint;
              isVisible = showHealthCentres;
              minZoom = 13.5;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_town_other':
              isVisible = showTownOther;
              minZoom = 13.5;
              hide = true;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_town_disthq':
              isVisible = showTownDist;
              minZoom = 13.5;
              hide = true;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_town_divhq':
              isVisible = showTownDiv;
              minZoom = 13.5;
              hide = true;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_town_regionhq':
              isVisible = showTownRegion;
              minZoom = 13.5;
              hide = true;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_university':
              style = styles.SchoolPoint;
              isVisible = showUniversity;
              minZoom = 9;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_lakes':
              isVisible = showLakes;
              minZoom = 9;
              hide = true;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_teachers_training_college':
              style = styles.SchoolPoint;
              isVisible = showKTTC;
              minZoom = 10;
              if (isVisible) {
                minZoom = null;
              }
              break;
            default:
          }

          // If un-authenticated, the following should be automatically visible
          // Update visible and minZoom fields for this special case only
          if (!isAuthenticated) {
            visible =
              layerName.toLocaleLowerCase().includes('ke_gazetted_forest') ||
              layerName.toLocaleLowerCase().includes('ke_class_a_road') ||
              layerName.toLocaleLowerCase().includes('ke_class_b_road') ||
              layerName.toLocaleLowerCase().includes('ke_lakes') ||
              layerName.toLocaleLowerCase().includes('ke_town_regionhq');
            if (visible) {
              minZoom = null;
            }
          }

          // Enable Finance and CEO and un-auth users to view all installations based on zoom level
          isVisible = isVisible || isFinance || isCEO || !isAuthenticated;

          /* =============== Create installation layers =================== */
          // Load towns as WMS layer
          if (
            layerName.toLocaleLowerCase().includes('town') ||
            layerName.toLocaleLowerCase().includes('lakes') ||
            layerName.toLocaleLowerCase().includes('road')
          ) {
            const opacity = layerName.toLocaleLowerCase().includes('road')
              ? 0.5
              : null;
            let params = {
              LAYERS: layerName,
              Tiled: true
            };
            // Filter data for this area only
            // if (userAreaObject.name) {
            //   let areaName = userAreaObject.name.substring(0, 6);
            //   let filterString = `strToLowerCase (${userAreaObject.type}) like '${areaName}%'`;
            //   params.CQL_FILTER = filterString;
            // }

            if (userAreaObject.name) {
              let areaName = userAreaObject.name.substring(0, 6);
              let areaType = `${userAreaObject.type}_1`;
              if (
                userAreaObject.type.toLocaleLowerCase().includes('sub_') ||
                userAreaObject.type.toLocaleLowerCase().includes('constituen')
              ) {
                areaType = userAreaObject.type;
              }
              let filterString = `strToLowerCase (${areaType}) like '${areaName}%'`;
              params.CQL_FILTER = filterString;
            }

            installationLayer = (
              <TileLayer
                key={helpers.getUID()}
                source={vectorSourceWMS({
                  params
                })}
                extent={extentCRS}
                minZoom={minZoom}
                minResolution={minResolution}
                maxResolution={maxResolution}
                visible={visible}
                isVisible={isVisible}
                zIndex={zIndex}
                style={style}
                opacity={opacity}
              />
            );
          } else {
            // load everything else as vector layer
            installationLayer = (
              <VectorLayer
                key={helpers.getUID()}
                source={vectorGeoJson({
                  url
                })}
                extent={extentCRS}
                style={style}
                minZoom={minZoom}
                minResolution={minResolution}
                maxResolution={maxResolution}
                zIndex={zIndex}
                visible={visible}
                isVisible={isVisible}
              />
            );
          }

          let installationItem = null;

          if (
            ![
              'ke_class_a_road',
              'ke_class_b_road',
              'ke_class_c_road',
              'ke_class_d_road'
            ].includes(layerName.toLocaleLowerCase()) // Remove these from the side bar
          ) {
            // check box input item to control visibility of associated layer
            installationItem = (
              <ListItem name={title} hide={hide}>
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => {
                    toggleShowLayer(layerName);
                  }}
                />
              </ListItem>
            );
          }

          // Update installation layer list with this layer
          installationLayers.push(installationLayer);
          // Layer UI control: Update installation checkbox input items with checkbox for this layer
          installationItems.push(installationItem);
        });

        const installationLayerItems = (
          <AccordionItem title={groupTitle}>{installationItems}</AccordionItem>
        );

        setInstallationLayers(installationLayers);
        setInstallationContent([installationLayerItems]);
      }

      if (groupTitle.toLocaleLowerCase().includes('my data')) {
        /* ================================ Installations ====================================== */
        let myDataItems = [];
        let myDataLayers = [];

        let isJurisdictionVisible = showJurisdiction;
        let jurisdictionURL = '';
        if (userAreaObject.name) {
          jurisdictionURL = userAreaObject.url;
        }

        groupLayers.forEach((layer, index) => {
          const layerName = layer.name.split(':')[1];

          const capability = capabilities.filter((c) => c.name === layer.name);
          let url = createGetFeatureQuery(layerName);
          let myDataURL = '';
          let cql_filter = '';
          //
          let title = '';
          let extentCRS = null;
          let visible = false;
          let isVisible = false;
          let myDataLayer = null;
          let style = null;
          let minZoom = null;
          let maxZoom = null;
          let zIndex = 0;
          let hide = !Boolean(userAreaObject.name);

          // params for WMS Image layers
          let params = {
            LAYERS: layerName,
            Tiled: false
          };

          if (capability && capability.length > 0) {
            [{ title, extentCRS }] = capability;
          }

          switch (layerName.toLocaleLowerCase()) {
            case 'incidence_incident':
              isVisible = showIncident;
              style = styles.generalStyle;
              minZoom = 8;
              if (isVisible) {
                minZoom = null;
              }
              break;

            case 'threat_threat':
              isVisible = showThreat;
              style = styles.arrowStyleFunction;
              minZoom = 8;
              if (isVisible) {
                minZoom = null;
              }
              // filter by destination county if user area is county
              if (userAreaObject.county) {
                url = createFilterFeatureQuery(
                  layerName,
                  `strToLowerCase (destination) like '${userAreaObject.county}' or strToLowerCase (origin) like '${userAreaObject.county}'`
                );
              }

              //
              if (userAreaObject.type === 'REGION') {
                url = createFilterFeatureQuery(
                  layerName,
                  `strToLowerCase (to_region) like '${userAreaObject.name}' or strToLowerCase (from_region) like '${userAreaObject.name}'`
                );
              }
              break;
            case 'projects_project':
              isVisible = showProject;
            // projectSource = new VectorSource();

            /**
             * User Specific boundary
             */
            // layers whose visibility can be manually set
            case 'ke_region':
              zIndex = BOUNDARY_ZINDEX_OFFSET + groupLayers.length;
              minZoom = 0;
              maxZoom = 9;
              isVisible = showUserRegion;
              hide = isRM || isCM || isFOO || hide;
              if (isVisible) {
                minZoom = null;
              }
              break;
            case 'ke_county':
              minZoom = 9;
              maxZoom = 10.5;
              zIndex = BOUNDARY_ZINDEX_OFFSET + groupLayers.length - 2;
              hide = isCM || hide;

              isVisible = showUserCounty;
              if (isVisible) {
                minZoom = null;
                maxZoom = null;
                zIndex = MYDATA_ZINDEX_OFFSET;
                visible = true;
              }

              break;

            case 'ke_constituency':
              zIndex = BOUNDARY_ZINDEX_OFFSET + (groupLayers.length - 3);
              minZoom = 10;
              maxZoom = 11.5;
              title = 'Sub County';
              hide = true;
              isVisible = showConstituency;
              if (isVisible) {
                minZoom = null;
                zIndex = MYDATA_ZINDEX_OFFSET;
                visible = true;
              }
              break;

            case 'ke_sub_county':
              zIndex = BOUNDARY_ZINDEX_OFFSET + (groupLayers.length - 3);
              minZoom = 10;
              maxZoom = 11.5;
              isVisible = showUserSubCounty;

              if (isVisible) {
                minZoom = null;
                maxZoom = null;
                zIndex = MYDATA_ZINDEX_OFFSET;
                visible = true;
              }
              break;

            case 'ke_division':
              minZoom = 11;
              maxZoom = 12.5;
              zIndex = BOUNDARY_ZINDEX_OFFSET + (groupLayers.length - 4);
              isVisible = showUserDivision;

              if (isVisible) {
                minZoom = null;
                maxZoom = null;
                zIndex = MYDATA_ZINDEX_OFFSET;
                visible = true;
              }
              break;

            case 'ke_location':
              // debugger;
              minZoom = 12;
              maxZoom = 13.5;
              zIndex = BOUNDARY_ZINDEX_OFFSET + (groupLayers.length - 5);
              isVisible = showUserLocation;

              if (isVisible) {
                minZoom = null;
                maxZoom = null;
                zIndex = MYDATA_ZINDEX_OFFSET;
                visible = true;
              }
              break;
            case 'ke_sub_location':
              minZoom = 13;
              maxZoom = 30;
              zIndex = BOUNDARY_ZINDEX_OFFSET + (groupLayers.length - 6);
              isVisible = showUserSubLocation;
              if (isVisible) {
                minZoom = null;
                maxZoom = null;
                zIndex = MYDATA_ZINDEX_OFFSET;
                visible = true;
              }
              break;

            default:
          }

          if (isAuthenticated) {
            // Project layer already added to map in Controls section, so skip it
            if (userAreaObject.name) {
              let areaName = userAreaObject.name.substring(0, 6);
              let areaType = `${userAreaObject.type}_1`;
              if (
                userAreaObject.type.toLocaleLowerCase().includes('sub_') ||
                userAreaObject.type.toLocaleLowerCase().includes('constituen')
              ) {
                areaType = userAreaObject.type;
              }
              let filterString = `strToLowerCase (${areaType}) like '${areaName}%'`;
              params.CQL_FILTER = filterString;
            }

            // If the layer is not a project layer, proceed i,e skip project project layer, its already added
            if (!layerName.toLocaleLowerCase().includes('project')) {
              // If non-boundary layer: threat, incident
              if (layerName.toLocaleLowerCase().includes('threat')) {
                myDataLayer = (
                  <VectorLayer
                    key={helpers.getUID()}
                    source={vectorGeoJson({
                      url
                    })}
                    extent={extentCRS}
                    visible={isVisible}
                    style={style}
                    minZoom={minZoom}
                    zIndex={MYDATA_ZINDEX_OFFSET + index}
                  />
                );
              } else {
                params.CQL_FILTER = userAreaObject.areaFilter;
                myDataLayer = (
                  <ImageLayer
                    key={helpers.getUID()}
                    source={vectorSourceImageWMS({
                      params
                    })}
                    extent={extentCRS}
                    maxZoom={maxZoom}
                    minZoom={minZoom}
                    zIndex={zIndex}
                    visible={visible}
                    isVisible={isVisible}
                  />
                );
              }
            }
          }

          // Data Item control layer
          let myDataItem = null;
          if (layerName.toLocaleLowerCase().includes('project')) {
            // =============== Project Layer Control Section =============

            myDataItem = (
              <div>
                <ListItem name={`${title}`} key={helpers.getUID()}>
                  <div>
                    <input
                      type="checkbox"
                      checked={showProject}
                      onChange={() => {
                        toggleShowLayer(layerName);
                      }}
                    />
                  </div>
                </ListItem>
                <div className={classes.legendContainer}>
                  {themes.map((theme) => (
                    <ListItem name={theme.name} key={helpers.getUID()}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div
                          className={classes.circle}
                          style={{
                            marginLeft: '1em',
                            backgroundColor: `${theme.color}`
                          }}
                        />
                      </div>
                    </ListItem>
                  ))}
                </div>
              </div>
            );
          } else if (layerName.toLocaleLowerCase().includes('threat')) {
            myDataItem = (
              <ListItem name={title} key={helpers.getUID()}>
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => {
                    toggleShowLayer(layerName);
                  }}
                />
              </ListItem>
            );
          } else {
            myDataItem = (
              <ListItem name={title} key={helpers.getUID()} hide={hide}>
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => {
                    toggleShowUserLayer(layerName);
                  }}
                />
              </ListItem>
            );
          }

          myDataLayers.push(myDataLayer);
          myDataItems.push(myDataItem);
        });

        // ======================= Jurisdiction Area ===================================
        let jurisdictionLayer = (
          <VectorLayer
            key={helpers.getUID()}
            source={vectorGeoJson({
              url: jurisdictionURL
            })}
            visible={isJurisdictionVisible}
            isVisible={isJurisdictionVisible}
            style={styles.userAreaFunction}
            zIndex={MYDATA_ZINDEX_OFFSET * 1.5}
            type="area"
            areaType={userAreaObject.type}
            isUserArea={true}
          />
        );

        let jurisdictionLayerControl = (
          <ListItem name={'Jurisdiction Area'} key={helpers.getUID()}>
            <input
              type="checkbox"
              checked={showJurisdiction}
              onChange={() => {
                toggleShowLayer('jurisdiction');
              }}
            />
          </ListItem>
        );

        if (userAreaObject.name) {
          myDataLayers.push(jurisdictionLayer);
          myDataItems.push(jurisdictionLayerControl);
        }

        // ================================= End of Jurisdiction Area ===================================

        // =============================== User Specific Admin boundaries ===============================
        // =============================== End of user specific admin biundaries ========================

        const myDataLayerItems = (
          <AccordionItem title={groupTitle}>{myDataItems}</AccordionItem>
        );
        setMyDataLayers(myDataLayers);
        setMyDataContent([myDataLayerItems]);
      }
    });
  }, [
    layers,
    isAuthenticated,
    user,
    fieldOfficer,
    capabilities,
    // Installations
    showForestStation,
    showUniversity,
    showRoadClassA,
    showRoadClassB,
    showRoadClassC,
    showRoadClassD,
    showNPS,
    showNgao,
    showInstituteOfTechnology,
    showHealthCentres,
    showPowerStation,
    showPrimarySchool,
    showSecondarySchool,
    showTownOther,
    showTownRegion,
    showTownDist,
    showTownDiv,
    showLakes,
    showForest,
    showTelkomBTS,
    showSafaricomBTS,
    showPolytechnic,
    showKTTC,
    // Boundaries
    showRegion,
    showCounty,
    showConstituency,
    showSubCounty,
    showDivision,
    showLocation,
    showSubLocation,
    showBoundary,
    showTransparentBoundary,
    showJurisdiction,
    // My Data'
    // showIncident,
    showThreat,
    showProject,
    // User Boundaries
    showUserRegion,
    showUserCounty,
    // showUserConstituency,
    showUserSubCounty,
    showUserDivision,
    showUserLocation,
    showUserSubLocation
  ]);

  // set map controls
  const controls = [
    <ScaleLineControl />,
    <FullScreenControl />,
    <MousePositionControl />,
    <SearchNominatimControl extent={nationalBoundaryExtent} />
    // <LegendControl style={styles.getLegendStyle} />
  ];

  if (isAuthenticated) {
    controls.push(<ProjectSelectControl />);
  }

  const drawerContent = [
    ...adminBoundaryContent,
    ...installationContent,
    ...myDataContent
  ];

  const mapLayers = [...adminLayers, ...installationLayers, ...myDataLayers];

  return (
    <div className={classes.container} id="map-theme">
      <div id="control-items" style={{ position: 'absolute' }}>
        {/** Map Controls */}
        <Controls>{controls}</Controls>
        <Navigation />
      </div>

      {/** Map Layers */}
      <Layers>{mapLayers}</Layers>

      {/** Map Interactions */}
      <Interactions>{interactions}</Interactions>

      <SideDrawer>
        {isAuthenticated && (
          <List>
            <AccordionItem title="Layers">
              <Divider
                component="li"
                style={{ backgroundColor: 'rgb(238,238,238)' }}
              />
              <div className={classes.innerContent}>{drawerContent}</div>
            </AccordionItem>
          </List>
        )}

        {isAuthenticated &&
          (userData.role == roles.CM || userData.role == roles.finance) && (
            <AccordionItem
              title={userData.role == roles.finance ? 'Projects' : 'Threats'}
            >
              <Divider
                component="li"
                style={{ backgroundColor: 'rgb(238,238,238)' }}
              />
              <div className={classes.innerContent}>
                <AccordionItem
                  title={
                    userData.role == roles.finance
                      ? 'Add Project'
                      : 'Add Threat'
                  }
                >
                  <div className={classes.buttonBar}>
                    {/** Line-string */}

                    {/* 
                  
                  <div
                  className={clsx(
                    classes.buttonContainer,
                    activeButton == 'linestring-draw'
                      ? classes.buttonActive
                      : null
                  )}
                >
                  <button
                    className={classes.button}
                    onClick={() => {
                      setDrawType('LineString');
                      setActiveButton('linestring-draw');
                    }}
                  >
                    <img src={lineIcon} />
                  </button>
                </div>
                  
                  */}

                    {/** Point */}

                    {userData.role == roles.finance && (
                      <Tooltip title="Add Feature" placement="right">
                        <div
                          className={clsx(
                            classes.buttonContainer,
                            activeButton == 'point'
                              ? classes.buttonActive
                              : null
                          )}
                        >
                          <button
                            className={classes.button}
                            onClick={() => {
                              setDrawType('Point');
                              setActiveButton('point');
                            }}
                          >
                            <img src={pointIcon} />
                          </button>
                        </div>
                      </Tooltip>
                    )}

                    {/** Arrow */}
                    <Tooltip title="Add Threat" placement="right">
                      <div
                        className={clsx(
                          classes.buttonContainer,
                          activeButton == 'arrow' ? classes.buttonActive : null
                        )}
                      >
                        <button
                          className={classes.button}
                          onClick={() => {
                            setDrawType('Arrow');
                            setActiveButton('arrow');
                          }}
                        >
                          <img src={arrowIcon} />
                        </button>
                      </div>
                    </Tooltip>

                    {/** Cancel draw */}
                    <Tooltip title="Cancel draw" placement="right">
                      <div
                        className={clsx(
                          classes.buttonContainer,
                          activeButton == 'none' ? classes.buttonActive : null
                        )}
                      >
                        <button
                          className={classes.button}
                          onClick={() => {
                            setDrawType('None');
                            setActiveButton('none');
                          }}
                        >
                          <img src={noneIcon} />
                        </button>
                      </div>
                    </Tooltip>
                  </div>
                </AccordionItem>
              </div>
            </AccordionItem>
          )}

        {/** Tools - Measurement, print, coordinates, add data */}
        <AccordionItem title="Tools">
          <Divider
            component="li"
            style={{ backgroundColor: 'rgb(238,238,238)' }}
          />
          <div className={classes.innerContent}>
            <AccordionItem title="Measure">
              <div className={classes.buttonBar}>
                {/** LineString */}
                <Tooltip title="Measure Line" placement="right">
                  <div
                    className={clsx(
                      classes.buttonContainer,
                      activeButton == 'linestring' ? classes.buttonActive : null
                    )}
                  >
                    <button
                      className={classes.button}
                      onClick={() => {
                        setMeasureType('LineString');
                        setActiveButton('linestring');
                      }}
                    >
                      <img src={polyLineIcon} />
                    </button>
                  </div>
                </Tooltip>

                {/** Area */}
                <Tooltip title="Measure Area" placement="right">
                  <div
                    className={clsx(
                      classes.buttonContainer,
                      activeButton == 'area' ? classes.buttonActive : null
                    )}
                  >
                    <button
                      className={classes.button}
                      onClick={() => {
                        setMeasureType('Area');
                        setActiveButton('area');
                      }}
                    >
                      <img src={polygonIcon} />
                    </button>
                  </div>
                </Tooltip>

                {/** Cancel */}
                <Tooltip title="Cancel Measure" placement="right">
                  <div
                    className={clsx(
                      classes.buttonContainer,
                      activeButton == 'cancel' ? classes.buttonActive : null
                    )}
                  >
                    <button
                      className={classes.button}
                      onClick={() => {
                        setMeasureType('None');
                        setActiveButton('cancel');
                      }}
                    >
                      <img src={noneIcon} />
                    </button>
                  </div>
                </Tooltip>
              </div>
            </AccordionItem>
          </div>
        </AccordionItem>
      </SideDrawer>
    </div>
  );
};

export default NgeoMap;

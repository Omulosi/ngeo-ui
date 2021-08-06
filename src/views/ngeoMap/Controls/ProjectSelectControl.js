/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import OLSelectControl from 'ol-ext/control/SelectMulti';
import SelectFulltext from 'ol-ext/control/SelectFulltext';
import SelectPopup from 'ol-ext/control/SelectPopup';
import SelectCheck from 'ol-ext/control/SelectCheck';
import SelectCondition from 'ol-ext/control/SelectCondition';
import MapContext from '../Map/MapContext';
import VectorSource from 'ol/source/Vector';
import 'ol-ext/dist/ol-ext.css';
import './controls.css';
import { axiosWithAuth } from 'src/utils/axios';
import GeoJSON from 'ol/format/GeoJSON';
import OLVectorLayer from 'ol/layer/Vector';
import { Select } from 'ol/interaction';
import { singleClick } from 'ol/events/condition';
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Icon,
  RegularShape,
  Text
} from 'ol/style';
import { agentTerms, projectThemes } from 'src/config';
import styles from '../geoStyles';

const PROJECTS_URL = 'http://127.0.0.1:8000/api/v1/projects';

const SelectControl = ({ source = new VectorSource() }) => {
  const { map } = useContext(MapContext);

  useEffect(async () => {
    if (!map) return;

    let projects = null;
    let features = [];
    try {
      // Get features and add to source
      const { data } = await axiosWithAuth().get('/projects');
      projects = data.data.results;

      //
      let featuresArray = projects.features;
      // Build features array with fields for filtering
      // Filter fields: theme, terms, agent_status etc
      // Each obj in the array should have all these fields
      // The fields should have a primitive value for ease of filtering
      // Hence every filter value that's currently a complex object is converted
      // into a primitive value.
      featuresArray = featuresArray.map((f) => {
        let filterProperties = {};
        let theme = f.properties.theme;
        filterProperties.theme = theme.name;
        filterProperties.theme_color = theme.color;
        let agent = f.properties.agent;
        if (agent && agent.length > 0) {
          filterProperties.agent_status = 'With Agents';
          agent.forEach((agent) => {
            filterProperties.terms = agentTerms[agent.terms];
          });
        } else {
          filterProperties.agent_status = 'Without Agents';
          filterProperties.terms = '';
        }

        filterProperties = { ...f.properties, ...filterProperties };
        f.properties = filterProperties;
        return f;
      });

      // Update projects with new features array that has filter fields
      projects.features = featuresArray;

      //
      features = new GeoJSON({ featureProjection: 'EPSG:3857' }).readFeatures(
        projects
      );
      source.addFeatures(features);
    } catch (err) {
      console.log(err);
    }

    if (features.length > 0) {
      // Create new layer with source containing
      map.addLayer(
        new OLVectorLayer({
          name: 'Projects',
          source,
          declutter: true,
          zIndex: 500,
          style: styles.themeStyleFunction
        })
      );
    }

    // Create a select control item.
    const selectCtrl = new OLSelectControl({
      controls: [
        new SelectFulltext({
          label: 'Name',
          property: 'name'
        }),
        new SelectPopup({
          defaultLabel: 'All',
          label: 'Themes',
          property: 'theme'
        }),
        new SelectPopup({
          defaultLabel: 'All',
          label: 'County:',
          property: 'county'
        }),
        new SelectCondition({
          label: 'Project(s) - With Agents',
          condition: { attr: 'agent_status', op: '=', val: 'With Agents' }
        }),
        new SelectCondition({
          label: 'Project(s) - Without Agents',
          condition: { attr: 'agent_status', op: '=', val: 'Without Agents' }
        }),
        new SelectCondition({
          label: `Project(s) - With ${agentTerms[3]} Agents`,
          condition: { attr: 'terms', op: '=', val: agentTerms[3] } // 3 => Contract Agent
        }),
        new SelectCondition({
          label: `Project(s) - With ${
            agentTerms[1] ? agentTerms[1] : 'Permanent'
          } Agents`,
          condition: { attr: 'terms', op: '=', val: agentTerms[1] } // 1 => Permanent HQ
        }),

        new SelectCondition({
          label: `Project(s) - With ${
            agentTerms[2] ? agentTerms[2] : 'Permanent'
          } Agents`,
          condition: { attr: 'terms', op: '=', val: agentTerms[1] } // 2 => Permanent County
        }),
        new SelectCondition({
          label: 'Project(s) - Initiated by HQ',
          condition: { attr: 'initiated_by', op: '=', val: 'HQ' }
        }),
        new SelectCondition({
          label: 'Project(s) - Initiated by County',
          condition: { attr: 'initiated_by', op: '=', val: 'COUNTY' }
        })
      ]
    });

    map.controls.push(selectCtrl);

    selectCtrl.on('select', function (e) {
      // Hide features
      source.getFeatures().forEach(function (f) {
        f.setStyle([]);
      });
      // Show current
      e.features.forEach(function (f) {
        f.setStyle(null);
      });
    });

    // Toggle show all features
    function reset(isVisible) {
      // show all projects
      if (isVisible) {
        source.getFeatures().forEach(function (f) {
          f.setStyle(null);
        });
      } else {
        // Hide all projects
        source.getFeatures().forEach(function (f) {
          f.setStyle([]);
        });
      }
    }

    const sourceCallBack = (e) => {
      if (source.getState() === 'ready') {
        source.un('change', sourceCallBack);
        // Fill the popup with feature values
        selectCtrl.getControls()[1].setValues({ sort: true });
      }
    };

    source.on('change', sourceCallBack);

    // Listen for toggle show all projects event
    window.emitter.addListener('onToggleProjects', (isVisible) => {
      reset(isVisible);
    });

    return () => map.controls.remove(selectCtrl);
  }, [map]);

  return null;
};

export default SelectControl;

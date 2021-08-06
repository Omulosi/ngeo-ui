import React from 'react';
/* eslint-disable */
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import DisplayProjects from 'src/components/DisplayProjects';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

const AgentProjects = ({ agentDetails }) => {
  const { projects } = agentDetails;

  let projectData = [];
  if (projects) {
    projectData = projects.features;
  }
  return <DisplayProjects projects={projectData} />;
};

AgentProjects.propTypes = {
  agentDetails: PropTypes.object
};

export default AgentProjects;

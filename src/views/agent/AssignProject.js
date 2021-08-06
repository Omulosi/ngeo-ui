import React from 'react';
// import PropTypes from 'prop-types';
import { useAssignProject, useProjects } from 'src/hooks/projects';
import AssignResource from 'src/components/AssignResource';
import capitalize from 'src/utils/capitalize';
import mainConfig from 'src/config/config.json';

/* eslint-disable */
const AssignProjectToAgent = ({ agentDetails, disabled }) => {
  const { agentId, is_active } = agentDetails;
  const assignProject = useAssignProject();
  const { data, isLoading: loading, error } = useProjects();

  const { siteNames } = mainConfig.globalData;

  let projectList = [];
  if (data) {
    projectList = data.results.features;
  }

  if (projectList) {
    projectList = projectList.map((project) => {
      return {
        id: project.id,
        name: capitalize(project.properties.name),
        county: project.properties.county,
        region: project.properties.region,
        assignedTo: false
      };
    });
  }

  projectList = projectList.filter((project) => !project.assignedTo);

  return (
    <AssignResource
      title={`Assign ${siteNames.Project.name}`}
      fieldLabel={siteNames.Project.name}
      resourceList={projectList}
      data={{ agent: agentId }}
      action={assignProject}
      disabled={disabled}
    />
  );
};

export default AssignProjectToAgent;

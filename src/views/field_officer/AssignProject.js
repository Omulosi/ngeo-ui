import React from 'react';
/* eslint-disable */
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { useAssignProject, useProjects } from 'src/hooks/projects';
// import useUser, { useUserProjects } from 'src/data';
import { useFieldOfficerById } from 'src/hooks/field_officers';
// import { assignProject } from 'src/redux/actions/projectActions';
import AssignResource from 'src/components/AssignResource';
import mainConfig from 'src/config/config.json';

/* eslint-disable */
const AssignProject = ({ fieldOfficerDetails = {} }) => {
  const { id } = useParams();
  const assignProject = useAssignProject();
  const { siteNames } = mainConfig.globalData;
  const { data, isLoading: loading, error } = useProjects();

  let projectList = [];
  if (data) {
    projectList = data.results.features;
  }

  if (projectList) {
    projectList = projectList.map((project) => {
      return {
        id: project.id,
        name: project.properties.name,
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
      data={{ field_officer: Number(id) }}
      action={assignProject}
    />
  );
};

AssignProject.propTypes = {
  fieldOfficerDetails: PropTypes.object
};

export default AssignProject;

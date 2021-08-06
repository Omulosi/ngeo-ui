import React from 'react';
import PropTypes from 'prop-types';
import { useAssignProject, useProjects } from 'src/hooks/projects';
// import { assignProject } from 'src/redux/actions/projectActions';
import AssignResource from 'src/components/AssignResource';

/* eslint-disable */
const AssignProject = ({ user }) => {
  const assignProject = useAssignProject();
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
      title="Assign Project"
      fieldLabel="Project"
      resourceList={projectList}
      data={user}
      action={assignProject}
    />
  );
};

AssignProject.propTypes = {
  /**
   * sample:
   * {field_officer: id}
   */
  user: PropTypes.object
};

export default AssignProject;

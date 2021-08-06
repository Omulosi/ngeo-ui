import React from 'react';
// import PropTypes from 'prop-types';
/* eslint-disable */
import { deleteProject } from 'src/redux/actions/projectActions';
import DeleteResource from 'src/components/DeleteResource';
import capitalize from 'src/utils/capitalize';
import { useDeleteProject } from 'src/hooks/projects';

const DeleteProject = ({ projectDetails: project, disabled }) => {
  const deleteProject = useDeleteProject();
  return (
    <DeleteResource
      resourceUrl={`/projects/${project.id}`}
      action={deleteProject}
      title="Discontinue"
      btnTitle="Discontinue"
      disabled={disabled}
    />
  );
};

export default DeleteProject;

import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable */
// import AssignResource from 'src/components/AssignResource';
import AddArea from './AddArea';

const AssignArea = ({ user, assigner, project, disabled }) => {
  return (
    <AddArea
      user={user}
      assigner={assigner}
      project={project}
      disabled={disabled}
    />
  );
};

AssignArea.propTypes = {
  /**
   * {field_officer: id}
   */
  user: PropTypes.object
};

export default AssignArea;

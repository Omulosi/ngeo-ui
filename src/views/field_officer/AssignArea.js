import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable */
// import AssignResource from 'src/components/AssignResource';
import AddArea from 'src/components/AddArea';

const AssignArea = ({ fieldOfficerDetails = {} }) => {
  const { id } = fieldOfficerDetails;

  return <AddArea user={{ field_officer: id }} />;
};

AssignArea.propTypes = {
  fieldOfficerDetails: PropTypes.object
};

export default AssignArea;

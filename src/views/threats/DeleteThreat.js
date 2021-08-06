import React from 'react';
// import PropTypes from 'prop-types';
/* eslint-disable */
import { deleteThreat } from 'src/redux/actions/threatAction';
import DeleteResource from 'src/components/DeleteResource';
import { useDeleteThreat } from 'src/hooks/threats';

const DeleteThreat = ({ threatDetails: threat }) => {
  const deleteThreat = useDeleteThreat();
  return (
    <DeleteResource
      resourceUrl={`/threats/${threat.id}`}
      action={deleteThreat}
      title="Deactivate Threat"
      btnTitle="Deactivate Threat"
    />
  );
};

export default DeleteThreat;

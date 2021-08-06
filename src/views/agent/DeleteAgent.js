import React from 'react';
// import PropTypes from 'prop-types';
/* eslint-disable */
import DeleteResource from 'src/components/DeleteResource';
import { useAgent, useDeleteAgent } from 'src/hooks/agents';
import mainConfig from 'src/config/config.json';
import { useCM, useFinance, useFOO } from 'src/hooks/permissions';
import { useParams } from 'react-router';

const DeleteAgent = ({ agentDetails: agent, disabled }) => {
  const { id } = useParams();
  const deleteAgent = useDeleteAgent();
  const isCM = useCM();
  const isFOO = useFOO();
  const isFinance = useFinance();

  let subTitle = null;
  if (isFOO) {
    subTitle = 'Send request to County Manager';
  }

  if (isCM && agent?.approve_delete) {
    subTitle = 'Request sent by FOO';
  }

  return (
    <DeleteResource
      resourceUrl={`/agents/${agent.agentId}`}
      action={deleteAgent}
      title="De-Register"
      btnTitle="Submit"
      subTitle={subTitle}
      reasonForDeletion={agent.delete_reason}
      disabled={disabled}
      pendingApproval={agent.approve_delete}
    />
  );
};

export default DeleteAgent;

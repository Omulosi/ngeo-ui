import React from 'react';
// import PropTypes from 'prop-types';
// import { useProjects } from 'src/hooks/projects';
// import { updateAgentToContract } from 'src/redux/actions/agentActions';
// import AssignResource from 'src/components/AssignResource';
import RequestApprovalForm from 'src/components/RequestApprovalForm';
import { useParams } from 'react-router';
import { useUpdateAgentToContract } from 'src/hooks/agents';
import mainConfig from 'src/config/config.json';
import { agentTerms } from 'src/config';

/* eslint-disable */
const RequestApproval = ({ agentDetails, pendingApproval }) => {
  const { id } = useParams();
  const updateAgentToContract = useUpdateAgentToContract();
  const { siteNames } = mainConfig.globalData;

  const { is_active } = agentDetails;

  const statusList = [
    {
      id: 1,
      name: agentTerms[3]
    }
  ];

  return (
    <RequestApprovalForm
      title={`Activate ${siteNames.Agent.name}`}
      subTitle={`Send request to ${siteNames.CM.name}`}
      fieldLabel="Choose term"
      resourceList={statusList}
      data={{ agent: id }}
      sender={{ senderID: '' }}
      action={updateAgentToContract}
      pendingApproval={pendingApproval}
      isAgentActive={is_active}
    />
  );
};

export default RequestApproval;

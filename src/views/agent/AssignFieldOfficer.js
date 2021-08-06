import React from 'react';
import { useParams } from 'react-router';
import { useFieldOfficerList } from 'src/hooks/field_officers';
import AssignResource from 'src/components/AssignResource';
import { useAssignAgentToFOO } from 'src/hooks/agents';

/* eslint-disable */
// Assigns agent to a field officer
const AssignFieldOfficer = ({ disabled }) => {
  // This agent
  const { id: agentID } = useParams();
  const assignAgent = useAssignAgentToFOO();
  // List of field officers to be assigned to this agent
  const { data } = useFieldOfficerList();

  let fooList = [];
  if (data) {
    fooList = data;
  }

  if (fooList) {
    fooList = fooList.map((foo) => {
      return {
        id: foo.id,
        name:
          foo.attributes &&
          foo.attributes.user &&
          `${foo.attributes.user.first_name} ${foo.attributes.user.last_name}`
      };
    });
  }

  return (
    <AssignResource
      title="Assign Agent to Field Officer"
      fieldLabel="Field Officer"
      resourceList={fooList}
      data={{ agent: Number(agentID) }}
      action={assignAgent}
      disabled={disabled}
    />
  );
};

export default AssignFieldOfficer;

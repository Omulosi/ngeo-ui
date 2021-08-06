import React from 'react';
import { useParams } from 'react-router';
import { useAgents } from 'src/hooks/agents';
import { useProjects } from 'src/hooks/projects';
import { useReturn } from 'src/hooks/returns';
import { createReturn } from 'src/redux/actions/returnsAction';
import ReturnForm from './ReturnForm';

/* eslint-disable */
const EditReturn = () => {
  const { id } = useParams();

  const { data: returnItem, isLoading, error, isSuccess } = useReturn(id);

  let agent = '';
  if (isSuccess) {
    agent = `${returnItem.attributes.agent.first_name} ${returnItem.attributes.agent.last_name}`;
  }

  let project = '';
  if (isSuccess) {
    project = `${returnItem.attributes.project.name}`;
  }

  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError
  } = useProjects();

  const {
    data: agents,
    isLoading: agentsLoading,
    error: agentsError
  } = useAgents();

  let projectList = [];

  if (projects) {
    projectList = projects.results.features.map((ft) => {
      return {
        name: ft.properties.name,
        id: ft.id
      };
    });
  }

  let agentList = [];

  if (agents) {
    agentList = agents.map((agent) => {
      return {
        name: `${agent.attributes.first_name} ${agent.attributes.last_name}`,
        id: agent.id
      };
    });
  }

  let data = { attributes: {} };
  if (returnItem) {
    data = returnItem;
  }

  return (
    <ReturnForm
      {...data.attributes}
      projectList={projectList}
      agentList={agentList}
      project={project}
      agent={agent}
      title="Edit Return"
      subTitle="Edit Return"
      action={createReturn}
      remarksPrompt={data.attributes ? data.attributes.remarks : ''}
    />
  );
};

export default EditReturn;

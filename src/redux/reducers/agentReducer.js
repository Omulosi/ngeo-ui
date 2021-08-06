import {
  GET_ALL_AGENTS,
  CREATE_AGENT,
  SET_ERRORS,
  CLEAR_ERRORS,
  UPDATE_AGENT,
  DELETE_AGENT
} from '../types';

const initialState = {
  agents: [],
  agentError: null
};

const agentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_AGENTS:
      return {
        ...state,
        agents: action.payload
      };

    case CREATE_AGENT:
      return {
        ...state,
        agents: [...state.agents, action.payload]
      };

    case UPDATE_AGENT:
      return {
        ...state,
        agents: state.agents.map((agent) => {
          return agent.id === action.payload.id ? action.payload : agent;
        })
      };

    case SET_ERRORS:
      return {
        ...state,
        agentError: action.payload
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        agentError: null
      };

    case DELETE_AGENT:
      return {
        ...state,
        agents: state.agents.filter((agent) => agent.id !== action.payload.id)
      };

    default:
      return state;
  }
};

export default agentReducer;

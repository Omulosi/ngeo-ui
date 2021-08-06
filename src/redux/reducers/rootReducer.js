import { combineReducers } from 'redux';

import { userReducer } from './userReducer';
import authReducer from './authReducer';
import agentReducer from './agentReducer';
import areaReducer from './areaReducer';

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  agent: agentReducer,
  area: areaReducer
});

export default rootReducer;

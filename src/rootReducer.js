import { combineReducers } from 'redux';
import users from './containers/Users/reducer';
import login from './containers/LoginView/reducer';

export default combineReducers({
  users,
  login,
})
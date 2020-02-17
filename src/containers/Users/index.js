import {connect} from 'react-redux';
import Component from './Component';
import {
  setUsers,
  setCurrentUser,
  } from "../LoginView/actions";



const stp = (s) => ({
  users: s.login.users,
  currentUser: s.login.currentUser,

});


const dtp = (d) => ({

  setCurrentUser: (user) => {
    d(setCurrentUser(user))
  },

  setUsers: (users) => {
    d(setUsers(users))
  },
  
 

});


export default connect(stp, dtp)(Component);

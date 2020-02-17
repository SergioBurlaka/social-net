import {connect} from 'react-redux';
import Component from './Component';
import {
  setUsers,
  setCurrentUsers
  } from "./actions";



const stp = (s) => ({
  users: s.login.users
});


const dtp = (d) => ({

  
  setCurrentUsers: (user) => {
    d(setCurrentUsers(user))
  },
  setUsers: (users) => {
    d(setUsers(users))
  },
  

});


export default connect(stp, dtp)(Component);

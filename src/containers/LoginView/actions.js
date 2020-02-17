
import at from './at';



const setUsers = (users) => {
    return (dispatch, getState) => {
      dispatch({type: at.SET_USERS, data: users})
    }
  };

const setCurrentUser = (users) => {
    return (dispatch, getState) => {
      dispatch({type: at.SET_CURRENT_USER, data: users})
    }
  };
  



export {
    setUsers,
    setCurrentUser
  
 }


 
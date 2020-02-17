
import at from './at';



const setUsers = (users) => {
    return (dispatch, getState) => {
      dispatch({type: at.SET_USERS, data: users})
    }
  };

const setCurrentUsers = (users) => {
    return (dispatch, getState) => {
      dispatch({type: at.SET_CURRENT_USER, data: users})
    }
  };
  



export {
    setUsers,
    setCurrentUsers
  
 }


 
import React , {Component} from 'react';
import PropTypes from 'prop-types';
import './Friends.scss';
import Users from '../Users';
import routes from "../../rootRoutes/routes";


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faListUl, faTimes, faChevronRight, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

import TopMenu from "../TopMenu";


class Friends extends Component {
  state = {
    curentProducts: [],
    showColection: false,
    selectedOrder: null,
    selectedOrderIndex: null,
  };

  goToUserPage = () => {
    const history =  this.props.history
     history.push(routes.login);
   }


  // if(filter === "incoming"){
  //   return existAtReqIn !== -1
  // }

  // if(filter === "outgoing"){
  //   return existAtReqOut !== -1
  // }

  // if(filter === "friends"){
  //   return existAtFriends !== -1
  // }

  // if(filter === "no"){
  //   return item
  // }

  // friends
  // pending_req_out
  // pending_req_in

  // login"Bill"
  // password"123"

  checkIfExist = (property) => {
    const {currentUser} = this.props

    if(!currentUser){
      console.log('goToUserPage ')

      this.goToUserPage()
      return
    }

    console.log('checkIfExist ', currentUser[property].length > 0)

    return currentUser[property].length > 0
   }


  render() {
    const {currentUser} = this.props
    console.log('render users ', currentUser)
    // console.log('render currentUser.pending_req_in > 0 ', currentUser.pending_req_in.lenght > 0)
    console.log('render this.props.users ', this.props.currentUser)



    return (
      <div className="friends-section">
         <TopMenu/>
        <div className="friends-container">
         
         { (this.checkIfExist('pending_req_in') || this.checkIfExist('pending_req_out')) && 
          <div className="pending-wrapper">
          <h2> Pending requests </h2>
              { this.checkIfExist('pending_req_in') && 
              <div className="friends-wrapper">
               <h3> Incoming </h3>
               <Users history= {this.props.history} filter={"incoming"} />
              </div>
              }
              { this.checkIfExist('pending_req_out') &&  
               <div className="friends-wrapper">
                  <h3> Outgoing </h3> 
                  <Users history= {this.props.history} filter={"outgoing"} />
                </div>
              }
            
          </div>
         }
         
        
            <div className="friends-wrapper">
              {this.checkIfExist('friends') > 0 && <h2> Friends </h2> }
              <Users history= {this.props.history} filter={"friends"} />
            </div>
            

        </div>

      </div>
    )
  }
}

Friends.propTypes = {
  deviceConnected: PropTypes.bool,
  devicesData: PropTypes.array,
  device: PropTypes.object,
  discoveryToolResponse: PropTypes.object,
  discoveryTXDelay: PropTypes.object,
  discoveryMetalDelay: PropTypes.object,
  startTransmission: PropTypes.func,
  stopTransmission: PropTypes.func,
  getTxMetalDelay: PropTypes.func,
  setTxDelay: PropTypes.func,
  setMetalDelay: PropTypes.func,
};


export default Friends;
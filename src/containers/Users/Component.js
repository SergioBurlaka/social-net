import React , {Component} from 'react';
import PropTypes from 'prop-types';
import './Users.scss';
import ApiService from "../../ApiService/index";

import rc from '../../rootRoutes/routes';



// import TopMenu from "../TopMenu";
import Button from "../../components/Button";
// import Input from "../../components/Input";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, } from '@fortawesome/free-solid-svg-icons';



class Users extends Component {
  state = {
    usersToShow: [],
  };

  componentDidMount() {
    this.createUsersToShow()
  }


  getUsersSocial = () =>{
    const {currentUser} = this.props

    ApiService.getUsers()
      .then(res => {
        const users = res.data
        this.props.setUsers(users);
        const user = users.filter( item => item._id === currentUser._id);
        this.props.setCurrentUser(user[0]);
      })
      .catch(err => {
        console.log("catch err ", err)
      })
  }


  goToLoginPage = () => {
    const history =  this.props.history
     history.push(rc.login);
   }


  createUsersToShow = () => {
    const {users, currentUser} = this.props

    if(!currentUser || !users){
      this.goToLoginPage()
    }else{

      const usersToShow = users.filter( item => item._id !== currentUser._id)
      this.setState({
        usersToShow: usersToShow
      })
    }

  }



  addFriendRequestOut = (idFrom, idTo) => {
    ApiService.addFriendRequestOut({
      from: idFrom,
      to: idTo,
    }).then(res => {
      this.getUsersSocial()
    })
    .catch(err => {
      console.log("addFriendRequestOut err ", err)
    })
  }

  cancelFrinedRequestOut = (idFrom, idTo) =>{
    ApiService.cancelFrinedRequestOut({
      from: idFrom,
      to: idTo,
    }).then(res => {
      this.getUsersSocial()
    })
    .catch(err => {
      console.log("cancelFrinedRequestOut err ", err)
     
    })
  }

  cancelFrinedRequestIn = (idFrom, idTo) =>{
    ApiService.cancelFrinedRequestIn({
      from: idFrom,
      to: idTo,
    }).then(res => {
      this.getUsersSocial()
    })
    .catch(err => {
      console.log("cancelFrinedRequestIn err ", err)
    })
  }

  addFriend = (idFrom, idTo) =>{
    ApiService.addFriend({
      from: idFrom,
      to: idTo,
    }).then(res => {
      this.getUsersSocial()
    })
    .catch(err => {
      console.log("cancelFrinedRequestIn err ", err)
    })
  }


  removeFriend = (idFrom, idTo) =>{
    ApiService.removeFriend({
      from: idFrom,
      to: idTo,
    }).then(res => {
      this.getUsersSocial()
    })
    .catch(err => {
      console.log("cancelFrinedRequestIn err ", err)
    })
  }


  checkIfCanBeFriend = (user) =>{
    const {currentUser} = this.props
    const existAtFriends = currentUser.friends.indexOf(user._id)
    const existAtReqIn = currentUser.pending_req_in.indexOf(user._id)
    const existAtReqOut = currentUser.pending_req_out.indexOf(user._id) 

    if( existAtFriends === -1 && existAtReqIn === -1 && existAtReqOut === -1){
      return (
          <div className="buttons-wrapper">
            <Button
            onClick={ () =>{this.addFriendRequestOut(currentUser._id, user._id)} }
            name = {'Add friend'}
            />
        </div>
        )
    }
    return null
  }



  checkFriends = (user) =>{
    const {currentUser} = this.props
    const existAtFriends = currentUser.friends.indexOf(user._id)

    if( existAtFriends !== -1){
      return (
          <div className="buttons-wrapper">
            <label>Friends</label>
            <Button
              onClick={ () =>{ this.removeFriend(currentUser._id, user._id) } }
              name = {'Remove friend'}
            />
        </div>
        )
    }
    return null
  }




  checkOutgoingRequest = (user) =>{
    const {currentUser} = this.props
    const existAtReqOut = currentUser.pending_req_out.indexOf(user._id) 

    if( existAtReqOut !== -1){
      return (
          <div className="buttons-wrapper">
            <label>Pending request</label>
            <Button
              onClick={ () =>{this.cancelFrinedRequestOut(currentUser._id, user._id)} }
              name = {'Cancel request'}
            />
        </div>
        )
    }
    return null
  }


  checkIncomingRequest = (user) =>{
    const {currentUser} = this.props
    const existAtReqIn = currentUser.pending_req_in.indexOf(user._id)

    if( existAtReqIn !== -1 ){
      return (
          <div className="buttons-wrapper">
            <Button
              onClick={ () =>{this.addFriend(currentUser._id, user._id)} } 
              name = {'Accept'}
            />
            <Button
              onClick={ () =>{this.cancelFrinedRequestIn(currentUser._id, user._id)} }
              name = {'Ignore'}
            />
          </div>
        )
    }
    return null
  }


  filterFriend = (item) =>{
    const {currentUser, filter} = this.props

    const existAtFriends = currentUser.friends.indexOf(item._id)
    const existAtReqIn = currentUser.pending_req_in.indexOf(item._id)
    const existAtReqOut = currentUser.pending_req_out.indexOf(item._id) 


    if(filter === "incoming"){
      return existAtReqIn !== -1
    }

    if(filter === "outgoing"){
      return existAtReqOut !== -1
    }

    if(filter === "friends"){
      return existAtFriends !== -1
    }

    if(filter === "no"){
      return true
    }

   
  
  }


  render() {
    const {usersToShow} = this.state
    // const {showTopMenu} = this.props

    return (
      <div className="users-section">
          {/* {!showTopMenu && <TopMenu/>} */}
        <div className="users-container">
          
            <div className="users-list">
              {usersToShow.filter(item =>  this.filterFriend(item) ).map((item, index) => {
                return (
                  <div
                    className='user-item'
                    key={index}>
                      <div className="person-info">
                        <FontAwesomeIcon icon={faUserCircle} /> 
                        <div className="name">
                          {item.login}
                        </div>
                      </div>
                      <div className="active-section" key={index}>
                        {this.checkIfCanBeFriend(item)} 
                        {this.checkOutgoingRequest(item)}
                        {this.checkIncomingRequest(item)}
                        {this.checkFriends(item)} 
                      </div>
                  </div>
                  )
                })
              }    
          </div>
        </div>
      </div>
    )
  }
}

Users.propTypes = {
  deviceConnected: PropTypes.bool,
  devicesData: PropTypes.array,
  device: PropTypes.object,
  discoveryToolResponse: PropTypes.object,
  discoveryTXDelay: PropTypes.object,
  discoveryMetalDelay: PropTypes.object,
};


export default Users;
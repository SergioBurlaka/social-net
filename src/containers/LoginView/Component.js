import React , {Component} from 'react';
import PropTypes from 'prop-types';
import './LoginView.scss';
import ApiService from "../../ApiService/index";
import Button from "../../components/Button";
import Input from "../../components/Input";

import routes from "../../rootRoutes/routes";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';


class LoginView extends Component {
  state = {
    login: '',
    password: '',
    noSuchUserMessage: false
  };


  goToSettingsPage = () => {
    const history =  this.props.history
     history.push(routes.settings);
   }

  goToUserPage = () => {
    const history =  this.props.history
     history.push(routes.users);
   }


  componentDidMount() {
    this.getUsersSocial()
  }


  getUsersSocial = () =>{
    ApiService.getUsers()
      .then(res => {
        this.props.setUsers(res.data)

      })
      .catch(err => {
        console.log("catch err ", err)
      
      })
  }





  onChangeLogin = (event) =>{
    const login = event.target.value;
    this.setState({login: login})
  }

  onChangePassword = (event) =>{
    const password = event.target.value;
    this.setState({password: password})

  }

  hideMessage = (event) =>{
    this.setState({noSuchUserMessage: false })
  }



  checkLogin = () =>{
    const {users} = this.props;
    const {login, password} = this.state

    const result = users.filter( item =>{
      return item.login === login && item.password === password
    })
  
    if(result.length === 1){
        this.props.setCurrentUser(result[0]);
        this.goToUserPage()

    }else{
      this.setState({noSuchUserMessage: true })
    }

    this.setState({
      login: '',
      password: ''
    })

  }




  render() {

    const {login, password, noSuchUserMessage} = this.state


    return (
      <div className="login-section">
        <div className="link"   onClick={this.goToSettingsPage} > <FontAwesomeIcon icon={faCogs} /></div>
          <div className="login-container">
            
            <div className="input-wrapper">
              <Input
                type= {'text'}
                value ={login}
                toched = {true}
                errorMessage ={''}
                placeholder = {'login'}
                onChangeAction = {this.onChangeLogin}
                onFocusAction = {this.hideMessage}
              />
              <Input
                type = {'text'}
                value = {password}
                toched = {true}
                errorMessage ={''}
                placeholder = {'password'}
                onChangeAction = {this.onChangePassword}
                onFocusAction = {this.hideMessage}
              />
              <Button
                onClick={this.checkLogin}
                name = {'Sign in'}
              />
              {noSuchUserMessage && <div className="error" >No such user</div>}
            </div>
          </div>
      </div>
    
    )
  }
}

LoginView.propTypes = {
  deviceConnected: PropTypes.bool,
  devicesData: PropTypes.array,
  device: PropTypes.object,
  discoveryToolResponse: PropTypes.object,
  discoveryTXDelay: PropTypes.object,
  discoveryMetalDelay: PropTypes.object,
};


export default LoginView;
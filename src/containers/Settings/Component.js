import React , {Component} from 'react';
import PropTypes from 'prop-types';
import './Settings.scss';
import ApiService from "../../ApiService/index";
import Button from "../../components/Button";

import routes from "../../rootRoutes/routes";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


class Settings extends Component {
  state = {
    login: '',
    password: '',
    noSuchUserMessage: false,
    showDelitedMessage: false,
    showSeededMessage: false
  };

   timerIntervalDeleteMessage = null;
   timerIntervalSeededMessage = null;


  goToLoginPage = () => {
    const history =  this.props.history
     history.push(routes.login);
   }



  seedUsers = () =>{
    ApiService.seedUsers()
      .then(res => {
        console.log("success res seedUsers ", res)

        this.setState({ showSeededMessage: true}, () =>{
          this.timerIntervalSeededMessage = setTimeout(() => {
            this.setState({ showSeededMessage: false})
          }, 2000);
        })

        

      })
      .catch(err => {
        console.log("catch err ", err)
      })
  }


  deleteAllUsers = () =>{
    ApiService.deleteAllUser()
      .then(res => {
        console.log("success delete all users ", res)

        this.setState({ showDelitedMessage: true}, () =>{
          this.timerIntervalDeleteMessage = setTimeout(() => {
            this.setState({ showDelitedMessage: false})
          }, 2000);
        })
      })
      .catch(err => {
        console.log("catch all users wasn`t deleted ", err)
      })
  }

  componentWillUnmount() {
  
    if (this.timerIntervalDeleteMessage) clearInterval(this.timerIntervalDeleteMessage)
    if (this.timerIntervalSeededMessage) clearInterval(this.timerIntervalSeededMessage)
  }



  render() {

    return (
      <div className="settings-section">
        <div className="link" onClick={this.goToLoginPage} > <FontAwesomeIcon icon={faArrowLeft} /> Back</div>

          <div className="login-container">
            <div className="buttons-wrapper">
              <Button
                onClick={this.deleteAllUsers}
                name = {'Delete users'}
                />
              <Button
                onClick={this.seedUsers}
                name = {'Seed users'}
                />
            </div>
          </div>
          <div className="success-container">

            {this.state.showDelitedMessage && 
            <div className="delete-message">
                Users was deleted
            </div>
            }
            {this.state.showSeededMessage && 
            <div className="seeded-message">
                Users was seeded
            </div>
            }

           
          </div>

      </div>
    
    )
  }
}

Settings.propTypes = {
  getTxMetalDelay: PropTypes.func,
  setTxDelay: PropTypes.func,
  setMetalDelay: PropTypes.func,
};


export default Settings;
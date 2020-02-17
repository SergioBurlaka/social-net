import React from 'react';
import PropTypes from "prop-types";
import {Switch, Route} from 'react-router-dom';
import rc from '../rootRoutes/routes';
import Friends from '../containers/Friends';
// import Users from '../containers/Users';
import UsersList from '../containers/UsersList';
import LoginView from '../containers/LoginView';
import Settings from '../containers/Settings';
import "./ControlPanel.scss";




class ControlPanel extends React.Component {

  componentDidMount() {
   this.goToLoginPage()
  }

  goToLoginPage = () => {
    const history =  this.props.history
     history.push(rc.login);
   }



  render() {

    
    return (
      <div >         
          <div className="control-panel">
            <Switch>
                <Route component={LoginView} path={rc.login}/>
                <Route component={Settings} path={rc.settings}/>
                <Route component={Friends} path={rc.friends}/>
                <Route component={UsersList} path={rc.users}/>
            </Switch>
          </div>
      </div>
    )
  }
}

ControlPanel.propTypes = {
  inProcess: PropTypes.bool,
  getDevicesInfo: PropTypes.func
};

export default ControlPanel;
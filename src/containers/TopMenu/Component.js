import React , {Component} from 'react';
import PropTypes from 'prop-types';
import './TopMenu.scss';
import {NavLink} from 'react-router-dom';
import rc from '../../rootRoutes/routes';





class TopMenu extends Component {
  state = {

  };



  render() {


    return (
      <section className="top-menu-wrapper">
         <div className="navigation-bar">
              <NavLink to={rc.users}>
                Users
              </NavLink>
              <NavLink to={rc.friends}>
                Friends
              </NavLink>
              <NavLink to={rc.login}>
                Login
              </NavLink>
          </div>
          <div  className="user-label">
            Current user: {this.props.currentUser && this.props.currentUser.login}
          </div>
          
         
             
      </section>
    )
  }
}

TopMenu.propTypes = {
  deviceConnected: PropTypes.bool,
  devicesData: PropTypes.array,
};


export default TopMenu;
import React , {Component} from 'react';
import PropTypes from 'prop-types';
import './UsersList.scss';
import Users from '../Users';
import TopMenu from "../TopMenu";





class UsersList extends Component {
  state = {

  };


  render() {

    return (
      <div className="users-list-section">
          <TopMenu />
          <div className="users-list-container">
             <Users history= {this.props.history} filter={"no"} />
          </div>
      </div>
    )
  }
}

UsersList.propTypes = {
  deviceConnected: PropTypes.bool,
  devicesData: PropTypes.array,
};


export default UsersList;
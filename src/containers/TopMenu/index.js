import {connect} from 'react-redux';
import Component from './Component';


const stp = (s) => ({
    currentUser: s.login.currentUser,

});


const dtp = (d) => ({

});


export default connect(stp, dtp)(Component);



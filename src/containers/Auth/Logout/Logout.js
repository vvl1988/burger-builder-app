import React, { Component } from 'react';
import {connect} from "react-redux";
import * as actions from "../../../store/actions/index";
import {Redirect} from "react-router-dom";

class Logout extends Component{
    componentDidMount(){
        this.props.logOut();
    }
    render(){
        return <Redirect to="/"/>;
    }
}

const dispatchToProps = (dispatch) => {
    return {logOut: () => dispatch(actions.logOut())};
}

export default connect(null, dispatchToProps)(Logout);
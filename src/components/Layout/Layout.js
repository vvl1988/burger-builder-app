import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerCloseHandler = ()=>{
    this.setState({showSideDrawer:false})
  }

  sideDrawerOpenHandler = ()=>{
    this.setState({showSideDrawer:true})
  }

  render() {
    return (
      <React.Fragment>
        <Toolbar openSideDrawer={this.sideDrawerOpenHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;

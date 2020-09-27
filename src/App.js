import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "./store/actions/index"
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

class App extends Component {
  componentWillMount(){
    this.props.onAutoLogin();
  }

  render() {
    return(
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
    );
  } 
}

const mapDispatchToProps = dispatch => {
  return{onAutoLogin: ()=>dispatch(actions.checkAuthState())}
}

export default connect(null, mapDispatchToProps)(App);

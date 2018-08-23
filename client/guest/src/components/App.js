import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Navbar from "./Navbar";
import IndexPage from "./index/";
import LoginPage from "./login";
import SignupPage from "./signup";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
        </Switch>
      </div>
    );
  }
}

export default App;

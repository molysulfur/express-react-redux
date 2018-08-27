import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Navbar from "./Navbar";
import IndexPage from "./index/";
import Login from "./login";
import Signup from "./signup";
import Home from "./home";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;

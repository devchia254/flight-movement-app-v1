import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

import SchedulePage from "./SchedulePage";
import Homepage from "./Homepage";
import UserLoginPage from "./UserLoginPage";
import UserRegisterPage from "./UserRegisterPage";
import UserProfilePage from "./UserProfilePage";
import Navbar from "../components/navbar/Navbar";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Navbar>Flight Movement App</Navbar>
        <div className="content"></div>
        {/* Link is at Drawer */}
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/schedule" component={SchedulePage} />
          <Route path="/login" component={UserLoginPage} />
          <Route path="/register" component={UserRegisterPage} />
          <Route path="/profile" component={UserProfilePage} />
        </Switch>
      </div>
    );
  }
}

export default App;

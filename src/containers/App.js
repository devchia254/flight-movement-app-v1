import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

import Schedule from "./Schedule";
import Homepage from "./Homepage";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";
import Navbar from "../components/navbar/Navbar";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App" style={{ textAlign: "center" }}>
        <CssBaseline />
        <Navbar>Flight Movement App</Navbar>
        <div className="content"></div>
        {/* Link is at Drawer */}
        <Switch>
          <Route exact path={"/"} component={Homepage} />
          <Route path={"/schedule"} component={Schedule} />
          <Route path={"/login"} component={UserLogin} />
          <Route path={"/register"} component={UserRegister} />
        </Switch>
      </div>
    );
  }
}

export default App;

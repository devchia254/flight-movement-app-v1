import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

import BoardUser from "./Board-User";
import Homepage from "./Homepage";
import Navbar from "./Navbar";

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
        {/* <Link to={"/"}>Home</Link>
        <Link to={"/user"}>User</Link> */}
        <div className="content"></div>
        {/* Link is at Navbar */}
        <Switch>
          <Route exact path={"/"} component={Homepage} />
          <Route path={"/user"} component={BoardUser} />
        </Switch>
      </div>
    );
  }
}

export default App;

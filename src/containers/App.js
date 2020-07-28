import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
      <Router>
        <CssBaseline />
        <div className="App" style={{ textAlign: "center" }}>
          <Navbar>
            Flight Movement App
            {/* <Link to={"/"}>Home</Link>
            <Link to={"/user"}>User</Link> */}
          </Navbar>
          <Link to={"/"}>Home</Link>
          <Link to={"/user"}>User</Link>
          <div className="content"></div>
          <Switch>
            <Route exact path={"/"} component={Homepage} />
            <Route path={"/user"} component={BoardUser} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

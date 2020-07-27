import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import BoardUser from "./Board-User";
import Homepage from "./Homepage";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className="App" style={{ textAlign: "center" }}>
          <div className="header">
            <h1> Flight Movement App</h1>
            <Link to={"/"}>Home</Link>
            <Link to={"/user"}>User</Link>
          </div>
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

import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "../routes/protected-route";
import { RedirectUserRoute } from "../routes/redirectuser-route";
import { AdminRoute } from "../routes/admin-route";

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
          <RedirectUserRoute path="/login" component={UserLoginPage} />
          <ProtectedRoute path="/schedule" component={SchedulePage} />
          <ProtectedRoute path="/profile" component={UserProfilePage} />
          <AdminRoute path="/register" component={UserRegisterPage} />
        </Switch>
      </div>
    );
  }
}

export default App;

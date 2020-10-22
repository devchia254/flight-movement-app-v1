import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "../services/routes/protected-route";
import { RedirectUserRoute } from "../services/routes/redirectuser-route";
import { AdminRoute } from "../services/routes/admin-route";

import CssBaseline from "@material-ui/core/CssBaseline";

import SchedulePage from "./SchedulePage";
import Homepage from "./Homepage";
import UserLoginPage from "./UserLoginPage";
import UserRegisterPage from "./UserRegisterPage";
import UserProfilePage from "./UserProfilePage";
import FourOhFour from "./FourOhFour";
import Navbar from "../components/navbar/Navbar";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  testClick() {
    alert("It works");
  }

  render() {
    return (
      <div className="App">
        <CssBaseline />
        {/* Perhaps test the user token status here to try and prevent windows.reload() for route changes */}
        <Navbar>Flight Movement App</Navbar>
        <div className="content"></div>
        {/* Link is at Drawer */}
        <Switch>
          <Route exact path="/" component={Homepage} />
          <RedirectUserRoute
            path="/login"
            render={(props) => (
              <UserLoginPage {...props} testClick={this.testClick} />
            )}
          />
          <ProtectedRoute path="/schedule" component={SchedulePage} />
          <ProtectedRoute path="/profile" component={UserProfilePage} />
          <AdminRoute path="/register" component={UserRegisterPage} />
          <Route path="*" component={FourOhFour} />
        </Switch>
      </div>
    );
  }
}

export default App;

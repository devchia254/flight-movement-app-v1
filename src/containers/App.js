import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "../services/routes/protected-route";
import { RedirectUserRoute } from "../services/routes/redirectuser-route";
import { AdminRoute } from "../services/routes/admin-route";

import AuthService from "../services/auth/auth-service";

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
    this.state = {
      currentUser: undefined,
      showRegister: false,
    };

    this.loginCurrentUserState = this.loginCurrentUserState.bind(this);
  }

  componentDidMount() {
    // const user = ToggleUser();
    const user = AuthService.getCurrentUser();
    // console.log(user);

    if (user) {
      this.setState({
        currentUser: user,
        showRegister: user.role.includes("ROLE_ADMIN"), // Only admin can register user
      });
    }
  }

  loginCurrentUserState(user) {
    if (user) {
      this.setState({
        currentUser: user,
        showRegister: user.role.includes("ROLE_ADMIN"),
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <CssBaseline />
        {/* Perhaps test the user token status here to try and prevent windows.reload() for route changes */}
        <Navbar
          currentUser={this.state.currentUser}
          showRegister={this.state.showRegister}
        >
          Flight Movement App
        </Navbar>
        <div className="content"></div>
        {/* Link is at Drawer */}
        <Switch>
          <Route exact path="/" component={Homepage} />
          <RedirectUserRoute
            path="/login"
            render={(props) => (
              <UserLoginPage
                {...props}
                loginCurrentUserState={this.loginCurrentUserState}
              />
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

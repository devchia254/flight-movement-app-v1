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

import { withRouter } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      showRegister: false,
    };

    this.loginCurrentUserState = this.loginCurrentUserState.bind(this);
    this.logoutFromState = this.logoutFromState.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

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

  logoutFromState() {
    const { history } = this.props;
    AuthService.logout();

    this.setState((state) => {
      return {
        currentUser: undefined,
        showRegister: !state.showRegister,
      };
    });

    history.push("/login");
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <CssBaseline />
        {/* Navbar handles the state of links relative to the type of user*/}
        <Navbar
          currentUser={this.state.currentUser}
          showRegister={this.state.showRegister}
          logoutFromState={this.logoutFromState}
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

export default withRouter(App);

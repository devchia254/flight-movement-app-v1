import React, { Component } from "react";
// Auth routes
import AuthService from "../services/auth/auth-service";
// Components
import SchedulePage from "./SchedulePage";
import Homepage from "./Homepage";
import UserLoginPage from "./UserLoginPage";
import UserRegisterPage from "./UserRegisterPage";
import UserProfilePage from "./UserProfilePage";
import AdminUserMgmtPage from "./AdminUserMgmtPage";
import FourOhFour from "./FourOhFour";
import Navbar from "../components/navbar/Navbar";
// React Router & Cutomer Routes
import { Switch, Route, withRouter } from "react-router-dom";
import { ProtectedRoute } from "../services/routes/protected-route";
import { RedirectUserRoute } from "../services/routes/redirectuser-route";
import { AdminRoute } from "../services/routes/admin-route";
// Material UI
import CssBaseline from "@material-ui/core/CssBaseline";

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
    // Manages the view of Navbar & Drawer links based on type of user logged in
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showRegister: user.role.includes("ROLE_ADMIN"), // Only admin can register user
      });
    }
  }

  // User login status managed by the state
  loginCurrentUserState(userForState) {
    if (userForState) {
      this.setState({
        currentUser: userForState,
        showRegister: userForState.role.includes("ROLE_ADMIN"),
      });
    }
  }

  // Logout user from state
  logoutFromState() {
    // Remove user from state first before localStorage
    const user = AuthService.getCurrentUser();
    this.setState((state) => {
      return {
        currentUser: undefined,
        showRegister: user.role.includes("ROLE_ADMIN") && !state.showRegister,
      };
    });

    AuthService.logout();
  }

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Navbar
          currentUser={this.state.currentUser}
          showRegister={this.state.showRegister}
          logoutFromState={this.logoutFromState}
        >
          Flight Movement App
        </Navbar>
        {/* Switch Router (Links are at Navbar & Drawer) */}
        <Switch>
          <Route exact path="/" component={Homepage} />
          <RedirectUserRoute
            path="/login"
            // props allows access to history
            render={(props) => (
              <UserLoginPage
                {...props}
                loginCurrentUserState={this.loginCurrentUserState}
              />
            )}
          />
          <RedirectUserRoute
            path="/register"
            // props allows access to history
            render={(props) => <UserRegisterPage {...props} />}
          />
          <ProtectedRoute path="/schedule" component={SchedulePage} />
          <ProtectedRoute path="/profile" component={UserProfilePage} />
          <AdminRoute path="/manage-user" component={AdminUserMgmtPage} />
          <Route path="*" component={FourOhFour} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

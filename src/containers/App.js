import React, { Component } from "react";
// Auth Requests
import AuthService from "../services/auth/auth-service";
// Component Pages
import SchedulePage from "./schedulepage/SchedulePage";
import Homepage from "./homepage/Homepage";
import LoginPage from "./loginpage/LoginPage";
import RegisterPage from "./registerpage/RegisterPage";
import ProfilePage from "./profilepage/ProfilePage";
import UserMgmtPage from "./usermgmtpage/UserMgmtPage";
import FourOhFour from "./FourOhFour";
// Other Components
import Navbar from "../components/navigation/Navbar";
// React Router & Custom Routes
import { Switch, Route, withRouter } from "react-router-dom";
import { ProtectedRoute } from "../components/routes/protected-route";
import { RedirectUserRoute } from "../components/routes/redirectuser-route";
import { AdminRoute } from "../components/routes/admin-route";
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
              <LoginPage
                {...props}
                loginCurrentUserState={this.loginCurrentUserState}
              />
            )}
          />
          <RedirectUserRoute
            path="/register"
            // props allows access to history
            render={(props) => <RegisterPage {...props} />}
          />
          <ProtectedRoute path="/schedule" component={SchedulePage} />
          <ProtectedRoute path="/profile" component={ProfilePage} />
          <AdminRoute path="/manage-user" component={UserMgmtPage} />
          <Route path="*" component={FourOhFour} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

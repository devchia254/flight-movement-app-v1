import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

import SchedulePage from "./SchedulePage";
import Homepage from "./Homepage";
import UserLoginPage from "./UserLoginPage";
import UserRegisterPage from "./UserRegisterPage";
import Navbar from "../components/navbar/Navbar";

import AuthService from "../services/auth-service";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: undefined,
      showLogin: false,
      showSchedule: false,
    };
  }

  componentDidMount() {
    // const user = AuthService.getStandardUser(); // Test Standard user
    // const user = AuthService.getAdminUser(); // Test Admin user
    const user = undefined; // Test no user

    if (user) {
      this.setState({
        currentUser: user,
        showSchedule:
          user.roles.includes("ROLE_USER") || user.roles.includes("ROLE_ADMIN"),
        showLogin:
          user.roles.includes("ROLE_USER") || user.roles.includes("ROLE_ADMIN"),
        showRegister: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  render() {
    const { showSchedule, showRegister, showLogin } = this.state;

    return (
      <div className="App">
        <CssBaseline />
        <Navbar
          showSchedule={showSchedule}
          showRegister={showRegister}
          showLogin={showLogin}
        >
          Flight Movement App
        </Navbar>
        <div className="content"></div>
        {/* Link is at Drawer */}
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/schedule" component={SchedulePage} />
          <Route path="/login" component={UserLoginPage} />
          <Route path="/register" component={UserRegisterPage} />
        </Switch>
      </div>
    );
  }
}

export default App;

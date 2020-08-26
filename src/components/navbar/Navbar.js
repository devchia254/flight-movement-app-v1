import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import DrawerButton from "./Drawer";
import AuthService from "../../services/auth-service";

const navStyle = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: "none",
  },
});

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      showLogin: false,
      showSchedule: false,
    };
  }

  componentDidMount() {
    // const user = AuthService.getStandardUser(); // Test Standard user
    const user = AuthService.getAdminUser(); // Test Admin user
    // const user = undefined; // Test no user

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

  // Custom Link
  ProfileLink = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/profile" {...props} />
  ));

  render() {
    const { showSchedule, showRegister, showLogin } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <DrawerButton
              showSchedule={showSchedule}
              showRegister={showRegister}
              showLogin={showLogin}
            />
            <Typography variant="h6" className={classes.title}>
              {this.props.children}
            </Typography>
            <Button
              color="inherit"
              className={classes.test}
              component={this.ProfileLink}
            >
              User
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(navStyle)(Navbar);

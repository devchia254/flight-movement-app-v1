import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Link from "@material-ui/core/Link";
import PersonIcon from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";

import DrawerButton from "./Drawer";
import AuthService from "../../services/auth-service";

const navStyle = (theme) => ({
  root: {
    flexGrow: 1,
  },
  profileLink: {
    display: "flex",
  },
  profileIcon: {
    background: theme.palette.common.white,
    color: theme.palette.primary.main,
    borderRadius: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  profileButton: {
    textTransform: "none",
  },
});

// Toggle between types of users here
const ToggleUser = () => {
  const user = AuthService.getAdminUser(); // Test Admin user
  // const user = AuthService.getStandardUser(); // Test Standard user
  // const user = undefined; // Test no user
  return user;
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: ToggleUser(),
      showLogin: false,
      showLogout: false,
      showSchedule: false,
      showProfile: false,
    };
  }

  componentDidMount() {
    const user = ToggleUser();

    if (user) {
      this.setState({
        currentUser: user,
        showProfile:
          user.roles.includes("ROLE_USER") || user.roles.includes("ROLE_ADMIN"),
        showSchedule:
          user.roles.includes("ROLE_USER") || user.roles.includes("ROLE_ADMIN"),
        showLogin:
          user.roles.includes("ROLE_USER") || user.roles.includes("ROLE_ADMIN"),
        showLogout:
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
    const {
      showSchedule,
      showRegister,
      showLogin,
      showLogout,
      showProfile,
      currentUser,
    } = this.state;
    const { classes } = this.props;

    // console.log(currentUser);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <DrawerButton
              showSchedule={showSchedule}
              showRegister={showRegister}
              showLogin={showLogin}
              showLogout={showLogout}
            />
            <Typography variant="h6" className={classes.title}>
              {this.props.children}
            </Typography>
            {showProfile && (
              <Button
                color="inherit"
                className={classes.profileButton}
                component={this.ProfileLink}
                startIcon={<PersonIcon className={classes.profileIcon} />}
              >
                {!currentUser ? "username here" : currentUser.username}
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(navStyle)(Navbar);

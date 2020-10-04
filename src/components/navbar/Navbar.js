import React, { Component } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Link from "@material-ui/core/Link";
import PersonIcon from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";

import DrawerButton from "./Drawer";
import AuthService from "../../services/auth/auth-service";

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

// // Toggle between types of users here
// const ToggleUser = () => {
//   // const user = AuthService.getAdminUser(); // Test Admin user
//   // const user = AuthService.getStandardUser(); // Test Standard user
//   const user = AuthService.getNoUser(); // Test no user
//   return user;
// };

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentUser: ToggleUser(),
      currentUser: undefined,
      showRegister: false,
    };
  }

  componentDidMount() {
    // const user = ToggleUser();
    const user = AuthService.getCurrentUser();
    // console.log(user);

    if (user) {
      this.setState({
        currentUser: user,
        showRegister: user.role.includes("ROLE_ADMIN"), // Only admin can register user
        // showProfile:
        //   user.roles.includes("ROLE_USER") || user.roles.includes("ROLE_ADMIN"),
        // showSchedule:
        //   user.roles.includes("ROLE_USER") || user.roles.includes("ROLE_ADMIN"),
        // showLogin:
        //   user.roles.includes("ROLE_USER") || user.roles.includes("ROLE_ADMIN"),
        // showLogout:
        //   user.roles.includes("ROLE_USER") || user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  testLogout = () => {
    // console.log("testLogout function");
    // this.setState({ currentUser: AuthService.getNoUser() });
    const { history } = this.props;
    AuthService.logout();
    history.push("/login");
    window.location.reload();
  };

  // Custom Link
  ProfileLink = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/profile" {...props} />
  ));

  render() {
    const { showRegister, currentUser } = this.state;
    const { classes } = this.props;

    // if (!AuthService.getCurrentUser()) {
    //   return <Redirect to="/login" />;
    //   // console.log("No user logged in!");
    // }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <DrawerButton
              showRegister={showRegister}
              currentUser={currentUser}
              testLogout={this.testLogout}
            />
            <Typography variant="h6" className={classes.title}>
              {this.props.children}
            </Typography>
            {/* if there is a user, show profile link */}
            {currentUser && (
              <Button
                color="inherit"
                className={classes.profileButton}
                component={this.ProfileLink}
                startIcon={<PersonIcon className={classes.profileIcon} />}
              >
                {!currentUser ? "username here" : currentUser.email}
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withRouter(withStyles(navStyle)(Navbar));

import React, { Component } from "react";
import DrawerButton from "./Drawer";
// React Router
import { Link as RouterLink } from "react-router-dom";
// Material UI
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";

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

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Custom Link for Profile page
  ProfileLink = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/profile" {...props} />
  ));

  render() {
    const { classes, showRegister, currentUser, logoutFromState } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <DrawerButton
              showRegister={showRegister}
              currentUser={currentUser}
              logoutFromState={logoutFromState}
            />
            <Typography variant="h6" className={classes.title}>
              {this.props.children}
            </Typography>
            {/* if there is a user, show profile link */}
            {currentUser && (
              <React.Fragment>
                {/* Hidden when BELOW 600px for Profile link - Start */}
                <Hidden xsDown>
                  <Button
                    color="inherit"
                    className={classes.profileButton}
                    component={this.ProfileLink}
                    startIcon={<PersonIcon className={classes.profileIcon} />}
                  >
                    {!currentUser ? "username here" : currentUser.email}
                  </Button>
                </Hidden>
                {/* Hidden when BELOW 600px for Profile link - End */}
                {/* Hidden when 600px & ABOVE for Profile link - Start */}
                <Hidden smUp>
                  <Button
                    color="inherit"
                    className={classes.profileButton}
                    component={this.ProfileLink}
                    startIcon={<PersonIcon className={classes.profileIcon} />}
                  >
                    {" "}
                  </Button>
                </Hidden>
                {/* Hidden when 600px & ABOVE for Profile link - End */}
              </React.Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(navStyle)(Navbar);

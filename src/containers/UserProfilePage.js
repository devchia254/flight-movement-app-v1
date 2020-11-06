import React, { Component } from "react";

import AuthService from "../services/auth/auth-service";

import { withStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3, 0),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "350px",
    minWidth: "300px",
    maxWidth: "500px",
  },
  // avatar: {
  //   margin: theme.spacing(3),
  //   backgroundColor: theme.palette.secondary.main,
  //   width: theme.spacing(6),
  //   height: theme.spacing(6),
  // },
  headerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginBottom: theme.spacing(2),

    // backgroundColor: "mediumaquamarine",
    // border: "2px solid darkslateblue",
  },
  icon: {
    fontSize: "6rem",
    color: theme.palette.secondary.main,
  },
  contentBox: {
    display: "flex",
    flexDirection: "column",
    width: "100%",

    // backgroundColor: "darkkhaki",
    // border: "2px solid olivedrab",
  },
  contentItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    width: "100%",
    marginBottom: theme.spacing(2),

    // backgroundColor: "mistyrose",
    // border: "2px dashed goldenrod",
  },
});

class UserProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }

  render() {
    const { classes } = this.props;
    const { currentUser } = this.state;

    return (
      <div className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
          <div className={classes.headerBox}>
            <AccountCircleIcon className={classes.icon} />
            <Typography variant="h4">Profile</Typography>
          </div>
          <div className={classes.contentBox}>
            <div className={classes.contentItem}>
              <Typography variant="h6">First Name:</Typography>
              <Typography variant="body1">{currentUser.firstName}</Typography>
            </div>
            <div className={classes.contentItem}>
              <Typography variant="h6">Second Name:</Typography>
              <Typography variant="body1">{currentUser.lastName}</Typography>
            </div>
            <div className={classes.contentItem}>
              <Typography variant="h6">Email Address:</Typography>
              <Typography variant="body1">{currentUser.email}</Typography>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(useStyles)(UserProfilePage);

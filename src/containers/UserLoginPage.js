import React, { Component } from "react";

import LoginForm from "../components/forms/LoginForm";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";

const loginStyles = (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "500px",
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  icon: {
    fontSize: 30,
  },
});

class UserLoginPage extends Component {
  render() {
    const { classes, history } = this.props;
    return (
      <Grid
        container
        className={classes.root}
        direction="column"
        alignItems="center"
      >
        {/* <Grid item sm={3} md={3} lg>
          <Paper className={classes.paper}>xs</Paper>
        </Grid> */}
        <Grid item xs={12} sm={6} md={6} lg>
          <Paper elevation={3} className={classes.paper}>
            <Avatar variant="rounded" className={classes.avatar}>
              <PersonIcon className={classes.icon} />
            </Avatar>
            <Typography variant="h4">Log In</Typography>
            <LoginForm history={history} />
          </Paper>
        </Grid>
        {/* <Grid item sm={3} md={3} lg>
          <Paper className={classes.paper}>xs</Paper>
        </Grid> */}
      </Grid>
    );
  }
}
export default withStyles(loginStyles)(UserLoginPage);

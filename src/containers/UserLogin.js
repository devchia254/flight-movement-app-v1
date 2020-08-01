import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import LoginForm from "../components/login-form/LoginForm";

const loginStyles = (theme) => ({
  root: {
    flexGrow: 1,
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
  form: {
    paddingBottom: theme.spacing(10),
  },
  icon: {
    fontSize: 30,
  },
});

class UserLogin extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.root}
        direction="column"
        alignItems="center"
      >
        <Grid item sm={3} md={3} lg>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg>
          <Paper elevation={3} className={classes.paper}>
            <Avatar variant="rounded" className={classes.avatar}>
              <LockOpenIcon className={classes.icon} />
            </Avatar>
            <Typography variant="h4">Log In</Typography>
            <LoginForm />
          </Paper>
        </Grid>
        <Grid item sm={3} md={3} lg>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(loginStyles)(UserLogin);

import React, { Component } from "react";

import LoginForm from "../components/forms/LoginForm";
import AuthService from "../services/auth/auth-service";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";

import { withSnackbar } from "notistack";
import { Button } from "@material-ui/core";

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
  constructor() {
    super();
    this.state = {};
  }

  snackbarFail = (msg) => {
    this.props.enqueueSnackbar(msg, {
      variant: "error",
    });
  };

  loginUser = (email, password) => {
    AuthService.login(email, password)
      .then(() => {
        this.props.history.push("/schedule");
        window.location.reload();
      })
      .catch((error) => {
        // console.log(error.response);
        const resMessage =
          (error.response && error.response.data.message) ||
          error.message ||
          error.toString();

        if (resMessage) {
          // console.log(resMessage);
          this.snackbarFail(resMessage);
        }
        // this.setState({
        //   loading: false,
        //   message: resMessage,
        // });
      });
  };

  render() {
    const { classes, history } = this.props;
    // console.log(history);

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
            <LoginForm history={history} loginUser={this.loginUser} />
          </Paper>
        </Grid>
        <Button onClick={this.props.testClick}>Click</Button>
        {/* <Grid item sm={3} md={3} lg>
          <Paper className={classes.paper}>xs</Paper>
        </Grid> */}
      </Grid>
    );
  }
}
export default withSnackbar(withStyles(loginStyles)(UserLoginPage));

import React, { Component } from "react";

import LoginForm from "../components/forms/LoginForm";
import AuthService from "../services/auth/auth-service";

import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
import axios from "axios";

import { withSnackbar } from "notistack";

const loginStyles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3, 0),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  // Cancel XHR Requests (axios) when component unmounts abruptly
  cancelToken = axios.CancelToken.source();

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    this.cancelToken.cancel("API request was interrupted and cancelled");
  }

  snackbarFail = (msg) => {
    this.props.enqueueSnackbar(msg, {
      variant: "error",
    });
  };

  loginUser = async (loginFormData) => {
    // Login form data for POST request
    const postData = {
      email: loginFormData.email,
      password: loginFormData.password,
    };

    try {
      // Fetch response from API
      const response = await AuthService.login(postData, this.cancelToken);

      const { loginCurrentUserState } = this.props;

      // Pass props of response (user details) to App and update view for type of user
      await loginCurrentUserState(response);
    } catch (error) {
      const resMessage =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();

      if (resMessage) {
        this.snackbarFail(resMessage);
      } else if (axios.isCancel(error)) {
        console.log("Axios: ", error.message);
      }
      // this.setState({
      //   loading: false,
      //   message: resMessage,
      // });
    }
  };

  render() {
    const { classes, history } = this.props;
    return (
      <div className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
          <Avatar variant="rounded" className={classes.avatar}>
            <PersonIcon className={classes.icon} />
          </Avatar>
          <Typography variant="h4">Log In</Typography>
          <LoginForm history={history} loginUser={this.loginUser} />
        </Paper>
      </div>
    );
  }
}
export default withSnackbar(withStyles(loginStyles)(UserLoginPage));

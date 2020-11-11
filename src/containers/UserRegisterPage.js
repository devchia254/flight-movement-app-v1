import React, { Component } from "react";
import RegisterForm from "../components/forms/RegisterForm";
// Auth Requests
import AuthService from "../services/auth/auth-service";
// Material UI
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
// Other dependencies
import { withSnackbar } from "notistack";
import axios from "axios";

const registerStyles = (theme) => ({
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

class UserRegisterPage extends Component {
  // Cancel XHR Requests (axios) when component unmounts abruptly
  cancelToken = axios.CancelToken.source();

  constructor(props) {
    super(props);
    this.state = {};

    this.snackbarSuccess = this.snackbarSuccess.bind(this);
    this.snackbarFail = this.snackbarFail.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  componentWillUnmount() {
    this.cancelToken.cancel("API request was interrupted and cancelled");
  }

  // Snackbar Sucess Messages
  snackbarSuccess(msg) {
    this.props.enqueueSnackbar(msg, {
      variant: "success",
    });
  }

  // Snackbar Fail Messages
  snackbarFail(msg) {
    this.props.enqueueSnackbar(msg, {
      variant: "error",
      autoHideDuration: 5000,
    });
  }

  // Register User
  async registerUser(registerFormData, resetForm) {
    // Register form data for POST request
    const postData = {
      firstName: registerFormData.firstName,
      lastName: registerFormData.lastName,
      email: registerFormData.email,
      password: registerFormData.password,
      role: "user",
    };

    try {
      // Fetch reponse from API
      const response = await AuthService.register(postData, this.cancelToken);

      if (response.status === 200) {
        this.snackbarSuccess(response.data.message);
      }

      // Formik reset function
      resetForm({
        values: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          passwordVerify: "",
        },
      });
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // Axios error
      if (axios.isCancel(error)) {
        console.log("Axios: ", error.message);
      } else if (resMessage) {
        // Other network errors
        this.snackbarFail(resMessage);
      }
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
          <Avatar variant="rounded" className={classes.avatar}>
            <PersonAddIcon className={classes.icon} />
          </Avatar>
          <Typography variant="h4">Register</Typography>
          <RegisterForm registerUser={this.registerUser} />
        </Paper>
      </div>
    );
  }
}
export default withSnackbar(withStyles(registerStyles)(UserRegisterPage));

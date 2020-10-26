import React, { Component } from "react";

import AuthService from "../services/auth/auth-service";
import RegisterForm from "../components/forms/RegisterForm";

// Notistack SnackBars
import { withSnackbar } from "notistack";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";

const registerStyles = (theme) => ({
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

class UserRegisterPage extends Component {
  constructor() {
    super();
    this.state = {};

    this.registerUser = this.registerUser.bind(this);
  }

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
      const response = await AuthService.register(postData);
      this.snackbarSuccess(response.data.message);

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

      if (resMessage) {
        this.snackbarFail(resMessage);
      }

      // this.setState({
      //   loading: false,
      //   message: resMessage,
      // });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.root}
        direction="column"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={6} lg>
          <Paper elevation={3} className={classes.paper}>
            <Avatar variant="rounded" className={classes.avatar}>
              <PersonAddIcon className={classes.icon} />
            </Avatar>
            <Typography variant="h4">Register</Typography>
            <RegisterForm registerUser={this.registerUser} />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
export default withSnackbar(withStyles(registerStyles)(UserRegisterPage));

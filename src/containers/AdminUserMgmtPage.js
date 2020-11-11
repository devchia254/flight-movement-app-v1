import React, { Component } from "react";
import UsersTable from "../components/table/UsersTable";
// Auth Requests
import AuthAdmin from "../services/auth/auth-admin";
// Material UI
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";
// Notistack SnackBars
import { withSnackbar } from "notistack";
// Other Dependencies
import axios from "axios";
import moment from "moment";

const userMgmtStyles = (theme) => ({
  titleSection: {
    margin: theme.spacing(2, 0),
    display: "flex",
    justifyContent: "center",
  },
});

class AdminUserMgmtPage extends Component {
  // Cancel XHR Requests (axios) when component unmounts abruptly
  cancelToken = axios.CancelToken.source();

  constructor() {
    super();
    this.state = {
      users: [],
    };

    this.snackbarSuccess = this.snackbarSuccess.bind(this);
    this.snackbarFail = this.snackbarFail.bind(this);
    this.loadAllUsers = this.loadAllUsers.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    this.loadAllUsers();
  }

  componentWillUnmount() {
    this.cancelToken.cancel("API request was interrupted and cancelled");
  }

  // Snackbar Success Messages
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

  // Fetch all users for componentDidMount
  async loadAllUsers() {
    try {
      const response = await AuthAdmin.allUsers(this.cancelToken);

      const userData = await response.data.userData.map((user) => {
        const {
          user_id,
          user_email,
          first_name,
          last_name,
          role,
          createdAt,
          updatedAt,
        } = user;

        return {
          userId: user_id,
          email: user_email,
          firstName: first_name,
          lastName: last_name,
          role: role,
          createdAt: createdAt,
          updatedAt: updatedAt,
        };
      });
      // Set user data into the state
      this.setState({ users: userData });
    } catch (error) {
      const resMessage =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();

      // Axios error
      if (axios.isCancel(error)) {
        console.log("Axios: ", error.message);
      } else if (resMessage) {
        // Other network errors
        console.log("Error with fetching users: ", resMessage);
      }
    }
  }

  // Edit User (Only for email, firstName, lastName and role)
  async editUser(putData, putDataId, resetForm) {
    try {
      const response = await AuthAdmin.ediUser(
        putData,
        putDataId,
        this.cancelToken
      );

      // If request was successful - show snackbar
      if (response.status === 200) {
        this.snackbarSuccess(response.data.message);
        // Clear form after submit (Formik)
        resetForm({
          values: {
            email: "",
            firstName: "",
            lastName: "",
            role: "",
          },
        });
      }

      // Optimistic UI Update: Edit User
      this.setState((prevState) => {
        const updateUsers = prevState.users.map((user) => {
          // Match the IDs between the user edited from form (putData) with the user stored in the state
          if (putDataId === user.userId) {
            // Manipulated putData to be added into state
            const updateUserProps = {
              ...putData,
              updatedAt: moment().format(), // Now() in ISO 8601 format
            };

            return {
              ...user, // User from state with matched ID
              ...updateUserProps, // Assign new putData values with the matched user from state
            };
          }
          return user; // Return rest of the users
        });

        // Return the updated users into the state
        return { users: updateUsers };
      });
    } catch (error) {
      const resMessage =
        (error.response && error.response.data.message) ||
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

  // Delete User
  async deleteUser(deleteDataId) {
    if (window.confirm("Are you sure?")) {
      try {
        // Fetch response from API
        const response = await AuthAdmin.deleteUser(
          deleteDataId,
          this.cancelToken
        );

        // If request was successful - show snackbar
        if (response.status === 200) {
          this.snackbarSuccess(response.data.message);
        }

        // Optimistic UI update: Delete User
        this.setState((prevState) => {
          const filterUser = prevState.users.filter(
            (user, i, arr) => user.userId !== deleteDataId // Return users where the user ID from state does not match with the user ID from the Schedule table
          );
          return { users: filterUser };
        });
      } catch (error) {
        const resMessage =
          (error.response && error.response.data.message) ||
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
  }

  render() {
    const { classes } = this.props;

    return (
      <Container>
        <Hidden xsDown>
          <div className={classes.titleSection}>
            <Typography variant="h3">User Management</Typography>
          </div>
        </Hidden>
        <Hidden smUp>
          <div className={classes.titleSection}>
            <Typography variant="h4">User Management</Typography>
          </div>
        </Hidden>
        <div className={classes.contentSection}>
          <UsersTable
            users={this.state.users}
            editUser={this.editUser}
            deleteUser={this.deleteUser}
          />
        </div>
      </Container>
    );
  }
}

export default withSnackbar(withStyles(userMgmtStyles)(AdminUserMgmtPage));

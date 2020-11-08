import React, { Component } from "react";
import AuthAdmin from "../services/auth/auth-admin";
import UsersTable from "../components/table/UsersTable";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

// Notistack SnackBars
import { withSnackbar } from "notistack";

import moment from "moment";

class AdminUserMgmtPage extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.loadAllUsers();
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

  loadAllUsers = async () => {
    try {
      const response = await AuthAdmin.allUsers();

      const data = response.data.userData.map((user) => {
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

      this.setState((prevState) => {
        const fetchedUsers = [...prevState.users, ...data];

        return {
          users: fetchedUsers,
        };
      });
    } catch (error) {
      const resMessage =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();

      // if (axios.isCancel(error)) {
      //   console.log("Axios: ", error.message);
      // } else
      if (resMessage) {
        console.log("Error with fetching users: ", resMessage);
      }
    }
  };

  editUser = async (putData, putDataId, resetForm) => {
    try {
      const response = await AuthAdmin.editUser(putData, putDataId);

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
              ...updateUserProps, // Assign new putData values with the matched flight from state
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

      // if (axios.isCancel(error)) {
      //   console.log("Axios: ", error.message);
      // } else
      if (resMessage) {
        this.snackbarFail(resMessage);
      }
    }
  };

  deleteUser = async (deleteDataId) => {
    if (window.confirm("Are you sure?")) {
      try {
        // Fetch response from API
        const response = await AuthAdmin.deleteUser(deleteDataId);

        // Optimistic UI update: Delete Flight
        this.setState((prevState) => {
          const filterUser = prevState.users.filter(
            (user, i, arr) => user.userId !== deleteDataId // Return users where the user ID from state does not match with the user ID from the Schedule table
          );
          return { users: filterUser };
        });

        this.snackbarSuccess(response.data.message);
      } catch (error) {
        const resMessage =
          (error.response && error.response.data.message) ||
          error.message ||
          error.toString();

        // if (axios.isCancel(error)) {
        //   console.log("Axios: ", error.message);
        // } else
        if (resMessage) {
          this.snackbarFail(resMessage);
        }
      }
    }
  };

  render() {
    return (
      <Container>
        <Typography variant="h3">User Management</Typography>
        <UsersTable
          users={this.state.users}
          editUser={this.editUser}
          deleteUser={this.deleteUser}
        />
      </Container>
    );
  }
}

export default withSnackbar(AdminUserMgmtPage);

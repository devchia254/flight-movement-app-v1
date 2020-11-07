import React, { Component } from "react";
import AuthAdmin from "../services/auth/auth-admin";
import UsersTable from "../components/table/UsersTable";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

// Notistack SnackBars
import { withSnackbar } from "notistack";

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

  editUser = async (putData, putDataId) => {
    try {
      const response = await AuthAdmin.editUser(putData, putDataId);

      if (response.status === 200) {
        this.snackbarSuccess(response.data.message);
        // Clear form after submit (Formik)
        // resetForm({
        //   values: {
        //     flightNo: "",
        //     company: "",
        //     acReg: "",
        //     destination: "",
        //     checkIn: null,
        //     etd: null,
        //     eta: null,
        //     status: "",
        //   },
        // });
      }

      // Optimistic UI Update: Edit User
      this.setState((prevState) => {
        const updateUsers = prevState.users.map((user) => {
          // Match the IDs between the flight edited from form (putData) with the flight stored in the state
          if (putDataId === user.userId) {
            return {
              ...user, // Flight from state with matched ID
              ...putData, // Assign new putData values with the matched flight from state
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

  deleteUser = () => {};

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

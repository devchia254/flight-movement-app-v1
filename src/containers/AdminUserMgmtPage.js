import React, { Component } from "react";
import AuthAdmin from "../services/auth/auth-admin";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

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
      console.log(this.state.users);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  render() {
    return (
      <Container>
        <Typography variant="h3">User Management</Typography>
      </Container>
    );
  }
}

export default AdminUserMgmtPage;

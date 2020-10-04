import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3030/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  register(firstName, lastName, email, password, role) {
    return axios.post(
      API_URL + "signup",
      {
        firstName,
        lastName,
        email,
        password,
        role,
      },
      { headers: authHeader() }
    );
  }

  // LAST WORKING HERE: 20/09/20
  logout() {
    localStorage.removeItem("user");
    // window.location.reload();
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  // getStandardUser() {
  //   return {
  //     accessToken: "encrypted123",
  //     email: "stdUser@email.com",
  //     id: 1,
  //     roles: ["ROLE_USER"],
  //     username: "stdUser",
  //   };
  // }
  // getAdminUser() {
  //   return {
  //     accessToken: "encrypted456",
  //     email: "admUser@email.com",
  //     id: 1,
  //     roles: ["ROLE_ADMIN"],
  //     username: "admUser",
  //   };
  // }

  getNoUser() {
    return undefined;
  }
}

export default new AuthService();

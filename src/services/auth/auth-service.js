import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3030/api/auth/";

class AuthService {
  login(data, cancelToken) {
    return axios
      .post(API_URL + "signin", data, { cancelToken: cancelToken.token })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  register(data) {
    return axios.post(API_URL + "signup", data, { headers: authHeader() });
  }

  // LAST WORKING HERE: 20/09/20
  logout() {
    localStorage.removeItem("user");
    // window.location.reload();
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getUserEmail() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email) {
      return user.email;
    } else return null;
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

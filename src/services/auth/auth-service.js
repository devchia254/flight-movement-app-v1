import axios from "axios";

const API_URL = "http://localhost:3030/api/auth/";

class AuthService {
  // Login user
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
  // Register User
  register(data, cancelToken) {
    return axios.post(API_URL + "signup", data, {
      cancelToken: cancelToken.token,
    });
  }
  // Logout User
  logout() {
    localStorage.removeItem("user");
  }
  // Get User details from localStorage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  // Get email from User details in localStorage
  getUserEmail() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email) {
      return user.email;
    } else return null;
  }
}

export default new AuthService();

import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://devchia254-fma-be-v1.herokuapp.com/api/admin/users";

// ONLY FOR ADMIN
class AuthAdmin {
  // Fetch All Users
  allUsers(cancelToken) {
    return axios.get(API_URL, {
      headers: authHeader(),
      cancelToken: cancelToken.token,
    });
  }
  // Edit User
  editUser(data, userId, cancelToken) {
    return axios.put(API_URL + `/${userId}`, data, {
      headers: authHeader(),
      cancelToken: cancelToken.token,
    });
  }
  // Delete User
  deleteUser(userId, cancelToken) {
    return axios.delete(API_URL + `/${userId}`, {
      headers: authHeader(),
      cancelToken: cancelToken.token,
    });
  }
}

export default new AuthAdmin();

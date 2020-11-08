import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3030/api/admin/users";

class AuthSchedule {
  allUsers(cancelToken) {
    return axios.get(API_URL, {
      headers: authHeader(),
      cancelToken: cancelToken.token,
    });
  }

  editUser(data, userId, cancelToken) {
    return axios.put(API_URL + `/${userId}`, data, {
      headers: authHeader(),
      cancelToken: cancelToken.token,
    });
  }

  deleteUser(userId, cancelToken) {
    return axios.delete(API_URL + `/${userId}`, {
      headers: authHeader(),
      cancelToken: cancelToken.token,
    });
  }
}

export default new AuthSchedule();

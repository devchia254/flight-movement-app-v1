import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3030/api/admin/users";

class AuthSchedule {
  allUsers(cancelToken) {
    return axios.get(API_URL, {
      headers: authHeader(),
      // cancelToken: cancelToken.token,
    });
  }

  // editFlight(data, flightId, cancelToken) {
  //   return axios.put(API_URL + `/${flightId}`, data, {
  //     headers: authHeader(),
  //     cancelToken: cancelToken.token,
  //   });
  // }

  // deleteFlight(flightId, cancelToken) {
  //   return axios.delete(API_URL + `/${flightId}`, {
  //     headers: authHeader(),
  //     cancelToken: cancelToken.token,
  //   });
  // }
}

export default new AuthSchedule();

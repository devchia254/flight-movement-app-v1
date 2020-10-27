import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3030/api/user/flights";

class AuthSchedule {
  allFlights(cancelToken) {
    return axios.get(API_URL, {
      headers: authHeader(),
      cancelToken: cancelToken.token,
    });
  }

  createFlight(data, cancelToken) {
    return axios.post(API_URL, data, {
      headers: authHeader(),
      cancelToken: cancelToken.token,
    });
  }

  editFlight(data, flightId, cancelToken) {
    return axios.put(API_URL + `/${flightId}`, data, {
      headers: authHeader(),
      cancelToken: cancelToken.token,
    });
  }

  deleteFlight(flightId, cancelToken) {
    return axios.delete(API_URL + `/${flightId}`, {
      headers: authHeader(),
      cancelToken: cancelToken.token,
    });
  }
}

export default new AuthSchedule();
